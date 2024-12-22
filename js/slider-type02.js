$(document).ready(function() { 
    
    //visual button effect
//    $('.main-btn button').mouseover(function(){
//        $(this).children('img').attr('src','./img/main_arrow1_on.png');                                   
//    }).mouseleave(function(){
//        $(this).children('img').attr('src','./img/main_arrow2_on.png');                                   
//    });
    
    //slick slider
    $('.slider-main').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      fade: true,
      autoplay: true,
      autoplaySpeed: 3000
    });  
            
});





