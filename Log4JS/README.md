log4JS
======

####A simple Javascript logging console for one for all... include lib, start logging####

### Usage ###

```html
<script src="Log4js.js"></script>
<script>

	var log4js = new Log4js();
	document.body.appendChild( log4js.domElement );

	log4js.log( 'A simple log' );
    log4js.error( 'Error is in RED' );
    log4js.warning( 'Warnings are in Orange' );
    log4js.message( 'Messages are in Green' );

</script>
```
####You can also use it to log the objects. This is how you do that.
```html
<script src="Log4js.js"></script>
<script>

	var log4js = new Log4js();
	document.body.appendChild( log4js.domElement );

	log4js.log( 'An object's structure can be logged like this ' );
    log4js.log( document.getElementById('ObjectId'),1 );
    log4js.log(arrayName);

</script>
```


##Plans (TO DO):
 1. Include different log formats and colors for them. --- check
 2. Make log availability more easy and magical (dont know what that means)
 3. Try n make it async! (yes, in js)
 4. Option to save the log to a file (Export it real quick).
 5. Give an option for the user to check the values real quick. Like in browser consoles.
 
___
##Disclaimer
Please note that this is to be used only during Development.
A Javascript loggger  during production doesn't make sense, unless you are using JS on server side.
This is more like a quick debugging tool you see on your webpage. Saves your time.
 
___

##Inspiration

Inspired by @mrdoob 's Logger.js
Due credits to the author of [Logger.js](https://github.com/mrdoob/logger.js)

___
 
##License
 
Use it under [MIT License](http://opensource.org/licenses/MIT).
 