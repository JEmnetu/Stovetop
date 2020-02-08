$("#add-recipe-btn").on("click", function () {
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
    }).then(function () {
        location.href = "/mystovetop";
    });
});

//search button
$("#search-btn").on("click", function() {
    let searchQuery = $("#search-query").val();
    location.href = "/results?keywords=" + encodeURIComponent(searchQuery);
    
});
//flames button
$(".flames-btn").on("click", function (event) {
    // need to get recipe id from the buttton
    let recipeId = event.target.attr("data-recipe-id");
    //data-recipe-id="{{ id }}" (handlebars)

    // need to know if recipe is already liked
    let liked = event.target.attr("data-recipe-liked")
    //data-recipe-liked="false" (handlebars)

    $.ajax({
        url: "/api/recipes/" + recipeId,
        method: "PUT",
        data: {
            flame: liked ? true : false// TT/F depending on whether already flamed
        }
    }).then(function (res) {
        // toggle the liked status from t=>f or f=>t
        if (liked === "false") {
            liked = true
        } else {
            liked = false
        }
        console.log(res);
    });

});