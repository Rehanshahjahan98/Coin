/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const expressStatusMonitor = require('express-status-monitor');
const multer = require('multer');
const cors = require('cors'); // my code

const upload = multer({ dest: path.join(__dirname, 'uploads') });

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: '.env.example' });

/**
 * Controllers (route handlers).
 */
const homeController = require('./controllers/home');
const adminController = require('./controllers/admin');
const apiController = require('./controllers/api');
const userController = require('./controllers/user');
const contactController = require('./controllers/contact');

/**
 * API keys and Passport configuration.
 */
const passportConfig = require('./config/passport');

/**
 * Create Express server.
 */
const app = express();
// app.use(cors());

/**
 * Connect to MongoDB.
 */

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb+srv://rehanshahjahan98:sghgshgdhgsadgsdg1234@cluster0.fpuhorb.mongodb.net/coinflip');
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

/**
 * Express configuration.
 */
app.set('host', '0.0.0.0');
app.set('port', process.env.PORT || 8080);
app.use(expressStatusMonitor());
app.use(compression());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
  store: new MongoStore({
    url: 'mongodb+srv://rehanshahjahan98:sghgshgdhgsadgsdg1234@cluster0.fpuhorb.mongodb.net/coinflip',
    autoReconnect: true,
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// app.use((req, res, next) => {
//   if (req.path === '/api/upload') {
//     // Multer multipart/form-data handling needs to occur before the Lusca CSRF check.
//     next();
//   } else {
//     lusca.csrf()(req, res, next);
//   }
// });

// app.use(lusca.xframe('SAMEORIGIN'));
// app.use(lusca.xssProtection(true));

app.disable('x-powered-by');
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

/**
 * Primary app routes.
 */


// public routes
app.get('/', homeController.index);
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/forgot', userController.getForgot);
app.post('/forgot', userController.postForgot);
app.get('/reset/:token', userController.getReset);
app.post('/reset/:token', userController.postReset);
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);
app.get('/contact', contactController.getContact);
app.get('/contact', contactController.getContact);
app.post('/contact', contactController.postContact);

app.get('/about', homeController.about);

app.post('/onboard', homeController.onboard);

//handles admin approvals
app.post('/approve', homeController.onApprove);

//handles admin rejections
app.post('/reject', homeController.onReject);

// affiliate routes
app.get('/account/verify', passportConfig.isAuthenticated, userController.getVerifyEmail);
app.get('/account/verify/:token', passportConfig.isAuthenticated, userController.getVerifyEmailToken);
app.post('/contract/add-affliate', userController.addAffliate);
app.post('/contract/get-who-referred', passportConfig.isAuthenticated, userController.getWhoRefferedFromConytract);
app.get('/account', passportConfig.isAuthenticated, userController.getAccount);
app.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
app.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
app.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);

// admin routes
app.get('/admin/affiliates', passportConfig.isAuthenticated, passportConfig.isSuper, adminController.getAdminAffiliates);
app.get('/admin/affiliates/:id', passportConfig.isAuthenticated, passportConfig.isSuper, adminController.getAdminAffiliateSingle);
app.get('/admin/transactions', passportConfig.isAuthenticated, passportConfig.isSuper, adminController.getAdminTransactions);
app.get('/admin/stats', passportConfig.isAuthenticated, passportConfig.isSuper, adminController.getAdminStats);

app.post('/updateStatus', passportConfig.isAuthenticated, passportConfig.isSuper, adminController.updateStatus);

// submit whitelist
// check whitelist progress
// view transactions
// view balance
// view affiliate link

// admin routes
// /admin/affiliates
// /admin/transactions
// /admin/stats


/**
 * API examples routes.
 */

app.get('/api', apiController.getApi);
app.get('/api/upload', lusca({ csrf: true }), apiController.getFileUpload);
app.post('/api/upload', upload.single('myFile'), lusca({ csrf: true }), apiController.postFileUpload);

/**
 * Error Handler.
 */
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Server Error');
  });
}

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
