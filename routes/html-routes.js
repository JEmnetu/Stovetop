// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

    app.get("/", function (req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/home.html");
        }
        res.sendFile(path.join(__dirname, "../public/signup.html"));

    });

    app.get("/home", function (req, res) {
        // If the user already has an account send them to the members page
        // if (req.user) {
        //   res.redirect("/members");
        // }
        res.sendFile(path.join(__dirname, "../public/home.html"));

    });

    app.get("/myStoveTop", function (req, res) {
        // If the user already has an account send them to the members page
        // if (req.user) {
        //   res.redirect("/members");
        // }
        res.sendFile(path.join(__dirname, "../public/mystovetop.html"));

    });

    app.get("/results", function (req, res) {
        // If the user already has an account send them to the members page
        // if (req.user) {
        //   res.redirect("/members");
        // }
        var formatSearch = function (keywords) {
            let searchTerms = []

            keywords.split(' ').forEach(keyword => {
                searchTerms.push({ [Op.like]: '%' + keyword + '%' })
            });

            return {
                [Op.or]: searchTerms
            };
        }
        console.log(req.query);
        const decodedKeywords = decodeURIComponent(req.query.keywords);
        const searchArray = formatSearch(decodedKeywords);
        db.Recipe.findAll({
            where: {
                [Op.or]: {
                    ingredients: searchArray,
                    cuisine: searchArray,
                    direction: searchArray,
                    recipe_name: searchArray
                }
            },
        }).then((result) => {
            console.log(result);
        
            res.render("results", {recipes: result});
        });
    });

    app.get("/login", function (req, res) {
        // If the user already has an account send them to the members page
        // if (req.user) {
        //     res.redirect("/members");
        // }
        res.sendFile(path.join(__dirname, "../public/login.html"));
        // res.render("login")
    });

    // Here we've add our isAuthenticated middleware to this route.
    // If a user who is not logged in tries to access this route they will be redirected to the signup page
    // app.get("/members", function(req, res) {
    //     // res.sendFile(path.join(__dirname, "../public/members.html"));
    //     res.render("members");
    // });

};