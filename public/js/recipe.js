$("#add-recipe-btn").on("click", function(){
    var public = 1;
    if ($("#private-recipe").val() === "private") {
        public = 0;
    };
    var newRecipe = {
        recipe_name: $("#recipe_name").val().trim(),
        cuisine: $("#cuisine").val().trim(),
        ingredients: $("#ingredients").val().trim(),
        cook_time: $("#cook_time").val().trim(),
        public: public,
        flames: 0,
        direction: $("#direction").val().trim()
    };

    $.ajax({
        url: "api/recipes", 
        method: "POST",
        data: newRecipe
    }).then(function(){
        location.href = "/mystovetop";
    });
});

//search button
$("#search-btn").on("click", function(){
    $.ajax({
        url: "/api/food_data/search", 
        method: "POST",
        data: searchResults
    }).then(function(){
        location.href = "/results";
    });

});