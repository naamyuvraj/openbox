import passport from "passport";

// Auth controller class
class AuthController {
  // Handle google login
  googleAuth(req, res, next) {
    passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
  }

  // Google callback handler
  googleCallback(req, res, next) {
    const defaultRedirect = process.env.NODE_ENV === "production"
      ? "https://openbox-dev4ce.vercel.app/dashboard"
      : "http://localhost:3000/dashboard";

    passport.authenticate("google", {
      failureRedirect: "/login",
      successRedirect: process.env.FRONTEND_URL || defaultRedirect,
    })(req, res, next);
  }

  // Logout the user
  logout(req, res) {
    req.logout((err) => {
      if (err) return next(err);
      
      const defaultLogout = process.env.NODE_ENV === "production"
        ? "https://openbox-dev4ce.vercel.app/"
        : "http://localhost:3000/";
        
      res.redirect(process.env.FRONTEND_URL || defaultLogout);
    });
  }
}

// Export single instance
export default new AuthController();
