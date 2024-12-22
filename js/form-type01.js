//info.html 창띄우기
function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}

//유효성 검사
function vali(){
        $(function () {
        $.each($.validator.methods, function (key, value) {
            $.validator.methods[key] = function () {
                var el = $(arguments[1]);
                if (el.is('[placeholder]') && arguments[0] == el.attr('placeholder'))
                    arguments[0] = '';
                return value.apply(this, arguments);
            };
        });
    });

	$('form').each(function () {
		$(this).validate({
			rules    : {
				    user_name : {
                        required: true,
                        letter   : true
                    },
                    '나이': {
                        digits: true,
                        required: true,
                        exactlength: 2
                    },
                    '전화번호': {
                        required: true,
                        phoneUS : true
                    },
                    '커리큘럼': {
                        required: true
                    },
                    '클래스': {
                        required: true
                    },
                    '예비예식날짜': {
                        required: true
                    },
                    '개인정보보호정책동의': {
                        required: true
                    }
                },
            highlight: function(element) {
               $(element).closest('.control-group').removeClass('success').addClass('error');
               $(element).closest('.control-group').children().removeClass('success').addClass('error');
            },
            success: function(element) {
                //element
                //.text('OK!').addClass('valid')
                $(element).closest('.control-group').removeClass('error').addClass('success');
                $(element).closest('.control-group').children().removeClass('error').addClass('success');
            }
        });
    });
}
    
$(document).ready(function() {
    vali();       
    
    //button effect
    $('.form-btn button').mouseover(function(){
        $(this).children('img').animate({ 'margin-left':'3rem' }, 100);                                
    }).mouseleave(function(){
        $(this).children('img').animate({ 'margin-left':'1.5rem' }, 100);                                  
    });
});