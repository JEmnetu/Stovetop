// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op
    // Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
var destroySessions = require("../config/middleware/destroySession");

module.exports = function(app) {

    // app.get("/", function(req, res) {
    //     if (req.user) {
    //         console.log("success");
    //     } else {
    //         console.log('nope');
    //     }
    // })

    app.get("/signup", function(req, res) {
        // If the user already has an account send them to the members page

        // if (req.user) {
        //     res.redirect("/home");
        // }
        res.render("signup");
    });

    app.get("/login", function(req, res) {
        // If the user already has an account send them to the members page
        // if (req.user) {
        //     res.redirect("/members"); 
        // }
        res.render("login")
    });

    app.get("/", function(req, res) {
        // If the user already has an account send them to the members page

        // if (req.user) {
        //     res.redirect("/home");
        // }
        // res.render("signup");
    });

    app.get("/home", (req, res) => {
        // If the user already has an account send them to the members page
        // if (req.user) {
        //   res.redirect("/members");
        // }
        res.render("home");

    });

    app.get("/addrecipe", function(req, res) {
        // If the user already has an account send them to the members page
        // if (req.user) {
        //   res.redirect("/members");
        // }
        res.render("add_recipe");

    });

    app.get("/myStoveTop", function(req, res) {
        // If the user  isnt logged in send them to the login page
        // if (req.user === null) {
        //   res.redirect("/login");
        // }
        res.render("members");
        // res.sendFile(path.join(__dirname, "../public/mystovetop.html"));

    });


    //get and render search results
    app.get("/results", function(req, res) {
        var formatSearch = function(keywords) {
            let searchTerms = []

            keywords.split(' ').forEach(keyword => {
                searchTerms.push({
                    [Op.like]: '%' + keyword + '%'
                })
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
            res.render("results", { recipes: result });
        });
    });




    // Here we've add our isAuthenticated middleware to this route.
    // If a user who is not logged in tries to access this route they will be redirected to the signup page
    // app.get("/members", function(req, res) {
    //     // res.sendFile(path.join(__dirname, "../public/members.html"));
    //     res.render("members");
    // });

};