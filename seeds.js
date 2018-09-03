var mongoose=require("mongoose");
var Campground=require("./models/campground.js");
var Comment=require("./models/comment.js")

function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
       console.log("removed everything"); 
        //add a campground
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Added new Campground");
                        
                        //comment
                        Comment.create({
                            text: "This place is awesome but should have internet",
                            author: "Sid"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                }else{
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
            });
}

module.exports = seedDB;