$(document).ready(function() { 
    
    //visual button effect
//    $('.main-btn button').mouseover(function(){
//        $(this).children('img').attr('src','./img/main_arrow1_on.webp');                                   
//    }).mouseleave(function(){
//        $(this).children('img').attr('src','./img/main_arrow2_on.webp');                                   
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





