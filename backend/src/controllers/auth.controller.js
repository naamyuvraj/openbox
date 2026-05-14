import passport from "passport";
import jwt from "jsonwebtoken";

// Auth controller class
class AuthController {
  // Handle google login
  googleAuth(req, res, next) {
    passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
  }

  // Google callback handler
  googleCallback(req, res, next) {
    passport.authenticate("google", { failureRedirect: "/login" }, (err, user) => {
      if (err || !user) {
        return res.redirect("/login");
      }
      
      // Generate the JWT token that the frontend requires
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      const frontendUrl = "https://openbox-dev4ce.vercel.app";
      // Redirect to the frontend OAuth page so it can save the token
      return res.redirect(`${frontendUrl}/oauth?token=${token}`);
    })(req, res, next);
  }

  // Logout the user
  logout(req, res) {
    req.logout((err) => {
      if (err) return next(err);
      
      res.redirect("https://openbox-dev4ce.vercel.app/");
    });
  }
}

// Export single instance
export default new AuthController();
