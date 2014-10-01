Parse.initialize("vSo04vEpbyviumU65MZFyuaj8zPx0aOhBfpTrAB0",
	"kz4KisAWl3Xc8QRWbgpVU2FrnGoMh5BIL0I3V0c1");

$(document).ready(function(){
        $('#home_Image').height($(window).height()) ;
        $('#home_Image').width($(window).width()) ;

        $('.carousel_image').height($(window).height()) ;
        $('.carousel_image').width($(window).width()) ;
    
        $(window).on('resize',function(){
        $('.carousel_image').height($(window).height()) ;
        $('.carousel_image').width($(window).width()) ;
        $('#home_Image').height($(window).height()) ;
        $('#home_Image').width($(window).width()) ;
            
        
});
    
//    $("#glyph").on('click',function(e){
//            e.preventDefault();
//            $("body, html").animate({ 
//            scrollTop: $( "#carousel-example-generic" ).offset().top 
//        }, 600);
//        }              
//        );    

    
});




/*
    var _top = $(window).scrollTop();
var _direction;
$( window ).scroll(function() {
    
    var _cur_top = $(window).scrollTop();
    
    if(_top < _cur_top)
        {
            _direction = 'down';
        }
        else
        {
            _direction = 'up';
        }
        _top = _cur_top;
        console.log(_direction);
    
    
    if (_direction=='down' && _top<){
        console.log($("#carousel-example-generic").offset().top);
        $('html,body').animate({
            scrollTop: $("#carousel-example-generic").offset().top},
            'slow');
    }
    else{
        $('html,body').animate({
            scrollTop: $("#home_Image").offset().top},
            'slow');
    }
});*/