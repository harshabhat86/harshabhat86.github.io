/*
 * 
 @author Harsha Bhat @harshabhat86
 Inspired by @mrdoob 's Logger.js.
 Due credits to him. Here's the link to his repo incase you are interested.
 https://github.com/mrdoob/logger.js
 
 Just want to make it a little more useful.
 
 Plans :
 1) Include different log formats and colors for them.
 2) Make log availability more easy and magical (dont know what that means)
 3) Try n make it async! (yes, in js)
 4) Option to save the log to a file (Export it real quick).
 
 */

var Log4js = function () {

    this.domElement = document.createElement('div');
    if (document.getElementById("Log4js")) {
        console.warn("Cannot Use Log4js as an element with ID 'Log4js' already exists.");
        return;
    }

    this.domElement.id = "Log4js"; // Yes, InitCap!



    this.domElement.style.fontFamily = 'Helvetica, Arial, sans-serif';
    this.domElement.style.textAlign = 'left';
    this.domElement.style.fontSize = '10px';
    this.domElement.style.padding = '2px 0px 3px 0px';
    this.domElement.style.position = 'fixed';
    this.domElement.style.right = '10em';
    this.domElement.style.top = '1em';


    //Now create a clear button, for the user to handle logs right there.
    this.clearBtn = document.createElement("button");
    this.clearBtn.id = "Log4jClearBtn";
    this.clearBtn.style.width = "50%";
    this.clearBtn.style.textAlign = "Center";
    this.clearBtn.innerHTML = "Clear Log";

    this.clearBtn.addEventListener("click", function () {log4js.clear(); }, false);
    this.domElement.appendChild(this.clearBtn);


    //This elem is where all the logs will be dumped.
    this.logArea = document.createElement("div");
    this.logArea.id = "Log4jsLogArea";
    this.domElement.appendChild(this.logArea);


    if (document.body) {
        document.body.appendChild(this.domElement);
    }
    else {
            console.warn("The body of the document is not initialized yet. Perhaps you should try including Log4js after <body> tag...");
            return;
        }

    this.log = function ( msg, expand ) {
        
        
       this.writeObjectLog(msg,expand);

	};
    
    /*
    Error is marked in RED... Should it stop execution? No according to me, because I dont know if the user wants that
    */
    this.error = function ( msg, expand ) {
        var err = document.createElement('span');
        err.style.color = 'RED';
        
        this.writeObjectLog(msg,expand,err);

	};
    
     /*
    Warning is marked in Orange... 
    */
    this.warning = function ( msg, expand ) {
        var warn = document.createElement('span');
        warn.style.color = 'rgb(239, 147, 24)';
        this.writeObjectLog(msg,expand,warn);

	};
    
      /*
    message is marked in green... 
    */
    this.message = function ( msg, expand ) {
        var message = document.createElement('span');
        message.style.color = 'green';
		this.writeObjectLog(msg,expand,message);

	};
    

	this.clear = function () {

         while (this.logArea.childNodes.length >0)
        {
            this.logArea.removeChild( this.logArea.childNodes[0] );
        }
		

	};
    
    this.writeObjectLog = function (msg,expand,node) {
          var param;
          if (node===null||node ===undefined) // This is a simple log message, not error/warning or message.
          {
              this.logArea.appendChild( document.createTextNode( msg ) );
              this.logArea.appendChild( document.createElement( 'br' ) );
          }
        else
          {
              node.appendChild(document.createTextNode(new Date()+":"+msg));
              this.logArea.appendChild( node );
		      this.logArea.appendChild( document.createElement( 'br' ) );
          }
        
          
        
          if ( expand && msg instanceof Object ) {

           for ( param in msg ) {

				this.logArea.appendChild( document.createTextNode( new Date()+': - ' + param + ': ' + msg[ param ] ) );
				this.logArea.appendChild( document.createElement( 'br' ) );

			}

		}
		

	};

};
