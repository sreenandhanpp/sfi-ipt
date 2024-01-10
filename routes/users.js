var express = require("express");
var router = express.Router();
const userHelper = require("../helpers/loginSignup");
const userHelper2 = require("../helpers/data-helpers");
const { uploadImage } = require("../helpers/multer");
const nodemailer = require("nodemailer");

/* GET users listing. */
router.get("/", (req, res) => {
  res.render("user/home",{ subError : req.session.subError});
  req.session.subError = null
});

//computer......
router.post("/select-subject", async (req, res, next) => {
  if (req.session.loggedIn) {
    res.render("user/filterSubject", {
      admin: false,
      user: req.session.user,
      computer: true,
    });
  } else {
    res.redirect("/login");
  }
});

router.get("/", (req, res) => {
  res.render("user/signup", { signup: true });
});

router.post("/fetch-materials", async (req, res) => {
  console.log(req.body)
  const selectedSubject = req.body.name;
  console.log(req.body);
  console.log(selectedSubject);

  try {
    await userHelper2.getFilesBySubject(selectedSubject, (error, data) => {
      if (error) {
        res.render("error", {
          user: req.session.user,
          message: "Error fetching files",
          error,
        });
      } else {
        if(selectedSubject){
          const filteredData = data.filter(
            (file) => file.name === selectedSubject
          );
          res.render("user/view-file", {
            user: req.session.user,
            data: filteredData,
            selectedSubject,
            view: true,
          });
        }else{
          req.session.subError = "You forget to select year sem or subject" 
          res.redirect('/')
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.render("error", {
      user: req.session.user,
      message: "Error fetching files",
      error,
    });
  }
});




module.exports = router;
