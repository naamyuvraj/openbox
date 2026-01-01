import passport from "passport";

// Auth controller class
class AuthController {
  // Handle google login
  googleAuth(req, res, next) {
    passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
  }

  // Google callback handler
  googleCallback(req, res, next) {
    passport.authenticate("google", {
      failureRedirect: "/login",
      successRedirect: process.env.FRONTEND_URL || "http://localhost:3000/dashboard",
    })(req, res, next);
  }

  // Logout the user
  logout(req, res) {
    req.logout((err) => {
      if (err) return next(err);
      res.redirect(process.env.FRONTEND_URL || "http://localhost:3000/");
    });
  }
}

// Export single instance
export default new AuthController();
