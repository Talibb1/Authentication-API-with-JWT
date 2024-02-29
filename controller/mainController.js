class mainController {
    static home = (req, res) => {
      res.render("index.ejs");
    };
  
    static login = (req, res) => {
      res.render("login.ejs");
    };
    static register = (req, res) => {
        res.render("registration.ejs");
      };
    static changePassword = (req, res) => {
        res.render("changePassword.ejs");
      };
    static resetPassword = (req, res) => {
        res.render("resetPassword.ejs");
      };
}

export default mainController;