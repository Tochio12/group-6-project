const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.loggedIn) {
    console.error('User being redirected');
    res.redirect('/login');
  } else {
    console.log('User shall pass');
    next();
  }
};

module.exports = withAuth;
