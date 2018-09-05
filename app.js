var express=require("express");
var app=express();
app.set("view engine", "ejs");
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var flash=require("connect-flash");
var passport=require("passport");
var LocalStrategy=require("passport-local");
var methodOverride=require("method-override");
var Campground=require("./models/campground");
var comment=require("./models/comment");
var User=require("./models/user");
// var seedDB=require("./seeds");


var campgroundRoutes=require("./routes/campgrounds"),
    commentRoutes=require("./routes/comments"),
    indexRoutes=require("./routes/index");


app.use(express.static(__dirname + "/public"));

mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();       //seed the database

//Passport Configuration
app.use(require("express-session")({
    secret: "Aur mhi hoga padhai",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", indexRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});