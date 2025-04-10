/**
*	Genkiz - Creative Portfolio Agency HTML Template
*	Version: 1.1
*	Author: .genkiz
*	Author URL: http://themeforest.net/user/.genkiz
*	Copyright © Genkiz by .genkiz. All Rights Reserved.
**/

( function( $ ) {
	'use strict';

	/*
		- Preloader
	*/

	$(window).on("load", function() {
		var preload = $('.preloader');
		
		if(!$('body').hasClass('preloader-hide')) {
			preload.find('.preloader__spinner').fadeOut(500);
			setTimeout(function(){
				preload.addClass('closed');
				$('body').addClass('animated--swiper--active');
			}, 500);
			setTimeout(function(){
				preload.addClass('loaded');
				$('body').addClass('animated--active');
			}, 1500);
		} else {
			$('body').addClass('animated--active');
			$('body').addClass('animated--swiper--active');
		}
	});

	/**
		Splitting
	**/
	Splitting({ by: 'lines' });
	ScrollOut({targets: '[data-genkiz-scroll]', once: true});

	$('.word').wrap('<span></span>');
	$('[data-genkiz-overlay]').append('<div class="genkiz-overlay"></div>');

	/**
		Header Sticky
	**/
	if($('.genkiz-header').length) {
	var new_scroll_position = 0;
	var last_scroll_position;
	$(window).on('scroll', function() {
		var header = $('.genkiz-header');
		last_scroll_position = window.scrollY;

		// Scrolling down
		if (new_scroll_position < last_scroll_position && last_scroll_position > 50) {
			header.removeClass("slideDown");
			header.addClass("slideUp");
			header.addClass("sticky");
		}

		else if (last_scroll_position < 50) {
			header.removeClass("slideDown");
			header.removeClass("sticky");
		}

		else if (new_scroll_position > last_scroll_position) {
			header.removeClass("slideUp");
			header.addClass("slideDown");
			header.addClass("sticky");
		}

			new_scroll_position = last_scroll_position;
	});
	}

	/**
		Header Menu Button
	**/
	$('.genkiz-menu-btn').on('click', function(){
		var obj = $(this);
		if(obj.hasClass('btn--active')) {
			$('body').removeClass('genkiz--noscroll');
			$('.genkiz-header').removeClass('header--active');
			obj.removeClass('btn--active');
			obj.addClass('genkiz--notouch');
			obj.parent().find('.genkiz-menu-popup').removeClass('menu--ready');
			obj.parent().find('.genkiz-menu-container').addClass('genkiz--noscroll');
			setTimeout(function(){
				obj.parent().find('.genkiz-menu-popup').removeClass('menu--open');
			}, 300);
			setTimeout(function(){
				obj.removeClass('genkiz--notouch');
				obj.parent().find('.genkiz-menu-popup').removeClass('menu--visible');
			}, 1600);
		}
		else {
			$('body').addClass('genkiz--noscroll');
			$('.genkiz-header').addClass('header--active');
			obj.addClass('btn--active');
			obj.addClass('genkiz--notouch');
			obj.parent().find('.genkiz-menu-popup').addClass('menu--visible');
			obj.parent().find('.genkiz-menu-popup').addClass('menu--open');
			setTimeout(function(){
				obj.removeClass('genkiz--notouch');
				obj.parent().find('.genkiz-menu-container').removeClass('genkiz--noscroll');
				obj.parent().find('.genkiz-menu-popup').addClass('menu--ready');
			}, 600);
		}
		return false;
	});

	/*
		Top Menu Close
	*/
	$('.genkiz-menu').on('click', 'a', function(){
		if (!$(this).parent().hasClass('menu-item-has-children')){
			$('.genkiz-header .genkiz-menu-btn.btn--active').trigger('click');
		}
	});

	/*
		Header Menu Dropdown
	*/
	$('.genkiz-menu').on('click', '.menu-item-has-children > .icon, .dropdown-link > a', function(){
		if($(this).closest('li').hasClass('opened')) {
			$(this).closest('li').removeClass('opened');
		} else {
			$(this).closest('ul').find('> li').removeClass('opened');
			$(this).closest('li').addClass('opened');
		}
		return false;
	});

	/*
		Footer Sticky
	*/
	if($('.footer--fixed').length) {
		var footer_fixed = $('.footer--fixed .genkiz-footer').height();
		$('.wrapper').css({'margin-bottom':footer_fixed+'px'});
	}

	/*
		Intro Style
	*/
	if($('.genkiz-intro.intro--black').length) {
		$('.genkiz-header').addClass('header--white');
	}

	/*
		Pagepiling
	*/
	$('.js-hero-parallax').each(function() {
		var heroParallax = $(this);
		var heroParallax_loop = heroParallax.attr('data-loop');
		heroParallax.pagepiling({
			direction: 'vertical',
			scrollingSpeed: 700,
			easing: 'swing',
			normalScrollElementTouchThreshold: 5,
			touchSensitivity: 10,
			css3: true,
			loopTop: heroParallax_loop,
			loopBottom: heroParallax_loop,
			sectionSelector: '.genkiz-hero-parallax-section',
			afterRender: function() {
				if (heroParallax.find('.genkiz-hero-parallax-section.active').hasClass('section--dark')) {
					setDark();
				}
				$('#pp-nav').append('<div class="pp-nav-active"></div>');
				$("#pp-nav").appendTo(heroParallax);
				$('.js-hero-parallax-navs').on('click', '.js-hero-parallax-prev', function(){
					$.fn.pagepiling.moveSectionUp();
				});
				$('.js-hero-parallax-navs').on('click', '.js-hero-parallax-next', function(){
					$.fn.pagepiling.moveSectionDown();
				});
			},
			afterLoad: function (anchorLink, index) {
				var current = heroParallax.find('.genkiz-hero-parallax-section.active');
				var current_pos = $('#pp-nav ul li a.active').position().top;
				$('.pp-nav-active').css({'top':current_pos+'px'});
				if (current.hasClass('section--dark')) {
					setDark();
				} else {
					removeDark();
				}
			}
		});
		heroParallax.find('.image').each(function() {
			var img_d = $(this).attr('data-dimg');
			var img_m = $(this).attr('data-mimg');
			if($(window).width() < 768) {
				if(img_m != 0) {
					$(this).css({'background-image' : 'url('+img_m+')'});
				}
				else {
					$(this).css({'background-image' : 'url('+img_d+')'});
				}
			} else {
				if(img_d != 0) {
					$(this).css({'background-image' : 'url('+img_d+')'});
				}
			}
		});
	});
	function setDark() {
		$('.genkiz-page').addClass('parallax--dark');
		$('.genkiz-header').removeClass('header--white');
		$('.genkiz-hero-parallax .genkiz-prev').removeClass('nav--white');
		$('.genkiz-hero-parallax .genkiz-next').removeClass('nav--white');
	}
	function removeDark() {
		$('.genkiz-page').removeClass('parallax--dark');
		$('.genkiz-header').addClass('header--white');
		$('.genkiz-hero-parallax .genkiz-prev').addClass('nav--white');
		$('.genkiz-hero-parallax .genkiz-next').addClass('nav--white');
	}

	/*
		- Hero Slider
	*/
	$('.js-hero-slider').each(function() {
		var heroMainSwiper = $(this);
		var heroMainSwiper_auto_val = heroMainSwiper.data('autoplay');
		var heroMainSwiper_loop = heroMainSwiper.data('loop');
		if (heroMainSwiper_auto_val > 1) {
			var heroMainSwiper_auto = true;
			heroMainSwiper.find('.swiper-slide').attr('data-swiper-autoplay', heroMainSwiper_auto_val);
		} else {
			var heroMainSwiper_auto = false;
		}
		if (heroMainSwiper_loop) {
			heroMainSwiper_loop = true;
		} else {
			heroMainSwiper_loop = false;
		}
		heroMainSwiper.find('.genkiz-paginations-container').append('<div class="swiper-nav-active"></div>');
		var mainSliderSelector = new Swiper(heroMainSwiper, {
			slidesPerView: 1,
			spaceBetween: 0,
			loop: heroMainSwiper_loop,
			speed: 1200,
			parallax: true,
			autoplay: heroMainSwiper_auto,
			grabCursor: false,
			watchSlidesProgress: true,
			pagination: {
				el: '.js-hero-pagination',
				type: 'bullets',
				clickable: true,
			},
			navigation: {
				nextEl: '.js-hero-slider-next',
				prevEl: '.js-hero-slider-prev',
			},
			on: {
				progress: function(){
					var swiper = this;
					for (var i = 0; i < swiper.slides.length; i++) {
						var slideProgress = swiper.slides[i].progress, innerOffset = swiper.width * 0.5, innerTranslate = slideProgress * innerOffset;
						swiper.slides[i].querySelector('.image').style.transform = "translateX(" + innerTranslate + "px)";
					}
				},
				touchStart: function() {
					var swiper = this;
					for (var i = 0; i < swiper.slides.length; i++) {
						swiper.slides[i].style.transition = "";
					}
				},
				setTransition: function(speed) {
					var swiper = this;
					for (var i = 0; i < swiper.slides.length; i++) {
						swiper.slides[i].style.transition = speed + "ms";
						swiper.slides[i].querySelector('.image').style.transition = speed + "ms";
					}
				},
				slideChange: function() {
					var current_pos = heroMainSwiper.find('.swiper-pagination-bullet-active').position().left;
					heroMainSwiper.find('.swiper-nav-active').css({'left':current_pos+'px'});
				}
			}
		});
		heroMainSwiper.find('.image:not(.video)').each(function() {
			var img_d = $(this).attr('data-dimg');
			var img_m = $(this).attr('data-mimg');
			if($(window).width() < 768) {
				if(img_m != 0) {
					$(this).css({'background-image' : 'url('+img_m+')'});
				}
				else {
					$(this).css({'background-image' : 'url('+img_d+')'});
				}
			} else {
				if(img_d != 0) {
					$(this).css({'background-image' : 'url('+img_d+')'});
				}
			}
		});
	});

	/*
		- Hero Carousel
	*/
	$('.js-hero-carousel').each(function() {
		var heroSwiper = $(this);
		var heroSwiper_mouse_val = heroSwiper.data('mousewheel');
		var heroSwiper_auto_val = heroSwiper.data('autoplay');
		var heroSwiper_loop = heroSwiper.data('loop');
		if (heroSwiper_auto_val > 1) {
			var heroSwiper_auto = true;
			heroSwiper.find('.swiper-slide').attr('data-swiper-autoplay', heroSwiper_auto_val);
		} else {
			var heroSwiper_auto = false;
		}
		if (heroSwiper_loop) {
			heroSwiper_loop = true;
		} else {
			heroSwiper_loop = false;
		}
		var heroCarousel = new Swiper('.js-hero-carousel', {
			slidesPerView: 'auto',
			rewind: true,
			preventInteractionOnTransition: true,
			loop: heroSwiper_loop,
			mousewheel: heroSwiper_mouse_val,
			autoplay: heroSwiper_auto,
			spaceBetween: 20,
			pagination: false,
			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 'auto',
				}
			},
			navigation: {
				nextEl: '.js-hero-carousel-next',
				prevEl: '.js-hero-carousel-prev',
			}
		});
	});

	/*
		- Blog Carousel
	*/
	$('.js-blog-carousel').each(function() {
		var blogSwiper = $(this);
		var blogSwiper_auto_val = blogSwiper.data('autoplay');
		var blogSwiper_loop = blogSwiper.data('loop');
		if (blogSwiper_auto_val > 1) {
			var blogSwiper_auto = true;
			blogSwiper.find('.swiper-slide').attr('data-swiper-autoplay', blogSwiper_auto_val);
		} else {
			var blogSwiper_auto = false;
		}
		if (blogSwiper_loop) {
			blogSwiper_loop = true;
		} else {
			blogSwiper_loop = false;
		}
		blogSwiper.parent().find('.genkiz-paginations-container').append('<div class="swiper-nav-active"></div>');
		var blogCarousel = new Swiper(blogSwiper, {
			slidesPerView: '2',
			noSwipingSelector: 'a',
			watchSlidesProgress: true,
			watchSlidesVisibility: true,
			loop: blogSwiper_loop,
			autoplay: blogSwiper_auto,
			spaceBetween: 20,
			pagination: {
				el: '.js-blog-pagination',
				type: 'bullets',
				clickable: true,
			},
			navigation: {
				nextEl: '.js-blog-carousel-next',
				prevEl: '.js-blog-carousel-prev',
			},
			breakpoints: {
				0: {
					slidesPerView: 1
				},
				1024: {
					slidesPerView: 2,
				}
			},
			on: {
				slideChange: function() {
					var current_pos = blogSwiper.parent().find('.swiper-pagination-bullet-active').position().left;
					blogSwiper.parent().find('.swiper-nav-active').css({'left':current_pos+'px'});
				}
			}
		});
	});

	/*
		- Ticker Carousel
	*/
	var tickerSwiper_speed = $('.js-ticker-slider').data('autoplay');
	var tickerSwiper = new Swiper('.js-ticker-slider', {
		spaceBetween: 30,
		centeredSlides: true,
		speed: tickerSwiper_speed,
		autoplay: {
			delay: 0,
		},
		loop: true,
		slidesPerView:'auto',
		allowTouchMove: false,
		disableOnInteraction: true
	});

	/*
		- Reviews Carousel
	*/
	$('.js-reviews-carousel').each(function() {
		var reviewSwiper = $(this);
		var reviewSwiper_auto_val = reviewSwiper.data('autoplay');
		var reviewSwiper_loop = reviewSwiper.data('loop');
		if (reviewSwiper_auto_val > 1) {
			var reviewSwiper_auto = true;
			reviewSwiper.find('.swiper-slide').attr('data-swiper-autoplay', reviewSwiper_auto_val);
		} else {
			var reviewSwiper_auto = false;
		}
		if (reviewSwiper_loop) {
			reviewSwiper_loop = true;
		} else {
			reviewSwiper_loop = false;
		}
		var reviewCarousel = new Swiper(reviewSwiper, {
			slidesPerView: 1,
			effect: 'fade',
			loop: reviewSwiper_loop,
			autoplay: reviewSwiper_auto,
			spaceBetween: 50,
			pagination: false,
			navigation: {
				nextEl: '.js-reviews-carousel-next',
				prevEl: '.js-reviews-carousel-prev',
			}
		});
	});

	/*
		- History Carousel
	*/
	$('.js-history-slider').each(function() {
		var hisSwiper = $(this);
		var hisSwiper_auto_val = hisSwiper.data('autoplay');
		if (hisSwiper_auto_val > 1) {
			var hisSwiper_auto = true;
			hisSwiper.find('.swiper-slide').attr('data-swiper-autoplay', hisSwiper_auto_val);
		} else {
			var hisSwiper_auto = false;
		}
		hisSwiper.find('.genkiz-paginations-container').append('<div class="swiper-nav-active"></div>');
		var hisCarousel = new Swiper(hisSwiper, {
			slidesPerView: 1,
			noSwipingSelector: 'a',
			watchSlidesProgress: true,
			watchSlidesVisibility: true,
			loop: false,
			autoplay: hisSwiper_auto,
			spaceBetween: 20,
			pagination: {
				el: '.js-history-pagination',
				type: 'bullets',
				clickable: true,
			},
			navigation: {
				nextEl: '.js-history-next',
				prevEl: '.js-history-prev',
			},
			on: {
				slideChange: function() {
					var current_pos = hisSwiper.find('.swiper-pagination-bullet-active').position().left;
					hisSwiper.find('.swiper-nav-active').css({'left':current_pos+'px'});
				}
			}
		});
		hisSwiper.find('.js-history-pagination .swiper-pagination-bullet').each(function() {
			var hisSwiper_index = $(this).index() + 1;
			var hisSwiper_date = hisSwiper.find('.swiper-slide:nth-child('+ hisSwiper_index +') .subtitle').text();
			$(this).append('<span>'+hisSwiper_date+'</span>');
		});
	});

	/*
		- Hero Video Mute/Unmute
	*/
	$('.genkiz-play-btn').on( 'click', function (){
		if( $(this).parent().parent().find('video').prop('muted') ) {
			$(this).parent().parent().find('video').prop('muted', false);
			$(this).addClass('active');
		} else {
			$(this).parent().parent().find('video').prop('muted', true);
			$(this).removeClass('active');
		}

		return false;
	});

	/*
		- Services Hover
	*/
	$('.genkiz-service-grid-item.active--default').each(function() {
		$(this).closest('.genkiz-services-grid-fw').hover(function(){
			if ($(this).find('.genkiz-service-grid-item').hasClass('active--default')) {
				$(this).find('.genkiz-service-grid-item').removeClass('active');
			}
	  },function(){
			if ($(this).find('.genkiz-service-grid-item').hasClass('active--default')) {
				$(this).find('.genkiz-service-grid-item.active--default').addClass('active');
			}
	  });
	});

	/*
		- Number Text
	*/
	$('.genkiz-circle-text .label').each(function() {
		$(this).html($(this).text().split('').map((char, i) => `<span style="transform:rotate(${i * 8.5}deg)">${char}</span>`).join(''));
	});

	/*
		- Portfolio Showcase Hover
	*/
	if ($('.genkiz-showcase-items').length) {
		$('.genkiz-showcase-items').find('.genkiz-showcase-item:first-child').addClass('hover');
	}
	$('.genkiz-showcase-item').mouseenter(function(){
		var obj = $(this);
		obj.closest('.genkiz-showcase-items').find('.genkiz-showcase-item').removeClass('hover');
		obj.addClass('hover');
	});

	/*
		- Services Showcase Hover
	*/
	if ($(window).width() > 767) {
		if ($('.genkiz-services-showcase').length) {
			$('.genkiz-services-showcase').find('.items ul li:first-child').addClass('hover');
		}
		$('.genkiz-services-showcase .items ul li .title').mouseenter(function(){
			var obj = $(this).closest('li');
			obj.closest('ul').find('li').removeClass('hover');
			obj.addClass('hover');
		});
	}

	/**
		- Video
	**/
	$('.genkiz-video').on('click', '.play, .image', function(){
		$(this).closest('.genkiz-video').addClass('active');
		var iframe = $(this).closest('.genkiz-video').find('.js-video-iframe');
		largeVideoPlay(iframe);
		return false;
	});
	function largeVideoPlay( iframe ) {
		var src = iframe.data('src');
		iframe.attr('src', src);
	}

	/**
		- Counter
	**/
	$('.genkiz-counter').each(function() {
		var numbers = $(this).find('.js-counter');
		var animationIsDone = false;
		var scroll = $(window).scrollTop() + $(window).height();
		var offset = $(this).offset().top;

		if (!animationIsDone && scroll >= offset) {
			animateNumbers();
		}

		$(window).on('scroll', function() {
			scroll = $(window).scrollTop() + $(window).height();

			if (!animationIsDone && scroll >= offset) {
				animateNumbers();
			}
		});
		function animateNumbers() {
			numbers.each(function() {
				var endValue = parseInt($(this).attr('data-end-value'), 10);

				$(this).easy_number_animate({
					start_value: 0,
					end_value: endValue,
					duration: 2500
				});

			});

			animationIsDone = true;
		}
	});

	/*
		- Genkiz Button
	*/
	$('button.genkiz-btn.genkiz-hover-btn').each(function() {
		var btn_text = $(this).text();
		$(this).html('<span>'+btn_text+'</span>');
	});

	/*
		- Genkiz Pagination
	*/
	$('.pager').each(function() {
		var btn_next = $(this).find('.next');
		var btn_prev = $(this).find('.prev');
		btn_next.html('<i></i>');
		btn_prev.html('<i></i>');
		btn_next.addClass('genkiz-next genkiz-hover-2');
		btn_prev.addClass('genkiz-prev genkiz-hover-2');
	});

	/*
		- Genkiz Portfolio
	*/
	var $container = $('.genkiz-portfolio-items');
	$container.imagesLoaded(function() {
		$container.isotope({
			itemSelector: '.genkiz-portfolio-col',
			percentPosition: true,
		});
	});

	/*
		- Genkiz Filter
	*/
	$('.genkiz-filter-nav-active').each(function() {
		$(this).css({'width':$(this).closest('.genkiz-filter.filter--default').find('.item--active').parent().width()+6+'px'});
	});
	$('.genkiz-filter').on( 'click', 'button', function() {
		var filterValue = $(this).attr('data-filter');
		$container.isotope({ filter: filterValue });
		$(filterValue).find('.image').attr('data-scroll','in');
		$(filterValue).find('.splitting').attr('data-scroll','in');

		$('.genkiz-filter button').removeClass('item--active');
		$(this).addClass('item--active');

		var current_pos = $(this).closest('.genkiz-filter.filter--default').find('.item--active').parent().position().left;
		var current_width = $(this).closest('.genkiz-filter.filter--default').find('.item--active').parent().width();
		$(this).closest('.genkiz-filter.filter--default').find('.genkiz-filter-nav-active').css({'width':current_width+6+'px'});
		$(this).closest('.genkiz-filter.filter--default').find('.genkiz-filter-nav-active').css({'left':current_pos-3+'px'});
	});

	/**
		Collapse
	**/
	$('.genkiz-collapse-item').on('click', '.genkiz-collapse-btn', function(){
		if($(this).closest('.genkiz-collapse-item').hasClass('opened')) {
			$(this).closest('.genkiz-collapse-item').removeClass('opened');
			$(this).removeClass('active');
			$(this).next().slideUp();
		}
		else {
			$(this).closest('.genkiz-collapse-item').addClass('opened');
			$(this).addClass('active');
			$(this).next().slideDown();
		}
	});

	/**
		Image Popup
	**/
	$('.mfp-image').magnificPopup();

	/**
		Validate Form
	**/
	if($('.cform').length) {
		$('#cform').validate({
			rules: {
				name: {
					required: true
				},
				tel: {
					required: true
				},
				email: {
					required: true,
					email: true
				},
				message: {
					required: true
				}
			},
			success: 'valid',
			submitHandler: function() {
				$.ajax({
					url: 'mailer/feedback.php',
					type: 'post',
					dataType: 'json',
					data: 'name='+ $("#cform").find('input[name="name"]').val() + '&email='+ $("#cform").find('input[name="email"]').val() + '&tel='+ $("#cform").find('input[name="tel"]').val() + '&message='+ $("#cform").find('textarea[name="message"]').val(),
					beforeSend: function() {
	
					},
					complete: function() {
	
					},
					success: function(data) {
						$('#cform').fadeOut();
						$('.alert-success').delay(1000).fadeIn();
					}
				});
			}
		});
	}

} )( jQuery );
