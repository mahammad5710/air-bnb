const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// ================= LOGIN =================

exports.getLoginPage = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "login",
    isLoggedIn: false,
    oldInput: {
      email: "",
      password: ""
    },
    errors: [],
    user:{}
  });
};

exports.getLoginSucessPage = async (req, res, next) => {
  const {email,password}=req.body;
  const user= await User.findOne({email});
  if(!user){
    return res.status(422).render("auth/login", {
      pageTitle: "login",
      isLoggedIn: false,
      errors: ["Sorry, we couldn't find an account with that email address. Please try again."],
      oldInput: {
        email,
        password
      },
      user:{}
    });
  }
  const isPasswordValid= await bcrypt.compare(password,user.password);
  if(!isPasswordValid){
    return res.status(422).render("auth/login", {
      pageTitle: "login",
      isLoggedIn: false,
      errors: ["Invalid password try again"],
      oldInput: {
        email,
        password
      },
      user:{}
    });
  }
  req.session.isLoggedIn = true;
  req.session.user = {
    _id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    userType: user.userType
  };
  await req.session.save();
  res.redirect("/");
};


// ================= LOGOUT =================

exports.getLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error while logging out:", err);
      return next(err);
    }
    res.redirect("/login");
    user:{}
  });
};


// ================= SIGNUP PAGE =================

exports.getSignUpPage = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "signup",
    isLoggedIn: false,
    errors: [],
     oldInput: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: "",
    },
    user:{}
  });
};


// ================= SIGNUP SUCCESS =================

exports.getSignUpSucessPage = [

  check("firstName")
    .trim()
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters long")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("First name must contain only letters and spaces"),

  check("lastName")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Last name must be at least 3 characters long")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Last name must contain only letters and spaces"),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[!@&$%^&*]/)
    .withMessage("Password must contain at least one special character"),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  check("userType")
    .notEmpty()
    .withMessage("Please select a user type")
    .isIn(["host", "guest"])
    .withMessage("Please select a valid user type"),

  check("terms")
    .equals("accepted")
    .withMessage("Please accept the terms and conditions"),

  (req, res, next) => {

    const errors = validationResult(req);

    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      userType,
      terms
    } = req.body;

    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        pageTitle: "signup",
        isLoggedIn: false,

        errors: errors.array().map(err => err.msg),

        oldInput: {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          userType,
        }
      });
    }
    bcrypt.hash(password, 12).then((hashedPassword) => {
      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        userType
      });
      user.save().then(()=>{
        res.redirect("/login");
      }).catch((err)=>{
        return res.status(422).render("auth/signup", {
        pageTitle: "signup",
        isLoggedIn: false,
        errors: errors.array().map(err => err.msg),

        oldInput: {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          userType,
        }
        });
      })
    })
  }
];