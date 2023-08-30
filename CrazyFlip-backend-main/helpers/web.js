exports.isSuper = async (req, res, next) => {
	if (!req.user.isSuper) {
		req.flash('errors', { msg: 'Access Denied'})
		return res.redirect('/')
	} else {
		return next()
	}
}