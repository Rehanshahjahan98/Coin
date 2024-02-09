const validator = require('validator');

const nodemailer = require('nodemailer');

/**
 * GET /contact
 * Contact form page.
 */
exports.getContact = (req, res) => {
  const unknownUser = !(req.user);

  res.render('contact', {
    title: 'Contact',
    unknownUser,
  });
};

/**
 * POST /contact
 * Send a contact form via Nodemailer.
 */
exports.postContact = (req, res) => {
  const validationErrors = [];
  let fromName;
  let fromEmail;
  if (!req.user) {
    if (validator.isEmpty(req.body.name)) validationErrors.push({ msg: 'Please enter your name' });
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });
  }
  if (validator.isEmpty(req.body.message)) validationErrors.push({ msg: 'Please enter your message.' });

  if (validationErrors.length) {
    return res.status(400).json({
      success: false,
      message: '',
      err: validationErrors
    });
  }

  if (!req.user) {
    fromName = req.body.name;
    fromEmail = req.body.email;
  } else {
    fromName = req.user.profile.name || '';
    fromEmail = req.user.email;
  }

  let transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
      user: process.env.SENDGRID_USER,
      pass: process.env.SENDGRID_PASSWORD
    }
  });
  const mailOptions = {
    to: 'your@email.com',
    from: `${fromName} <${fromEmail}>`,
    subject: 'Contact Form | Bennycoin Starter',
    text: req.body.message
  };

  return transporter.sendMail(mailOptions)
    .then(() => {
      return res.status(200).json({
        success: true,
        message: 'Email has been sent successfully!',
      });
    })
    .catch((err) => {
      if (err.message === 'self signed certificate in certificate chain') {
        console.log('WARNING: Self signed certificate in certificate chain. Retrying with the self signed certificate. Use a valid certificate if in production.');
        transporter = nodemailer.createTransport({
          service: 'SendGrid',
          auth: {
            user: process.env.SENDGRID_USER,
            pass: process.env.SENDGRID_PASSWORD
          },
          tls: {
            rejectUnauthorized: false
          }
        });
        return transporter.sendMail(mailOptions);
      }
      console.log('ERROR: Could not send contact email after security downgrade.\n', err);
      return res.status(400).json({
        success: false,
        message: '',
        err: "Error sending the message. Please try again shortly."
      });
    })
    .then((result) => {
      if (result) {
        return res.status(400).json({
          success: true,
          message: 'Email has been sent successfully!',
        });
      }
    })
    .catch((err) => {
      console.log('ERROR: Could not send contact email.\n', err);
      return res.status(200).json({
        success: true,
        message: '',
        err: "Error sending the message. Please try again shortly."
      });
    });
};
