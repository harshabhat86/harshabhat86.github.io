Parse.initialize("kL1NFNINEGFag94CWEM6LmL7xRxPzVvAPNhAO6nZ",
	"xlKdh66kYBpTJ33FneuyDkuzlayFQ2HDGfMHgeD1");
var googleClicked = 0;
var username = '';
$( document ).ready(function() {
	
	 var SHOW_CLASS = 'show',
     HIDE_CLASS = 'hide',
     ACTIVE_CLASS = 'active';
 
 $( '.tabs' ).on( 'click', 'li a', function(e){
   e.preventDefault();
   
   var $tab = $( this ),
        href = $tab.attr( 'href' );
 
    $( '.active' ).removeClass( ACTIVE_CLASS );
    $tab.addClass( ACTIVE_CLASS );
 
    $( '.show' )
       .removeClass( SHOW_CLASS )
       .addClass( HIDE_CLASS )
       .hide();
   
     $(href)
       .removeClass( HIDE_CLASS )
       .addClass( SHOW_CLASS )
       .hide()
       .fadeIn( 550 );
 });
 
 $('#gp').click(function(){
	 $("signinButton").click();
	 
 });
	
});

var NoteUser = Parse.Object.extend("NoteUser");


function signinCallback(authResult) {
	  if (authResult['status']['signed_in'] && googleClicked==1) {
	    // Update the app to reflect a signed in user
	    // Hide the sign-in button now that the user is authorized, for example:
	    document.getElementById('customBtn').setAttribute('style', 'display: none');
	    
	    
	    gapi.client.load('plus','v1', function(){
	    	var request = gapi.client.plus.people.get( {'userId' : 'me'} );
	    	
	    	 request.execute(function(resp) {
	    		 if (resp.error){
	    			 console.log("profile error:"+profile.error);
	    			 return;
	    		 }
	    		  console.log('ID: ' + resp.id);
		    	  console.log('Display Name: ' + resp.displayName);
		    	  console.log('Image URL: ' + resp.image.url);
		    	  console.log('Profile URL: ' + resp.url);
		    	  window.username = resp.id;
		    	  
		    	  getUser();
		    	  //window.location = 'http://harshabhat86.github.io/no_bs_notes/html/notes.html?loggedInUser='+window.username;
	    	 });
	      });

	  } else {
	    // Update the app to reflect a signed out user
	    // Possible error values:
	    //   "user_signed_out" - User is signed-out
	    //   "access_denied" - User denied access to your app
	    //   "immediate_failed" - Could not automatically log in the user
	    console.log('Sign-in state: ' + authResult['error']);
	    
	  }
	}

function setGlobalFlag()
{
	googleClicked = 1;
}

function createUser()
{
	var noteUser = new NoteUser();

	noteUser.save(
					{

						noteUserId : window.username,
						
					},
					{
						success : function(noteUser) {

							console.log("User Created!" + noteUser.id);
							window.location = 'http://harshabhat86.github.io/no_bs_notes/html/notes.html?loggedInUser='+noteUser.attributes.username;
							
						},
						error : function(noteUser, error) {
							alert('There was some error in saving the user. We apologize! Please try again in some time.'
									+ error);
						}

					});

}


function getUser(){
	
	var noteUser = new Parse.Query(NoteUser);
	noteUser.equalTo("noteUserId", window.username);
	
	noteUser.find(
			{
				/* We become free of Parse after this method. */
				success : function(results) {
					
					if (results.length ==0){
						createUser(window.username);
					}
					else
						{
						window.location = 'http://harshabhat86.github.io/no_bs_notes/html/notes.html?loggedInUser='+results[0].attributes.username;	
						}

				}
			},
			{
				error : function() {
					alert("Oops!! There was some error we faced. May be you should try again in some time.");
				}
			});
	
}