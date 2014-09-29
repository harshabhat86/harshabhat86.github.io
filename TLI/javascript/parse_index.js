//Finally using IIFE! Yippie!!
var ParseIndex = function(parse){
    //The only 2 objects in the design are User and Spotfix
    var User = parse.Object.extend("User");   
    var SpotFix = parse.Object.extend("Spotfix");
    
    var updateUserName = function(user,name){
       var user = new User();
        user.set("name",name);
        
    user.save(null, {
    success: function(user) {
      console.log("Username saved");
  }
});
              
    }


}(Parse);