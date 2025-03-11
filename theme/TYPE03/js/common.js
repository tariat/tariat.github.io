$(document).ready(function() {
  var gnb = $('#mild_menu');

  // 마우스 over 시
  gnb.mouseenter(function() {
    $('.sub_menu').show();
    // menu bg

    tmp_index=0;
    max_cnt=0;
    $('.sub_menu').each(function(){
      if($(this).find("li").length>max_cnt){
        tmp_index=$(this).closest("li").index();
        max_cnt=$(this).find("li").length;
      }
    });
    var menuHeight = $('#header').outerHeight();
    var inmeHegiht = $('.sub_menu').eq(tmp_index).outerHeight();
    $('.menu_bg').css({
      'top': menuHeight + 'px',
      height: inmeHegiht + 'px'
    });
  });

  // $(".dropmenu > ul > li").hover(function() {
  //     if ($(this).find("li").length != 0) {
  //         $(this)
  //             .find("ul")
  //             .stop()
  //             .fadeToggle(300);
  //     }
  // });

  // 마우스  leave 시
  gnb.mouseleave(function() {
    $('.sub_menu').hide();
    $('.menu_bg').css('height', '0')

  });

  //dept2 hover시 dept1 active
  $('.dept1').mouseenter(function() {
    $(this).children().addClass('active');
    $(this).siblings().children().removeClass('active')
  });
  $('.dept1').mouseleave(function() {
    $(this).children().removeClass('active');
  });

  /* 햄버거 메뉴 */
  $('.menu_bar').click(function(){
    $(this).toggleClass('active');
    $('.menu_open').slideToggle();
  });
});

// $(function() {
//     setInterval(function() {
//         if ($(window).scrollTop() >= 10) {
//             $("#header").addClass("scroll");
//         } else {
//             $("#header").removeClass("scroll");
//         }
//     }, 400);
// });

$(document).ready(function(){
  var mobile = false;
  $(".mobile_open").click(function(){
    if(mobile == false){
      $("#mobile_menu").css('display','block').stop().animate({right: 0}, 'slow');
      $(".mob_bg").stop().fadeIn(400);
      mobile = true;
    }
  });
  $(".mobile_close").click(function(){
    if(mobile == true){
      $("#mobile_menu").stop().animate({right: '-' + 75 + '%'}, 'slow');
      $(".mob_bg").stop().fadeOut(400);
      mobile = false;
    }
  });
  $(".mob_bg").click(function(){
    if(mobile == true){
      $("#mobile_menu").stop().animate({right: '-' + 75 + '%'}, 'slow');
      $(".mob_bg").stop().fadeOut(400);
      mobile = false;
    }
  });
  var subMenu = -1;
	$("#mobile_menu .mob_menu .sub_menu").slideUp(0);
	$("#mobile_menu .mob_menu .top_menu").removeClass("on");
	$("#mobile_menu .mob_menu .top_menu").each(function(q){
		$(this).click(function(){
			if(subMenu != q){
				$("#mobile_menu .mob_menu .top_menu").eq(subMenu).removeClass("on");
				$("#mobile_menu .mob_menu .sub_menu").eq(subMenu).stop().slideUp('fast');
				subMenu = q;
				$("#mobile_menu .mob_menu .top_menu").eq(subMenu).addClass("on");
				$("#mobile_menu .mob_menu .sub_menu").eq(subMenu).stop().slideDown('fast');
			}else if(subMenu == q){
				$("#mobile_menu .mob_menu .top_menu").eq(subMenu).removeClass("on");
				$("#mobile_menu .mob_menu .sub_menu").eq(subMenu).stop().slideUp('fast');
				subMenu = -1;
			}
		});
	});
});
