const withAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
    console.error('User being redirected');
    res.redirect('/login');
  } else {
    console.log('User shall pass');
    next();
  }
};

module.exports = withAuth;
