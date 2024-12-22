//새로고침시 페이지 최상단 위치      
window.onload = function () {
    setTimeout(function () {
        scrollTo(0, 0);
    }, 100);
}

$(document).ready(function () {
    //Preloader
    $(window).on('load', function () {
        var preloaderFadeOutTime = 500;

        function hidePreloader() {
            var preloader = $('.spinner-wrapper');
            setTimeout(function () {
                preloader.fadeOut(preloaderFadeOutTime);
            }, 500);
        }
        hidePreloader();
    });

    $(window).on('resize', function () {
        w = $(this).width();
        if (w >= 940 && $('nav').is(':hidden')) {
            $('nav').removeAttr('style');
        }
    });

    $('.toggle').click(function () {
        $('nav').fadeToggle();
    });

    //Scroll Event     
    $(window).scroll(function () {
        var w = $(window).width();
        var scroll = $(window).scrollTop();
        $('.logo a, .top').on('click', function () {
            $('html, body').stop().animate({
                'scrollTop': 0
            }, 1000);
        });
    });
    
    
    
    
    
    
    
    
    
    
         $(window).scroll(function () {
       var scroll = $(window).scrollTop();
       var base_line = 500;
       var base_line2 = 800;
      
          var pos1 = $('#processType01').offset().top - base_line;
          var pos2 = $('#sliderType03').offset().top - base_line;
          var pos3 = $('#sliderType04Bg').offset().top - base_line;
   
        
    
 
       
       if (scroll > pos1) {
           $('#processType01').addClass('on');
       }
       else {
           $('#processType01').removeClass('on');
       }
             
                if (scroll > pos2) {
           $('#sliderType03').addClass('on');
       }
       else {
           $('#sliderType03').removeClass('on');
       }
            
             
               if (scroll > pos3) {
           $('#sliderType04Bg').addClass('on');
       }
       else {
           $('#sliderType04Bg').removeClass('on');
       }
            


            

   });
    
    
    
    
    
    
    
    
    
    
    
    
});