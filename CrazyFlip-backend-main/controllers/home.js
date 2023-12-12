const User = require('../models/User');

exports.index = async (req, res) => {
  try {
    let users = await User.find({ pendingApproval: true });
    res.status(200).json({
      success: true,
      message: 'Fetched Successfully',
      users: users
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message,
    });
  }
};

exports.about = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Fetched Successfully',
    title: 'About'
  });
};

exports.pending = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Fetched Successfully',
    title: 'Pending'
  });
};

// POST request to handle the form
exports.onboard = (req, res) => {
  const walletAddress = req.body.wallet;
  const userId = req.user.id;

  // Find and update user
  User.findOneAndUpdate(
    { _id: userId },
    { pendingApproval: true, walletAddress: walletAddress },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          success: false,
          message: 'Error updating user information',
          error: err.message,
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'Onboarding request successful',
        });
      }
    }
  );
};

// Handles admin approvals
exports.onApprove = (req, res) => {
  const uid = req.body._id;
  User.findOneAndUpdate({ _id: uid }, { status: 'approved', pendingApproval: false }, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: 'Error approving user',
        error: err.message,
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Approved',
      });
    }
  });
};

// Handles admin rejections
exports.onReject = (req, res) => {
  const uid = req.body._id;
  User.findOneAndUpdate({ _id: uid }, { status: 'rejected', pendingApproval: false }, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: 'Error rejecting user',
        error: err.message,
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Rejected',
      });
    }
  });
};
