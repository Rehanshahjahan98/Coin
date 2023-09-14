const { promisify } = require('util');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const _ = require('lodash');
const validator = require('validator');
const mailChecker = require('mailchecker');
const User = require('../models/User');
const { addAffliateToContract, whoReffered } = require('../helpers/web3');
const { request } = require('http');

const randomBytesAsync = promisify(crypto.randomBytes);

/**
 * GET /login
 * Login page.
 */

exports.getLogin = (req, res) => {
  if (req.user) {
    const userWithoutPassword = req.user.toObject();
    delete userWithoutPassword.password;
    return res.status(200).json({
      success: true,
      message: '',
      data: userWithoutPassword
    });
  }
  else {
    return res.status(401).json({
      success: false,
      message: '',
      err: "You are not login"
    });
  }
};

/**
 * POST /login
 * Sign in using email and password.
 */
exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (validator.isEmpty(req.body.walletAddress)) validationErrors.push({ msg: 'wallet address cannot be blank.' });
  if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'email or password is inncorect' });
  if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'email or password is inncorect' });

  if (validationErrors.length) {
    return res.status(400).json({
      success: false,
      message: '',
      err: validationErrors
    });
  }
  req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });

  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      return res.status(400).json({
        success: false,
        message: '',
        err: info
      });
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      return res.status(200).json({
        success: true,
        message: 'Success! You are logged in.',
        data: {}
      });
    });
  })(req, res, next);
};

/**
 * GET /logout
 * Log out.
 */
exports.logout = (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: '',
        err: "Failed to destroy the session during logout."
      });
    }
    else {
      req.user = null;
      return res.status(200).json({
        success: true,
        message: 'logout',
        data: {}
      });
    }

  });
};

/**
 * GET /signup
 * Signup page.
 */

exports.getSignup = (req, res) => {
  if (req.user) {
    return res.status(200).json({
      success: true,
      message: '',
      data: req.user
    });
  }
};

/**
 * POST /signup
 * Create a new local account.
 */

exports.postSignup = (req, res, next) => {
  console.log(req.body, "req body");
  const validationErrors = [];
  if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });
  if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' });
  if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' });
  if (validator.isEmpty(req.body.walletAddress)) validationErrors.push({ msg: 'wallet address cannot be blank.' });


  if (validationErrors.length) {

    return res.status(400).json({
      success: false,
      message: '',
      err: validationErrors
    });
  }
  req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });

  const user = new User({
    email: req.body.email,
    password: req.body.password,
    walletAddress: req.body.walletAddress?.toLowerCase()
  });

  User.findOne({ walletAddress: req.body.walletAddress }, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Account with that wallet address already exists.',
        err: 'Account with that wallet address already exists.'
      });
    }
    user.save((err) => {
      if (err) { return next(err); }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json({
          success: true,
          message: 'Signup Successfully',
          data: {}
        });
      });
    });
  });
};

/**
 * GET /account
 * Profile page.
 */
exports.getAccount = (req, res) => {
  return res.status(200).json({
    success: true,
    message: '',
    data: {}
  });
};

/**
 * POST /account/profile
 * Update profile information.
 */
exports.postUpdateProfile = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });

  if (validationErrors.length) {
    return res.status(400).json({
      success: false,
      message: '',
      err: validationErrors
    });
  }
  req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });

  User.findById(req.user.id, (err, user) => {
    if (err) { return next(err); }
    if (user.email !== req.body.email) user.emailVerified = false;
    user.email = req.body.email || '';
    user.profile.name = req.body.name || '';
    user.profile.gender = req.body.gender || '';
    user.profile.location = req.body.location || '';
    user.profile.website = req.body.website || '';
    user.save((err) => {
      if (err) {
        if (err.code === 11000) {
          return res.status(400).json({
            success: false,
            message: '',
            err: 'The email address you have entered is already associated with an account.'
          });
        }
        return next(err);
      }
      req.flash('success', { msg: 'Profile information has been updated.' });
      res.redirect('/account');

      return res.status(200).json({
        success: true,
        message: 'Profile information has been updated.',
        data: {}
      });
    });
  });
};

/**
 * POST /account/password
 * Update current password.
 */
exports.postUpdatePassword = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' });
  if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' });

  if (validationErrors.length) {
    return res.status(400).json({
      success: false,
      message: '',
      err: validationErrors
    });
  }

  User.findById(req.user.id, (err, user) => {
    if (err) { return next(err); }
    user.password = req.body.password;
    user.save((err) => {
      if (err) { return next(err); }
      return res.status(200).json({
        success: true,
        message: 'Password has been changed.',
        data: {}
      });
    });
  });
};

/**
 * POST /account/delete
 * Delete user account.
 */
exports.postDeleteAccount = (req, res, next) => {
  User.deleteOne({ _id: req.user.id }, (err) => {
    if (err) { return next(err); }
    req.logout();

    return res.status(200).json({
      success: true,
      message: 'Your account has been deleted.',
      data: {}
    });
  });
};

/**
 * GET /reset/:token
 * Reset Password page.
 */
exports.getReset = (req, res, next) => {
  if (req.isAuthenticated()) {
    // return res.redirect('/');
  }
  const validationErrors = [];
  if (!validator.isHexadecimal(req.params.token)) validationErrors.push({ msg: 'Invalid Token.  Please retry.' });
  if (validationErrors.length) {
    return res.status(400).json({
      success: false,
      message: '',
      err: validationErrors
    });
  }

  User
    .findOne({ passwordResetToken: req.params.token })
    .where('passwordResetExpires').gt(Date.now())
    .exec((err, user) => {
      if (err) { return next(err); }
      if (!user) {
        return res.status(400).json({
          success: false,
          message: '',
          err: 'Password reset token is invalid or has expired.'
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Password Reset',
        data: {}
      });
    });
};

/**
 * GET /account/verify/:token
 * Verify email address
 */
exports.getVerifyEmailToken = (req, res, next) => {
  if (req.user.emailVerified) {
    return res.status(200).json({
      success: true,
      message: 'The email address has been verified.',
      data: {}
    });
  }

  const validationErrors = [];
  if (req.params.token && (!validator.isHexadecimal(req.params.token))) validationErrors.push({ msg: 'Invalid Token.  Please retry.' });
  if (validationErrors.length) {
    return res.status(400).json({
      success: false,
      message: '',
      err: validationErrors
    });
  }

  if (req.params.token === req.user.emailVerificationToken) {
    User
      .findOne({ email: req.user.email })
      .then((user) => {
        if (!user) {
          return res.status(400).json({
            success: false,
            message: '',
            err: 'There was an error in loading your profile.'
          });
        }
        user.emailVerificationToken = '';
        user.emailVerified = true;
        user = user.save();

        return res.status(200).json({
          success: true,
          message: 'Thank you for verifying your email address.',
          data: {}
        });
      })
      .catch((error) => {
        console.log('Error saving the user profile to the database after email verification', error);
        return res.status(400).json({
          success: false,
          message: '',
          err: 'There was an error when updating your profile.  Please try again later.'
        });

      });
  }
};

exports.addAffliate = async (req, res, next) => {
  try {
    const { referredAddress, affiliateAddress } = req.body;
    await addAffliateToContract({ referredAddress, affiliateAddress });
    return res.status(200).json({
      success: true,
      message: 'Success',
    });
  } catch (error) {
    console.log("error message : ", error)
  }
};

exports.getWhoRefferedFromConytract = async (req, res, next) => {
  try {
    const { referredAddress } = req.body;
    let referred = await whoReffered({ referredAddress });
    return res.status(200).json({
      success: true,
      message: 'Success',
      data: referred
    });
  } catch (error) {
    console.log("error message : ", error)
  }
};

/**
 * GET /account/verify
 * Verify email address
 */
exports.getVerifyEmail = (req, res, next) => {
  if (req.user.emailVerified) {

    return res.status(200).json({
      success: true,
      message: 'The email address has been verified.',
      data: {}
    });
  }

  if (!mailChecker.isValid(req.user.email)) {

    return res.status(400).json({
      success: false,
      message: '',
      err: 'The email address is invalid or disposable and can not be verified.  Please update your email address and try again.'
    });
  }

  const createRandomToken = randomBytesAsync(16)
    .then((buf) => buf.toString('hex'));

  const setRandomToken = (token) => {
    User
      .findOne({ email: req.user.email })
      .then((user) => {
        user.emailVerificationToken = token;
        user = user.save();
      });
    return token;
  };

  const sendVerifyEmail = (token) => {
    let transporter = nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_PASSWORD
      }
    });
    const mailOptions = {
      to: req.user.email,
      from: 'info@bennycoin',
      subject: 'Please verify your email address on Bennycoin',
      text: `Thank you for registering with bennycoin.\n\n
        This verify your email address please click on the following link, or paste this into your browser:\n\n
        http://${req.headers.host}/account/verify/${token}\n\n
        \n\n
        Thank you!`
    };
    return transporter.sendMail(mailOptions)
      .then(() => {

        return res.status(200).json({
          success: true,
          message: 'An e-mail has been sent to ${req.user.email} with further instructions.',
          data: {}
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
          return transporter.sendMail(mailOptions)
            .then(() => {
              return res.status(200).json({
                success: true,
                message: 'An e-mail has been sent to ${req.user.email} with further instructions.',
                data: {}
              });
            });
        }
        console.log('ERROR: Could not send verifyEmail email after security downgrade.\n', err);

        return res.status(400).json({
          success: false,
          message: '',
          err: 'Error sending the email verification message. Please try again shortly.'
        });
      });
  };

  createRandomToken
    .then(setRandomToken)
    .then(sendVerifyEmail)
    .then(() => {
      return res.status(200).json({
        success: true,
        message: '',
        data: {}
      });
    })
    .catch(next);
};

/**
 * POST /reset/:token
 * Process the reset password request.
 */
exports.postReset = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' });
  if (req.body.password !== req.body.confirm) validationErrors.push({ msg: 'Passwords do not match' });
  if (!validator.isHexadecimal(req.params.token)) validationErrors.push({ msg: 'Invalid Token.  Please retry.' });

  if (validationErrors.length) {
    return res.status(400).json({
      success: false,
      message: '',
      err: validationErrors
    });
  }

  const resetPassword = () =>
    User
      .findOne({ passwordResetToken: req.params.token })
      .where('passwordResetExpires').gt(Date.now())
      .then((user) => {
        if (!user) {
          return res.status(400).json({
            success: false,
            message: '',
            err: 'Password reset token is invalid or has expired.'
          });
        }
        user.password = req.body.password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        return user.save().then(() => new Promise((resolve, reject) => {
          req.logIn(user, (err) => {
            if (err) { return reject(err); }
            resolve(user);
          });
        }));
      });

  const sendResetPasswordEmail = (user) => {
    if (!user) { return; }
    let transporter = nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_PASSWORD
      }
    });
    const mailOptions = {
      to: user.email,
      from: 'info@bennycoin.com',
      subject: 'Your Bennycoin password has been changed',
      text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`
    };
    return transporter.sendMail(mailOptions)
      .then(() => {
        return res.status(200).json({
          success: true,
          message: 'Success! Your password has been changed.',
          data: {}
        })
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
          return transporter.sendMail(mailOptions)
            .then(() => {
              return res.status(200).json({
                success: true,
                message: 'Success! Your password has been changed.',
                data: {}
              })
            });
        }
        console.log('ERROR: Could not send password reset confirmation email after security downgrade.\n', err);

        return res.status(400).json({
          success: false,
          message: '',
          err: 'Your password has been changed, however we were unable to send you a confirmation email. We will be looking into it shortly.'
        });
      });
  };

  resetPassword()
    .then(sendResetPasswordEmail)
    .then(() => {
      if (!res.finished) {
        return res.status(400).json({
          success: false,
          message: '',
          err: ''
        });
      };
    })
    .catch((err) => next(err));
};

/**
 * GET /forgot
 * Forgot Password page.
 */
exports.getForgot = (req, res) => {
  if (req.isAuthenticated()) {
    // return res.redirect('/');
  }
  return res.status(200).json({
    success: true,
    message: 'Forgot Password',
    data: {}
  })
};

/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */
exports.postForgot = (req, res, next) => {
  const validationErrors = [];
  console.log(req.body.email, "req body");
  if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });

  if (validationErrors.length) {
    return res.status(400).json({
      success: false,
      message: '',
      err: validationErrors
    });
  }
  req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });

  const createRandomToken = randomBytesAsync(16)
    .then((buf) => buf.toString('hex'));

  const setRandomToken = (token) =>
    User
      .findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          return res.status(400).json({
            success: false,
            message: '',
            err: 'Account with that email address does not exist.'
          });
        } else {
          user.passwordResetToken = token;
          user.passwordResetExpires = Date.now() + 3600000; // 1 hour
          user = user.save();
        }
        return user;
      });

  const sendForgotPasswordEmail = (user) => {
    if (!user) { return; }
    const token = user.passwordResetToken;
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_PASSWORD
      }
    });
    const mailOptions = {
      to: user.email,
      from: 'info@bennycoin.com',
      subject: 'Reset your password on Bennycoin',
      text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://${process.env.BASE_URL}/reset/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };
    return transporter.sendMail(mailOptions)
      .then(() => {
        // return res.status(200).json({
        //   success: true,
        //   message: `An e-mail has been sent to ${user.email} with further instructions.`,
        //   data: {}
        // })
      })
      .catch((err) => {
        console.log(err, "eeeerrrr");
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
          return transporter.sendMail(mailOptions)
            .then(() => {
              // return res.status(200).json({
              //   success: true,
              //   message: `An e-mail has been sent to ${user.email} with further instructions.`,
              //   data: {}
              // })
            });
        }
        console.log('ERROR: Could not send forgot password email after security downgrade.\n', err);
        return res.status(400).json({
          success: false,
          message: '',
          err: 'Error sending the password reset message. Please try again shortly.'
        });
      });
  };

  createRandomToken
    .then(setRandomToken)
    .then(sendForgotPasswordEmail)
    .then(() => {
      return res.status(200).json({
        success: true,
        message: `mail sent successfully`,
        data: {}
      })
    })
    .catch(next);
};
