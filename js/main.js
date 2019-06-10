$(window).scroll(function(){
    $('.admited_detail_articles').toggleClass('fixed_admited', $(this).scrollTop() > 140);

	if($(this).scrollTop() > 140 && $(window).height() < 720){
		var heightFixedAdmited  = $(window).height() -120,
			widthWindow  = $(window).width(),
			widthContainer  = $('.section_detail_articles .container').width(),
			marginFixedAdmited = (widthWindow - widthContainer)/2,
			proportionHeight = 600/heightFixedAdmited,
			widthFixedAdmited = 160/proportionHeight;

		$('.fixed_admited').css({'right' : marginFixedAdmited + 'px'});
		$('.admited_detail_articles').css({'width' : widthFixedAdmited + 'px'});
		$('.admited_detail_articles').css({'height' : heightFixedAdmited + 'px'});
	} else {
		
		$('.admited_detail_articles').css({'width' : ''});
		$('.admited_detail_articles').css({'height' : ''});
	}
	
	var position = $('#dream_communication').position().top - $(window).height();
	
	if($(this).scrollTop() > position){
		$('.fixed_admited').css({'display' : 'none'});
	} else {
		$('.fixed_admited').css({'display' : ''});
	}
	
});

$(document).on('ready', function() {
	let swiperCon = document.querySelector(".swiper-container");
	if(swiperCon) {
		var swiper = new Swiper('.swiper-container', {
			scrollbar: '.swiper-scrollbar',
			scrollbarHide: true,
			slidesPerView: 'auto',
			freeMode: true,
			freeModeSticky: true,
			centeredSlides: false,
			spaceBetween: false,
			grabCursor: true,
		});
	}
	
});


/* меню */
$(document).ready(function() 
{
	/* Клик по иконке меню */
	$('.h_map_block').click(function()
	{			
		if ($(".modal_top_menu").hasClass("active") )	
		{ 
			$(".modal_top_menu").removeClass("active");
			$(".h_map_1, .h_map_2, .h_map_3").removeClass("active");
			$("body").css("overflow","");
			$("body").css("height","");
			$("html").css("height","");
			$('.section').css({'left' : 0 + 'px'});
			$('.footer').css({'left' : 0 + 'px'});
		}
		else
		{
			$(".modal_top_menu").addClass("active");
			$(".h_map_1, .h_map_2, .h_map_3").addClass("active");
			$("body").css("overflow","hidden");
			$("body").css("height","100%");
			$("html").css("height","100%");
			
			$widthModalMenu = $('.modal_top_menu').width();
			$('.section').css({'left' : $widthModalMenu + 'px'});
			$('.footer').css({'left' : $widthModalMenu + 'px'});
		}	
	});
});

$(window).on('load resize',function (){

	$(".modal_top_menu").removeClass("active");
	$(".h_map_1, .h_map_2, .h_map_3").removeClass("active");
	$("body").css("overflow","");

	
	$height_window = $(window).height();
	$height_header = $('.header').height();
	var height_modal_top_menu = $height_window - $height_header;
	$('.modal_top_menu').css({'height' : height_modal_top_menu + 'px'});
});

/* конец меню */


$(window).on('load resize',function (){
	$width_window = $(window).width();
	$width_section_top_price = $('.section_top_price').width() + 20;
	var margin_section_top_price = ($width_window - $width_section_top_price)/2;

	$('.section_top_price').css({'margin-left' : margin_section_top_price + 'px'});
});


window.onload = function () {
	/*$(".jsServices").hover(function(){ 		
		$(".jsServices").removeClass("active");
	$(this).addClass("active");	 		
	});*/
	
	$(".case_item").hover(function(){ 		
		$(".case_item").removeClass("active");
		$(this).addClass("active");	 		
	});
	

	
	$("#footage_form_top").focus(function() {
		 $(this).val("");
	});
	$("#footage_form_top").blur(function() {
		 $(this).val("0");
	});

}

$(window).on('load resize',function (){
	$(function(){
	  $("#phone_form_top").mask("8(999) 999-9999");
	});
	$(function(){
	  $("#phone_form_call").mask("8(999) 999-9999");
	});
	$(function(){
	  $("#phone_form_consultation").mask("8(999) 999-9999");
	});

	$(function(){
	  $("#contacts_form").mask("8(999) 999-9999");
	});	
});
/*
$(window).on('load resize',function (){
	
	if($(window).width() < 540){
		$widthWindow = $(window).width();
		$widthColumnLeft = $('.column_left').width() + 11;
		var widthColumnMain = ($widthWindow - $widthColumnLeft);

		$('.column_main').css({'width' : widthColumnMain + 'px'});
	} else if($(window).width() < 965){
		$widthWindow = $(window).width();
		$widthColumnLeft = $('.column_left').width() + 50;
		var widthColumnMain = ($widthWindow - $widthColumnLeft);

		$('.column_main').css({'width' : widthColumnMain + 'px'});
	} else {

		$widthWindow = $(window).width();
		$widthColumnLeft = $('.column_left').width() + 60;
		var widthColumnMain = ($widthWindow - $widthColumnLeft);

		$('.column_main').css({'width' : widthColumnMain + 'px'});
	}
	
});*/

$(function(){
	$(".nav_list a[href^='#']").click(function(){
		var _href = $(this).attr("href");
		$("html, body").animate({scrollTop: ($(_href).offset().top - 40)+"px" }, 2000);

		return false;
	});
});

