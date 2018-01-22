/**
 * !resize only width
 * */
var resizeByWidth = true;

var prevWidth = -1;
$(window).resize(function () {
	var currentWidth = $('body').outerWidth();
	resizeByWidth = prevWidth !== currentWidth;
	if (resizeByWidth) {
		$(window).trigger('resizeByWidth');
		prevWidth = currentWidth;
	}
});

/**
 * !device detected
 * */
var DESKTOP = device.desktop();
var MOBILE = device.mobile();
var TABLET = device.tablet();
var thisIsHomePage = $('.home-page').length;
var mediaTablet = 980;

/**
 *  Add placeholder for old browsers
 * */
function placeholderInit() {
	$('[placeholder]').placeholder();
}

/**
 * !Show print page by click on the button
 * */
function printShow() {
	$('.view-print').on('click', function (e) {
		e.preventDefault();
		window.print();
	})
}

/**
 * !toggle class for input on focus
 * */
function inputToggleFocusClass() {
	// use for the "focus" state
	var $inputs = $('.field-effects-js');

	if ($inputs.length) {
		var $fieldWrap = $('.input-wrap');
		var $selectWrap = $('.select');
		var classFocus = 'input--focus';

		$inputs.focus(function () {
			var $currentField = $(this);
			var $currentFieldWrap = $currentField.closest($fieldWrap);

			// add class on input
			$currentField.addClass(classFocus);
			// add class on label
			$currentField.prev('label').addClass(classFocus);
			$currentField.closest($selectWrap).prev('label').addClass(classFocus);
			// add class on wrapper
			$currentFieldWrap.addClass(classFocus);
			// add class on label in wrapper
			$currentFieldWrap.find('label').addClass(classFocus);

		}).blur(function () {
			var $currentField = $(this);
			var $currentFieldWrap = $currentField.closest($fieldWrap);

			// remove class on input
			$currentField.removeClass(classFocus);
			// remove class on label
			$currentField.prev('label').removeClass(classFocus);
			$currentField.closest($selectWrap).prev('label').removeClass(classFocus);
			// remove class on wrapper
			$currentFieldWrap.removeClass(classFocus);
			// remove class on label in wrapper
			$currentFieldWrap.find('label').removeClass(classFocus);

		});
	}
}

function inputHasValueClass() {
	// use for the "has-value" state
	var $inputs = $('.field-effects-js');

	if ($inputs.length) {
		var $fieldWrap = $('.input-wrap');
		var $selectWrap = $('.select');
		var classHasValue = 'input--has-value';

		$.each($inputs, function () {
			switchHasValue.call(this);
		});

		$inputs.on('keyup change', function () {
			switchHasValue.call(this);
		});

		function switchHasValue() {
			var $currentField = $(this);
			var $currentFieldWrap = $currentField.closest($fieldWrap);

			//first element of the select must have a value empty ("")
			if ($currentField.val().length === 0) {
				// remove class on input
				$currentField.removeClass(classHasValue);
				// remove class on label
				$currentField.prev('label').removeClass(classHasValue);
				$currentField.closest($selectWrap).prev('label').removeClass(classHasValue);
				// remove class on wrapper
				$currentFieldWrap.removeClass(classHasValue);
				// remove class on label in wrapper
				$currentFieldWrap.find('label').removeClass(classHasValue);
			} else if (!$currentField.hasClass(classHasValue)) {
				// add class on input
				$currentField.addClass(classHasValue);
				// add class on label
				$currentField.prev('label').addClass(classHasValue);
				$currentField.closest($selectWrap).prev('label').addClass(classHasValue);
				// add class on wrapper
				$currentFieldWrap.addClass(classHasValue);
				// add class on label in wrapper
				$currentFieldWrap.find('label').addClass(classHasValue);
			}
		}
	}
}

function inputFilledClass() {
	// use if the "focus" state and the "has-value" state are the same
	var $fieldWrap = $('.field-effects-js');

	if ($fieldWrap.length) {
		var $inputsAll = $fieldWrap.find('input[type="email"], input[type="search"], :text, textarea, select');
		var _classFilled = 'input--filled';

		$inputsAll.focus(function () {
			var $thisField = $(this);

			$thisField
				.closest($fieldWrap)
				.addClass(_classFilled);

		}).blur(function () {
			var $thisField = $(this);

			if ($thisField.val() === '') {
				$thisField
					.closest($fieldWrap)
					.removeClass(_classFilled);
			}
		});

		function switchHasValue() {
			var $currentField = $(this);
			var $currentFieldWrap = $currentField.closest($fieldWrap);

			$currentFieldWrap.removeClass(_classFilled);

			//first element of the select must have a value empty ("")
			if ($currentField.val() !== '') {
				$currentFieldWrap.addClass(_classFilled);
			}
		}

		$.each($inputsAll, function () {
			switchHasValue.call(this);
		});

		$inputsAll.on('change', function () {
			switchHasValue.call(this);
		});
	}
}
/*toggle class for input on focus end*/

/**
 * !Initial custom select for cross-browser styling
 * */
function customSelect(select) {
	$.each(select, function () {
		var $thisSelect = $(this);
		// var placeholder = $thisSelect.attr('data-placeholder') || '';
		$thisSelect.select2({
			language: "ru",
			width: '100%',
			containerCssClass: 'cselect-head',
			dropdownCssClass: 'cselect-drop'
			// , placeholder: placeholder
		});
	})
}

/**
 * !Initial custom file input
 * */
function fileInput() {
	$('.upload-file').each(function () {
		$(this).filer({
			// limit: 3,
			changeInput: '' +
			'<div class="jFiler-input-dragDrop">' +
			'<div class="jFiler-input-inner">' +
			'<div class="jFiler-input-icon">' +
			'<i class="icon-jfi-cloud-up-o"></i>' +
			'</div>' +
			'<div class="jFiler-input-text">' +
			'<strong>Кликните по полю <br> или перетащите сюда файл</strong>' +
			'</div>' +
			'</div>' +
			'</div>',
			showThumbs: true,
			theme: "dragdropbox",
			captions: {
				button: "Выберите файлы",
				feedback: "Выберите файлы для загрузки",
				feedback2: "Файлы выбраны",
				drop: "Чтобы добавить файл, перетащите его сюда",
				removeConfirmation: "Вы уверены, что хотите удалить этот файл?",
				errors: {
					filesLimit: "Максиальное количество файлов: {{fi-limit}}",
					filesType: "Загружать можно только изображения!",
					filesSize: "{{fi-name}} слишком велик! Пожалуйста, загрузите файл до {{fi-maxSize}} MB.",
					filesSizeAll: "Файлы, которые Вы выбрали слишком велики! Пожалуйста, загружайте файлы до {{fi-maxSize}} MB."
				}
			},
			templates: {
				box: '<ul class="jFiler-items-list jFiler-items-default list-reset"></ul>'
			},
			// captions: {
			// 	button: "Choose Files",
			// 	feedback: "Choose files To Upload",
			// 	feedback2: "files were chosen",
			// 	drop: "Drop file here to Upload",
			// 	removeConfirmation: "Вы уверены, что хотите удалить этот файл?",
			// 	errors: {
			// 		filesLimit: "Only {{fi-limit}} files are allowed to be uploaded.",
			// 		filesType: "Only Images are allowed to be uploaded.",
			// 		filesSize: "{{fi-name}} is too large! Please upload file up to {{fi-maxSize}} MB.",
			// 		filesSizeAll: "Files you've choosed are too large! Please upload files up to {{fi-maxSize}} MB."
			// 	}
			// },
			addMore: true,
			allowDuplicates: false,
			clipBoardPaste: true,
			dragDrop: {
				dragEnter: null,
				dragLeave: null,
				drop: null,
				dragContainer: null
			}
		});
	});
}

/**
 * !Initial full page scroll plugin
 * */
function fullPageInitial() {

	var $mainSections = $('.main-sections-js');
	if($mainSections.length) {
		$mainSections.fullpage({
			verticalCentered: false,
			// anchors: ['firstPage', 'secondPage', 'thirdPage'],
			// navigation: true,
			// menu: '.scroll-nav-js',
			sectionSelector: '.main-section-js',
			// paddingTop: 100,
			scrollingSpeed: 600,
			recordHistory: true,
			responsiveWidth: 1200, // and add css rule .fp-enabled
			responsiveHeight: 400, // and add css rule .fp-enabled
			// normalScrollElements: '.main-section--news',
			// scrollOverflow: true,
			// add .fp-noscroll for deactivate scroll
			// scrollOverflowOptions: {
			// 	scrollbars: 'custom'
			// },

			// dots navigation
			navigation: true,
			navigationPosition: null
			// navigationTooltips: ['First', 'Second', 'Third', '4', 'foo'],
			// showActiveTooltip: true
		});
	}

	$('.move-next-section-js').on('click', function (e) {
		e.preventDefault();

		if($mainSections.length) {
			$.fn.fullpage.moveSectionDown();
		}
	});
}
/*full page scroll*/

/**
 * !Initial sliders on the project
 * */
function slidersInit() {
	//images carousel
	var $imagesCarousel = $('.images-slider');

	if($imagesCarousel.length){
		var slideCounterTpl = '' +
			'<div class="slider-counter">' +
			'<span class="slide-curr">0</span>/<span class="slide-total">0</span>' +
			'</div>';

		$imagesCarousel.each(function () {
			var $currentImagesCarousel = $(this);
			var $images = $currentImagesCarousel.find('.images-slider__list');
			var dur = 200;

			$images.on('init', function (event, slick) {
				$(slick.$slider).append($(slideCounterTpl).clone());

				$('.slide-total', $(slick.$slider)).text(slick.$slides.length);
				$('.slide-curr', $(slick.$slider)).text(slick.currentSlide + 1);
			});

			$images.slick({
				fade: false,
				speed: dur,
				slidesToShow: 1,
				slidesToScroll: 1,
				// initialSlide: 2,
				// lazyLoad: 'ondemand',
				infinite: true,
				dots: false,
				arrows: true
			}).on('beforeChange', function (event, slick, currentSlide, nextSlider) {
				$('.slide-curr', $(slick.$slider)).text(nextSlider + 1);
			});

		});
	}

	/*main slider*/
	var $mainSlider = $('.main-slider-js');
	if ($mainSlider.length) {
		$mainSlider.each(function () {
			var $thisSlider = $(this);
			var $thisBtnNext = $('.swiper-button-next', $thisSlider);
			var $thisBtnPrev = $('.swiper-button-prev', $thisSlider);
			var $thisFractPag = $('.swiper-pagination', $thisSlider);

			new Swiper($thisSlider, {
				// Optional parameters
				loop: false,
				// Keyboard
				keyboardControl: true,

				// Navigation arrows
				nextButton: $thisBtnNext,
				prevButton: $thisBtnPrev,

				// Pagination
				pagination: $thisFractPag,
				paginationType: 'fraction'
			});
		});
	}

	/*services slider*/
	var $mServicesSlider = $('.m-services-js');

	if ($mServicesSlider.length) {
		$mServicesSlider.each(function () {
			var $thisSlider = $(this);
			var $thisSliderWrap = $thisSlider.parent();
			var $thisPag = $('.m-services-pagination-js', $thisSliderWrap);
			var serviceBullet = 'm-services-bullet';

			var currentMServicesSlider = new Swiper($thisSlider, {
				// Classes
				bulletClass: serviceBullet,
				bulletActiveClass: serviceBullet + '-active',

				// Optional parameters
				effect: 'fade',
				fade: {
					crossFade: true
				},
				loop: false,

				// Keyboard / Mousewheel
				keyboardControl: false,
				mousewheelControl: false,
				simulateTouch: false,

				// Pagination
				pagination: $thisPag,
				paginationClickable: false,
				paginationBulletRender: function (swiper, index, className) {
					var $curSlide = $(swiper.slides).eq(index);
					return '<a href="'+ $curSlide.data('link') +'" class="' + className + '"><i>' + (index + 1) + '</i><span>' + $curSlide.data('label') + '</span></a>';
				}
			});

			$('.m-services-pagination-js').on('mouseenter', '.' + serviceBullet, function () {
				currentMServicesSlider.slideTo($(this).index());
			});
		});
	}

	/*tape slider*/
	var $tapeSlider = $('.tape-slider-js');
	if ($tapeSlider.length) {
		$tapeSlider.each(function () {
			var $thisSlider = $(this);
			var $thisBtnNext = $('.swiper-button-next', $thisSlider);
			var $thisBtnPrev = $('.swiper-button-prev', $thisSlider);
			var $thisFractPag = $('.swiper-pagination', $thisSlider);

			new Swiper($thisSlider, {
				slidesPerView: 'auto',
				// slidesPerGroup: 3,
				// autoHeight: true,
				// Optional parameters
				loop: false,
				// Keyboard
				keyboardControl: true,
				// additional slide offset in the beginning of the container
				slidesOffsetBefore: 91,
				spaceBetween: 65,
				// Ratio to trigger swipe to next/previous slide during long swipes
				longSwipesRatio: 0.1,
				longSwipesMs: 200,

				// Navigation arrows
				nextButton: $thisBtnNext,
				prevButton: $thisBtnPrev,
				// navigation: {
				// 	nextEl: $thisBtnNext,
				// 	prevEl: $thisBtnPrev
				// },

				// Pagination
				pagination: $thisFractPag,
				paginationType: 'fraction',
				// pagination: {
				// 	el: $thisFractPag,
				// 	type: 'fraction'
				// },
				// Responsive breakpoints
				breakpoints: {
					1919: {
						slidesOffsetBefore: 71,
						spaceBetween: 30
					},
					1599: {
						slidesOffsetBefore: 41
					},
					1199: {
						slidesOffsetBefore: 30
					},
					639: {
						slidesOffsetBefore: 20
					},
					479: {
						slidesOffsetBefore: 0,
						slidesPerView: 1
					}
				},
				// events
				onInit: function (swiper) {
					$(swiper.slides).matchHeight({
						byRow: true, property: 'height', target: null, remove: false
					});
				}
			});
		});
	}

	/*similar slider*/
	var $similarSlider = $('.similar-slider-js');
	if ($similarSlider.length) {
		$similarSlider.each(function () {
			var $thisSlider = $(this);
			var $thisBtnNext = $('.swiper-button-next', $thisSlider);
			var $thisBtnPrev = $('.swiper-button-prev', $thisSlider);
			var $thisFractPag = $('.swiper-pagination', $thisSlider);

			new Swiper($thisSlider, {
				slidesPerView: 5,
				slidesPerGroup: 5,
				// autoHeight: true,
				// Optional parameters
				loop: false,
				// Keyboard
				keyboardControl: true,
				// additional slide offset in the beginning of the container
				// slidesOffsetBefore: 91,
				spaceBetween: 65,
				// Ratio to trigger swipe to next/previous slide during long swipes
				longSwipesRatio: 0.1,
				longSwipesMs: 200,

				// Navigation arrows
				nextButton: $thisBtnNext,
				prevButton: $thisBtnPrev,
				// navigation: {
				// 	nextEl: $thisBtnNext,
				// 	prevEl: $thisBtnPrev
				// },

				// Pagination
				pagination: $thisFractPag,
				paginationType: 'fraction',
				// pagination: {
				// 	el: $thisFractPag,
				// 	type: 'fraction'
				// },
				// Responsive breakpoints
				breakpoints: {
					1919: {
						slidesOffsetBefore: 40,
						spaceBetween: 40
					}
				},
				// events
				onInit: function (swiper) {
					$(swiper.slides).matchHeight({
						byRow: true, property: 'height', target: null, remove: false
					});
				}
			});
		});
	}
}

/**
 * !extra popup jQuery plugin
 * */
(function ($) {
	// external js:
	// 1) TweetMax VERSION: 1.19.0 (libs);
	// 2) device.js (libs);
	// 3) resizeByWidth (resize only width);

	// add css style
	// .before-extra-popup-open{
	// 	width: 100%!important;
	// 	height: 100%!important;
	// 	max-width: 100%!important;
	// 	max-height: 100%!important;
	// 	margin: 0!important;
	// 	padding: 0!important;
	// 	overflow: hidden!important;
	// }

	// .before-extra-popup-open .wrapper{ z-index: 99; } // z-index of header must be greater than footer
	//
	// if nav need to hide
	// @media only screen and (min-width: [example: 1280px]){
	// .nav{
	// 		-webkit-transform: translate(0, 0) matrix(1, 0, 0, 1, 0, 0) !important;
	// 		-ms-transform: translate(0, 0) matrix(1, 0, 0, 1, 0, 0) !important;
	// 		transform: translate(0, 0) matrix(1, 0, 0, 1, 0, 0) !important;
	// 	}
	// .nav-list > li{
	// 		-webkit-transform: translate(0, 0) matrix(1, 0, 0, 1, 0, 0) !important;
	// 		-ms-transform: translate(0, 0) matrix(1, 0, 0, 1, 0, 0) !important;
	// 		transform: translate(0, 0) matrix(1, 0, 0, 1, 0, 0) !important;
	// 		opacity: 1 !important;
	// 		visibility: visible !important;
	// 	}
	// }

	var defaults = {
		mainContainer: 'html', // container wrapping all elements
		navContainer: null, // main navigation container
		navMenu: null, // menu
		btnMenu: null, // element which opens or switches menu
		btnClose: null, // element which closes a menu
		navMenuItem: null,
		navMenuAnchor: 'a',
		staggerElement: null,
		overlayClass: 'popup-overlay', // overlay's class
		overlayAppendTo: 'body', // where to place overlay
		overlayAlpha: 0.8,
		overlayIndex: 997,
		classReturn: null,
		overlayBoolean: true,
		animationType: 'ltr', // rtl or ltr
		animationScale: 0.85, // default scale for animation
		animationSpeed: 300, // animation speed of the main element
		animationSpeedOverlay: null, // animation speed of the overlay
		alpha: 1,
		ease: Cubic.easeOut, // animation (gsap) https://greensock.com/customease
		minWidthItem: 100,
		mediaWidth: null,
		closeOnResize: true,
		cssScrollBlocked: false, // add class to body for blocked scroll
		closeEsc: true, // close popup on click Esc,
		activeClass: 'active',
		openedClass: 'extra-popup-opened',
		beforeOpenClass: 'extra-popup-before-open',
		extraPopupBeforeOpen: null
	};

	var ExtraPopup = function (settings) {
		var options = $.extend(defaults, settings || {});

		var container = $(options.navContainer),
			_animateSpeed = options.animationSpeed;

		var self = this;
		self.options = options;
		self.$mainContainer = $(options.mainContainer);            // . по умолчанию <html></html>
		self.$navMenu = $(options.navMenu);
		self.$btnMenu = $(options.btnMenu);
		self.$btnClose = $(options.btnClose);
		self.$navContainer = container;
		self.$navMenuItem = $(options.navMenuItem, container);     // Пункты навигации;
		self.$navMenuAnchor = $(options.navMenuAnchor, container); // Элемент, по которому производится событие (клик);
		self.$staggerElement = options.staggerElement;  //Элементы в стеке, к которым применяется анимация. По умолчанию null;

		self._animationType = options.animationType;
		self._animationScale = options.animationScale;
		self._animateSpeed = _animateSpeed;
		self.ease = options.ease;
		self.alpha = options.alpha;

		// overlay
		self.overlayBoolean = options.overlayBoolean;
		self.overlayAppendTo = options.overlayAppendTo;
		self.$overlay = $('<div class="' + options.overlayClass.substring(0) + '"></div>'); // Темплейт оверлея;
		self._overlayAlpha = options.overlayAlpha;
		self._overlayIndex = options.overlayIndex;
		self._animateSpeedOverlay = options.animationSpeedOverlay || _animateSpeed;
		self._minWidthItem = options.minWidthItem;
		self._mediaWidth = options.mediaWidth;
		self.closeOnResize = options.closeOnResize;
		self.cssScrollBlocked = options.cssScrollBlocked;
		self.closeEsc = options.closeEsc;

		self.desktop = device.desktop();

		self.modifiers = {
			active: options.activeClass,
			opened: options.openedClass,
			beforeOpen: options.beforeOpenClass
		};

		self.outsideClick();
		if ( self._mediaWidth === null || window.innerWidth < self._mediaWidth ) {
			self.preparationAnimation();
		}
		self.toggleMenu();
		self.eventsbtnClose();
		self.clearStyles();
		self.closeNavOnEsc();
		self.closeNavMethod();
	};

	ExtraPopup.prototype.navIsOpened = false;

	// overlay append to "overlayAppendTo"
	ExtraPopup.prototype.createOverlay = function () {
		var self = this,
			$overlay = self.$overlay;

		$overlay.appendTo(self.overlayAppendTo);

		TweenMax.set($overlay, {
			autoAlpha: 0,
			position: 'fixed',
			width: '100%',
			height: '100%',
			left: 0,
			top: 0,
			background: '#000',
			'z-index': self._overlayIndex,
			onComplete: function () {
				TweenMax.to($overlay, self._animateSpeedOverlay / 1000, {autoAlpha: self._overlayAlpha});
			}
		});
	};

	// toggle overlay
	ExtraPopup.prototype.toggleOverlay = function (close) {
		var self = this,
			$overlay = self.$overlay,
			ease = self.ease;

		if (close === false) {
			TweenMax.to($overlay, self._animateSpeedOverlay / 1000, {
				autoAlpha: 0,
				ease: ease,
				onComplete: function () {
					$overlay.remove();
				}
			});
			return false;
		}

		self.createOverlay();
	};

	// toggle menu
	ExtraPopup.prototype.toggleMenu = function () {
		var self = this,
			$buttonMenu = self.$btnMenu;

		// $buttonMenu.on('mousedown touchstart vmousedown', function (e) {
		$buttonMenu.on('click', function (e) {

			if (self.navIsOpened) {
				self.closeNav();
			} else {
				self.openNav();
			}

			e.preventDefault();
			e.stopPropagation();
		});
	};

	// events btn close menu
	ExtraPopup.prototype.eventsbtnClose = function () {

		var self = this;

		self.$btnClose.on('click', function (e) {
			e.preventDefault();

			if ( self.navIsOpened ) {
				self.closeNav();
			}

			e.stopPropagation();
		});
	};

	// click outside menu
	ExtraPopup.prototype.outsideClick = function () {
		var self = this;

		$(document).on('click', function () {
			if ( self.navIsOpened ) {
				self.closeNav();
			}
		});

		self.$navContainer.on('click', function (e) {
			if ( self.navIsOpened ) {
				e.stopPropagation();
			}
		})
	};

	// close popup on click to "Esc" key
	ExtraPopup.prototype.closeNavOnEsc = function () {
		var self = this;

		$(document).keyup(function(e) {
			if (self.navIsOpened && self.closeEsc && e.keyCode === 27) {
				self.closeNav();
			}
		});
	};

	// close popup (method)
	ExtraPopup.prototype.closeNavMethod = function () {
		var self = this;

		self.$navContainer.on('extraPopupClose', function () {
			if (self.navIsOpened) {
				self.closeNav();
			}
		})
	};

	// open nav
	ExtraPopup.prototype.openNav = function() {
		// console.log("openNav");

		var self = this,
			$html = self.$mainContainer,
			$navContainer = self.$navContainer,
			$buttonMenu = self.$btnMenu,
			$buttonClose = self.$btnClose,
			_animationSpeed = self._animateSpeedOverlay,
			$staggerElement = self.$staggerElement,
			ease = self.ease;

		var modifiers = self.modifiers;
		var classBeforeOpen = modifiers.beforeOpen;
		var classAfterOpen = modifiers.opened;

		$navContainer.trigger('extraPopupBeforeOpen');
		// self.options.extraPopupBeforeOpen(self.$navContainer);

		$html.addClass(classBeforeOpen);
		$buttonMenu.addClass(modifiers.active);
		$buttonClose.addClass(classBeforeOpen);

		if(self.cssScrollBlocked){
			self.cssScrollFixed();
		}

		$navContainer.css({
			'-webkit-transition-duration': '0s',
			'transition-duration': '0s'
		});

		// animation of stagger
		if($staggerElement) {
			TweenMax.staggerTo($staggerElement, 0.85, {
				autoAlpha: 1,
				scale: 1,
				y: 0,
				yPercent: 0,
				xPercent: 0,
				ease: ease
			}, 0.1);
		}

		TweenMax.to($navContainer, _animationSpeed / 1000, {
			xPercent: 0,
			scale: 1,
			autoAlpha: 1,
			ease: ease,
			onComplete: function () {
				$html.addClass(classAfterOpen);
				$buttonClose.addClass(classAfterOpen);

				// if (DESKTOP) {
				// 	noScroll();
				// }
			}
		});

		if (self.overlayBoolean) {
			self.toggleOverlay();
		}

		self.navIsOpened = true;
	};

	// close nav
	ExtraPopup.prototype.closeNav = function() {
		// console.log("closeNav");

		var self = this,
			$html = self.$mainContainer,
			$navContainer = self.$navContainer,
			$buttonMenu = self.$btnMenu,
			$buttonClose = self.$btnClose,
			$staggerElement = self.$staggerElement,
			_animationSpeed = self._animateSpeedOverlay,
			_mediaWidth = self._mediaWidth,
			_animationType = self._animationType,
			ease = self.ease,
			alpha = self.alpha;

		var modifiers = self.modifiers;
		var classAfterOpen = modifiers.opened;
		var classBeforeOpen = modifiers.beforeOpen;

		$html.removeClass(classAfterOpen);
		$html.removeClass(classBeforeOpen);
		$buttonMenu.removeClass(modifiers.active);
		$buttonClose.removeClass(classAfterOpen);
		$buttonClose.removeClass(classBeforeOpen);

		if (self.overlayBoolean) {
			self.toggleOverlay(false);
		}

		var duration = _animationSpeed / 1000;

		// animation of stagger
		if($staggerElement) {
			TweenMax.staggerTo($staggerElement, 0.85, {
				autoAlpha: alpha,
				xPercent: -100
			}, 0.1);
		}

		if (_animationType === 'ltr') {
			TweenMax.to($navContainer, duration, {
				xPercent: -100,
				ease: ease,
				onComplete: function () {
					if (_mediaWidth === null || window.innerWidth < _mediaWidth) {
						self.preparationAnimation();
					}

					TweenMax.set($navContainer, {
						autoAlpha: alpha
					});

					// if (DESKTOP) {
					// 	canScroll();
					// }

					if(self.cssScrollBlocked){
						self.cssScrollUnfixed();
					}
				}
			});

		} else if (_animationType === 'rtl') {
			TweenMax.to($navContainer, duration, {
				xPercent: 100,
				ease: ease,
				onComplete: function () {
					if (_mediaWidth === null || window.innerWidth < _mediaWidth) {
						self.preparationAnimation();
					}

					TweenMax.set($navContainer, {
						autoAlpha: alpha
					});

					// if (DESKTOP) {
					// 	canScroll();
					// }

					if(self.cssScrollBlocked){
						self.cssScrollUnfixed();
					}
				}
			});

		} else if (_animationType === 'surface') {
			TweenMax.to($navContainer, duration, {
				scale: self._animationScale,
				autoAlpha: alpha,
				ease: ease,
				onComplete: function () {
					if (_mediaWidth === null || window.innerWidth < _mediaWidth) {
						self.preparationAnimation();
					}

					// if (DESKTOP) {
					// 	canScroll();
					// }

					if(self.cssScrollBlocked){
						self.cssScrollUnfixed();
					}
				}
			});

		} else {
			console.error('Type animation "' + _animationType + '" is wrong!');
			return;
		}

		self.navIsOpened = false;
	};

	// preparation element before animation
	ExtraPopup.prototype.preparationAnimation = function() {
		var self = this;

		var $navContainer = self.$navContainer,
			$staggerElement = self.$staggerElement,
			_animationType = self._animationType,
			alpha = self.alpha;

		// console.log('preparationAnimation: ', $navContainer);

		// animation of stagger
		if($staggerElement) {
			TweenMax.set($staggerElement, {
				autoAlpha: alpha,
				xPercent: -100
			});
		}

		if (_animationType === 'ltr') {
			TweenMax.set($navContainer, {
				xPercent: -100,
				autoAlpha: alpha,
				onComplete: function () {
					$navContainer.show(0);
				}
			});

		} else if (_animationType === 'rtl') {
			TweenMax.set($navContainer, {
				xPercent: 100,
				autoAlpha: alpha,
				onComplete: function () {
					$navContainer.show(0);
				}
			});

		} else if (_animationType === 'surface') {
			TweenMax.set($navContainer, {
				scale: self._animationScale,
				autoAlpha: alpha,
				onComplete: function () {
					$navContainer.show(0);
				}
			});

		} else {
			console.error('Type animation "' + _animationType + '" is wrong!');
		}
	};

	ExtraPopup.prototype.cssScrollFixed = function() {
		$('html').addClass('css-scroll-fixed');
		$(document).trigger('extraPopupScrollFixed');
	};

	ExtraPopup.prototype.cssScrollUnfixed = function() {
		$('html').removeClass('css-scroll-fixed');
		$(document).trigger('extraPopupScrollUnfixed');
	};

	// clearing inline styles
	ExtraPopup.prototype.clearStyles = function() {
		var self = this,
			$btnMenu = self.$btnMenu,
			$navContainer = self.$navContainer,
			$staggerElement = self.$staggerElement;

		//clear on horizontal resize
		if (self.closeOnResize === true) {

			$(window).on('resizeByWidth', function () {
				if (self.navIsOpened) {
					if (!$btnMenu.is(':visible')) {
						$navContainer.attr('style', '');
						$staggerElement.attr('style', '');
						self.closeNav();
					} else {
						self.closeNav();
					}
				}
			});

		}
	};

	window.ExtraPopup = ExtraPopup;

}(jQuery));

/**
 * !shutter initial
 * */
function shuttersInit(){

	$(document).on('extraPopupScrollFixed', function () {
		if($('.main-sections-js').length) {
			$.fn.fullpage.setAllowScrolling(false); // blocked fullpage scroll
		}
	});

	$(document).on('extraPopupScrollUnfixed', function () {
		if($('.main-sections-js').length) {
			$.fn.fullpage.setAllowScrolling(true); // unblocked fullpage scroll
		}
	});

	/*navigation*/
	var navShutterClass = '.nav-shutter-js';
	var $navShutter = $(navShutterClass);

	if($navShutter.length){

		new ExtraPopup({
			navContainer: navShutterClass,
			navMenu: '.nav__list',
			btnMenu: '.btn-nav-js',
			btnClose: '.btn-shutter-close-js',
			// staggerElement: '.nav__list > li',
			overlayClass: 'popup-overlay--nav',
			overlayAppendTo: 'body',
			closeOnResize: false,
			// mediaWidth: 1280,
			animationSpeed: 200,
			overlayAlpha: 0.35,
			overlayIndex: 999,
			// alpha: 0,
			cssScrollBlocked: true,
			openedClass: 'shutter--opened',
			beforeOpenClass: 'shutter--before-open',
			ease: 'Power2.easeInOut'
			// ease: 'Power0.easeNone'
		});
	}

	/*search*/
	var searchShutterClass = '.search-shutter-js';
	var $searchShutter = $(searchShutterClass);

	if($searchShutter.length){

		new ExtraPopup({
			navContainer: searchShutterClass,
			// navMenu: '.nav__list',
			btnMenu: '.btn-search-open-js',
			btnClose: '.btn-shutter-close-js',
			// staggerElement: '.nav__list > li',
			overlayClass: 'popup-overlay--nav',
			overlayAppendTo: 'body',
			closeOnResize: false,
			// mediaWidth: 1280,
			animationSpeed: 200,
			overlayAlpha: 0.35,
			overlayIndex: 999,
			// alpha: 0,
			cssScrollBlocked: true,
			openedClass: 'shutter--opened',
			beforeOpenClass: 'shutter--before-open',
			ease: 'Power2.easeInOut'
			// ease: 'Power0.easeNone'
		});
	}

	/*bag*/
	var bagShutterClass = '.bag-shutter-js';
	var $bagShutter = $(bagShutterClass);

	if($bagShutter.length){

		new ExtraPopup({
			navContainer: bagShutterClass,
			// navMenu: '.nav__list',
			btnMenu: '.btn-bag-open-js',
			btnClose: '.btn-shutter-close-js',
			// staggerElement: '.nav__list > li',
			overlayClass: 'popup-overlay--nav',
			overlayAppendTo: 'body',
			closeOnResize: false,
			// mediaWidth: 1280,
			animationType: 'rtl',
			animationSpeed: 200,
			overlayAlpha: 0.35,
			overlayIndex: 999,
			// alpha: 0,
			cssScrollBlocked: true,
			openedClass: 'shutter--opened',
			beforeOpenClass: 'shutter--before-open',
			ease: 'Power2.easeInOut'
			// ease: 'Power0.easeNone'
		});
	}

	$searchShutter.on('extraPopupBeforeOpen', function () {
		$navShutter.trigger('extraPopupClose');
		$bagShutter.trigger('extraPopupClose');

		$(this).find('.search-form__input').focus();
	});

	$navShutter.on('extraPopupBeforeOpen', function () {
		$searchShutter.trigger('extraPopupClose');
		$bagShutter.trigger('extraPopupClose');
	});

	$bagShutter.on('extraPopupBeforeOpen', function () {
		$searchShutter.trigger('extraPopupClose');
		$navShutter.trigger('extraPopupClose');
	});
}

/**
 * !tab switcher
 * */
function tabSwitcher() {
	// external js:
	// 1) TweetMax VERSION: 1.19.0 (widgets.js);
	// 2) resizeByWidth (resize only width);

	/*
	 <!--html-->
	 <div class="some-class tabs-js" data-collapsed="true" data-auto-height="true" data-to-queue="480">
	 <!--if has data-collapsed="true" one click open tab content, two click close collapse tab content-->
	 <div class="some-class__nav">
	 <div class="some-class__tab">
	 <a href="#some-id-01" class="tab-anchor-js">Text tab 01</a>
	 </div>
	 <div class="some-class__tab">
	 <a href="#some-id-02" class="tab-anchor-js">Text tab 02</a>
	 </div>
	 </div>

	 <div class="some-class__panels tab-container-js">
	 <div class="some-class__panel tab-content-js" id="some-id-01">Text content 01</div>
	 <div class="some-class__panel tab-content-js" id="some-id-02">Text content 02</div>
	 </div>
	 </div>
	 <!--html end-->
	 */

	var $tabWrapper = $('.tabs-js');
	var $container = $('.tab-container-js');

	if (!$container.length) return false;

	if ($tabWrapper.length) {
		var $anchor = $('.tab-anchor-js'),
			$content = $('.tab-content-js'),
			activeClass = 'active-tab',
			collapseAllClass = 'collapsed-all-tab',
			idPrefix = 'activeIs',
			animationSpeed = 0.2,
			animationHeightSpeed = 0.08;

		$.each($tabWrapper, function () {
			var $currentContainer = $(this),
				$currentAnchor = $currentContainer.find($anchor),
				$thisContainer = $currentContainer.find($container),
				$currentContent = $currentContainer.find($content);


			if ($currentContainer.find('.' + activeClass).length > 0) {
				var initialTab = $currentContainer.find('.' + activeClass).attr('href').substring(1);
			}
			if($currentContainer.data('collapsed') === true){
				$currentContainer.addClass(collapseAllClass);
			}
			// var toQueue = $currentContainer.data('to-queue'); // transform tab for toQueue value layout width
			// var tabInitedFlag = false;
			var valDataAutoHeight = $currentContainer.data('auto-height');
			var thisAutoHeight = valDataAutoHeight !== false;
			var activeTab = false;

			// prepare traffic content
			function prepareTabsContent() {
				$thisContainer.css({
					'display': 'block',
					'position': 'relative',
					'overflow': 'hidden'
				});

				$currentContent.css({
					// 'display': 'none',
					'position': 'absolute',
					'left': 0,
					'top': 0,
					'width': '100%',
					'z-index': -1
				});

				switchContent();
			}

			prepareTabsContent();

			// toggle content
			$currentAnchor.on('click', function (e) {
				e.preventDefault();

				var $self = $(this),
					selfTab = $self.attr('href').substring(1);

				if ($currentContainer.data('collapsed') === true && activeTab === selfTab) {

					toggleActiveClass();
					toggleContent(false);
					changeHeightContainer(false);

					return;
				}

				if (activeTab === selfTab) return false;

				initialTab = selfTab;

				switchContent();
			});

			// collapse current tab method
			$currentAnchor.eq(0).on('tabSwitcherCollapse', function () {
				var $self = $(this);
				var selfTab = $self.attr('href').substring(1);

				if (activeTab === selfTab) {
					toggleActiveClass();
					toggleContent(false);
					changeHeightContainer(false);
				}
			});

			// switch content
			function switchContent() {
				if (initialTab) {
					toggleContent();
					changeHeightContainer();
					toggleActiveClass();
				}
			}

			// show active content and hide other
			function toggleContent() {

				thisAutoHeight && $thisContainer.css('height', $thisContainer.outerHeight());

				$currentContent.css({
					'position': 'absolute',
					'left': 0,
					'top': 0
				});

				TweenMax.to($currentContent, animationSpeed, {
					autoAlpha: 0
					// ,'z-index': -1
				});

				if (arguments[0] === false) return;

				var $initialContent = $currentContent.filter('[id="' + initialTab + '"]');

				$initialContent.css('z-index', 2);

				TweenMax.to($initialContent, animationSpeed, {
					autoAlpha: 1
					// ,'z-index': 2
				});
			}

			// change container's height
			function changeHeightContainer() {
				var $initialContent = $currentContent.filter('[id="' + initialTab + '"]');

				if (arguments[0] === false) {
					TweenMax.to($thisContainer, animationHeightSpeed, {
						'height': 0
					});

					return;
				}

				if (thisAutoHeight) {
					TweenMax.to($thisContainer, animationHeightSpeed, {
						'height': $initialContent.outerHeight(),
						onComplete: function () {

							thisAutoHeight && $thisContainer.css('height', '');

							$initialContent.css({
								'position': 'relative',
								'left': 'auto',
								'right': 'auto'
							});

							$tabWrapper.trigger('afterChange.tabSwitcher');
						}
					});
				}

				$initialContent.css({
					'position': 'relative',
					'left': 'auto',
					'right': 'auto'
				})
			}

			// toggle class active
			function toggleActiveClass() {
				$currentAnchor.removeClass(activeClass);
				$currentContent.removeClass(activeClass);
				if($currentContainer.data('collapsed') === true){
					$currentContainer.addClass(collapseAllClass);
				}

				if (activeTab) {
					$currentContainer.removeClass(idPrefix + '-' + activeTab);
				}

				if (initialTab !== activeTab) {

					$currentAnchor.filter('[href="#' + initialTab + '"]').addClass(activeClass);
					$currentContent.filter('[id="' + initialTab + '"]').addClass(activeClass);
					$currentContainer.addClass(idPrefix + '-' + initialTab);
					$currentContainer.removeClass(collapseAllClass);

					activeTab = initialTab;

					return false;
				}

				activeTab = false;
			}

			// to queue
			// $(window).on('load debouncedresize', function () {
			// 	console.log("toQueue.length: ", !!toQueue);
			// 	if (toQueue && window.innerWidth < toQueue){
			// 		tabInitedFlag = false;
			// 		$thisContainer.attr('style', "");
			// 		$currentContent.attr('style', "");
			//
			// 		return;
			// 	}
			//
			// 	console.log("tabInitedFlag: ", tabInitedFlag);
			// 	if(!tabInitedFlag) {
			// 		prepareTabsContent();
			// 		tabInitedFlag = true;
			// 	}
			// });
		});

		// if transform tabs to accordion
		var $simpleAccordionHand = $('.js-tab-link');

		if ($simpleAccordionHand.length) {
			$simpleAccordionHand.each(function () {
				var $thisHand = $(this);

				tabAccordion($thisHand, $thisHand.next().children(), animationSpeed*1000);
			})
		}

		$(window).on('debouncedresizeByWidth', function () {
			$simpleAccordionHand.each(function () {
				var $thisHand = $(this);

				if ($thisHand.hasClass(activeClass)) {
					$thisHand.next().children().show();
				}
			});
		});

		function tabAccordion($hand, $panel, animateSpeed) {
			if ($hand.hasClass(activeClass)) {
				$panel.show();
			}

			$hand.on('click', function (e) {
				e.preventDefault();

				$(this).toggleClass(activeClass);
				$panel.stop().slideToggle(animateSpeed);
			})
		}
	}
}

/**
 * !Toggle drop (plugin)
 * */
;(function($){
	var defaults = {
		opener: '.ms-drop__opener-js',
		openerText: 'span',
		drop: '.ms-drop__drop-js',
		dropOption: '.ms-drop__drop-js a',
		dropOptionText: 'span',
		initClass: 'ms-drop--initialized',
		outsideClick: true, // Close all if outside click
		closeAfterSelect: true, // Close drop after selected option
		preventOption: false, // Add preventDefault on click to option
		selectValue: true, // Display the selected value in the opener
		modifiers: {
			isOpen: 'is-open',
			activeItem: 'active-item'
		}

		// Callback functions
		// afterInit: function () {} // Fire immediately after initialized
		// afterChange: function () {} // Fire immediately after added or removed an open-class
	};

	function MsDrop(element, options) {
		var self = this;

		self.config = $.extend(true, {}, defaults, options);

		self.element = element;

		self.callbacks();
		self.event();
		// close drop if clicked outside active element
		if (self.config.outsideClick) {
			self.clickOutside();
		}
		self.eventDropItems();
		self.init();
	}

	/** track events */
	MsDrop.prototype.callbacks = function () {
		var self = this;
		$.each(self.config, function (key, value) {
			if(typeof value === 'function') {
				self.element.on(key + '.msDrop', function (e, param) {
					return value(e, self.element, param);
				});
			}
		});
	};

	MsDrop.prototype.event = function () {
		var self = this;
		self.element.on('click', self.config.opener, function (event) {
			event.preventDefault();
			var curContainer = $(this).closest(self.element);

			if (curContainer.hasClass(self.config.modifiers.isOpen)) {
				curContainer.removeClass(self.config.modifiers.isOpen);

				// callback afterChange
				self.element.trigger('afterChange.msDrop');
				return;
			}

			self.element.removeClass(self.config.modifiers.isOpen);

			curContainer.addClass(self.config.modifiers.isOpen);

			// callback afterChange
			self.element.trigger('afterChange.msDrop');
		});
	};

	MsDrop.prototype.clickOutside = function () {

		var self = this;
		$(document).on('click', function(event){
			if( $(event.target).closest(self.element).length ) {
				return;
			}

			self.closeDrop();
			event.stopPropagation();
		});

	};

	MsDrop.prototype.closeDrop = function (container) {

		var self = this,
			$element = $(container || self.element);

		if ($element.hasClass(self.config.modifiers.isOpen)) {
			$element.removeClass(self.config.modifiers.isOpen);
		}

	};

	MsDrop.prototype.eventDropItems = function () {

		var self = this;

		self.element.on('click', self.config.dropOption, function (e) {
			var cur = $(this);
			var curParent = cur.parent();

			if(curParent.hasClass(self.config.modifiers.activeItem)){
				e.preventDefault();
				return;
			}
			if(self.config.preventOption){
				e.preventDefault();
			}

			var curContainer = cur.closest(self.element);

			curContainer.find(self.config.dropOption).parent().removeClass(self.config.modifiers.activeItem);

			curParent
				.addClass(self.config.modifiers.activeItem);

			if(self.config.selectValue){
				curContainer
					.find(self.config.opener).find(self.config.openerText)
					.text(cur.find(self.config.dropOptionText).text());
			}

			if(self.config.closeAfterSelect) {
				self.closeDrop();
			}

		});

	};

	MsDrop.prototype.init = function () {

		this.element.addClass(this.config.initClass);

		this.element.trigger('afterInit.msDrop');

	};

	$.fn.msDrop = function (options) {
		'use strict';

		return this.each(function(){
			new MsDrop($(this), options);
		});

	};
})(jQuery);

/**
 * !Toggle drop initial
 * */
function toggleDropInit() {
	var $shareContainer = $('.social-share__container-js');
	if($shareContainer.length){
		$shareContainer.msDrop({
			opener: '.social-share__opener-js',
			drop: 'social-share__drop-js',
			selectValue: false
		})
	}
}

/**
 * !Menu switcher
 * */
function menuSwitcher() {
	var $switcher = $('.menu-switcher-js'),
		activeClass = 'active';

	if($switcher.length) {
		$switcher.find('a').on('click', function (event) {
			var $currentToggleItem = $(this);
			$currentToggleItem.addClass(activeClass).siblings().removeClass(activeClass);
			$switcher.closest('.menu-container-js').find('.menu-panel-js').removeClass(activeClass);
			$('#' + $currentToggleItem.attr('href').substring(1)).addClass(activeClass);

			event.preventDefault();
		});
	}
}

/**
 * !Zoom images
 * */
function zoomImages() {
	var $toggler = $('.p-card__gallery__item'),
		$container = $('.p-card');
	var activeClass = 'zoom-on';
	var timeout;

	$toggler.on('click', function (e) {
		e.preventDefault();

		var $this = $(this),
			$thisContainer = $this.closest($container);

		$thisContainer.toggleClass(activeClass);

		$container.trigger('change.zoomImages');

		clearTimeout(timeout);

		timeout = setTimeout(function () {
			scrollTo($this, 300);
		}, 300);
	});

	// $(document).keyup(function(e) {
	// 	if ($container.hasClass(activeClass) && e.keyCode === 27) {
	// 		$container.removeClass(activeClass);
	//
	// 		$container.trigger('change.zoomImages');
	// 	}
	// });

	function scrollTo($element, speed) {

		var dur = speed || 300;

		if (!$(this).is(':animated')) {
			$('html,body').stop().animate({scrollTop: $element.offset().top}, dur);
		}
	}
}

/**
 * !Add data-length on list
 */
function addDataLengthChildren() {
	var $list = $('.list-counter-js');

	$.each($list, function () {
		var $currentList = $(this);

		$currentList.attr('data-length', $currentList.children().length)
	})
}

/**
 * !Equal height of blocks by maximum height of them
 */
function equalHeight() {
	// example
	var $equalHeight = $('.equal-height-js');

	if($equalHeight.length) {
		$equalHeight.children().matchHeight({
			byRow: true, property: 'height', target: null, remove: false
		});
	}
}

/**
 * !toggle view shops
 * */
/*function toggleView() {
	var $switcherHand = $('.view-switcher-js a');

	if ( $switcherHand.length ) {

		var $container = $('.view-container-js');
		var activeHand = 'active';
		var activeContainer = 'grid-view';

		$switcherHand.on('click', function (e) {
			e.preventDefault();

			var $this = $(this);

			if ( $this.hasClass(activeHand) ) return false;

			$switcherHand.removeClass(activeHand);
			// $container.removeClass(activeContainer);

			$this.addClass(activeHand);
			$container.toggleClass(activeContainer);
			// if ($this.index() === 0) {
			// 	$container.addClass(activeContainer);
			// }
		});
	}
}*/

(function($){
	// <!--view switcher-->
	// <div class="class-js" data-toggle-view-switcher="id">
	// 	<a href="#" class="grid-view tv-active" title="">View 1</a>
	// 	<a href="#" class="list-view" title="">View 2</a>
	// </div>
	// <!--view switcher end-->

	var defaults = {
		anchor: 'a',
		active: 0,
		containerClass: 'toggle-view-initialized',
		dataAttrSwitcher: 'data-toggle-view-switcher',
		dataAttrPanels: 'data-toggle-view-panels',

		activeClass: 'tv-active',
		viewClass: 'tv-alt-view'

		// Add callback-function:
		// created: function () {} // fire after initialized
		// changed: function () {} // fire after view changed
		// Callback-function outside call for example:
		// $('.thisClass').on('changed.toggleView', function () {
		// 	console.log('changed.toggleView...');
		// });
	};

	function ToggleView(element, options) {
		var self = this;

		self.config = $.extend(true, {}, defaults, options);

		self.element = element;
		self.anchor = self.element.find(self.config.anchor);
		self.panels = $('[' + self.config.dataAttrPanels + '="' + self.element.attr(self.config.dataAttrSwitcher) + '"]');

		self.callbacks();
		self.event(); // example event
		self.init(); // create DOM structure of the plugins
	}

	/** track events */
	ToggleView.prototype.callbacks = function () {
		var self = this;
		$.each(self.config, function (key, value) {
			if(typeof value === 'function') {
				self.element.on(key + '.toggleView', function (e, param) {
					return value(e, self.element, param);
				});
			}
		});
	};

	ToggleView.prototype.event = function () {
		var self = this;

		self.anchor.on('click', function (e) {
			e.preventDefault();
			var currentAnchor = $(this);

			if ( currentAnchor.hasClass(self.config.activeClass) ) return;

			self.anchor.removeClass(self.config.activeClass);

			currentAnchor.addClass(self.config.activeClass);

			// add modifiers class to panels
			var currentSwitcherAttr = currentAnchor.closest(self.element).attr(self.config.dataAttrSwitcher);

			$('[' + self.config.dataAttrPanels + '="' + currentSwitcherAttr + '"]').toggleClass(self.config.viewClass);

			self.element.trigger('changed.toggleView');
		});
	};

	ToggleView.prototype.init = function () {
		var self = this;

		self.element.addClass(self.config.containerClass);
		var currentSwitcherAttr = self.element.attr(self.config.dataAttrSwitcher);
		$('[' + self.config.dataAttrPanels + '="' + currentSwitcherAttr + '"]').addClass(self.config.containerClass);

		self.element.trigger('created.toggleView');

	};

	$.fn.toggleView = function (options) {
		'use strict';

		new ToggleView(this, options);

		return this;
	};
})(jQuery);

function toggleViewInit() {
	var $toggleViewSwitcherNews = $('.view-switcher-news-js');

	if ( $toggleViewSwitcherNews.length ) {

		$toggleViewSwitcherNews.toggleView({
			activeClass: 'active',
			viewClass: 'row-view-activated'
		})
	}

	// ==============================

	var $toggleViewSwitcherProducts = $('.view-switcher-products-js');

	if ( $toggleViewSwitcherProducts.length ) {

		$toggleViewSwitcherProducts.toggleView({
			activeClass: 'active',
			viewClass: 'grid-view'
		})
	}
}

/*toggle view shops end*/

/**
 * !multi filters jquery plugin
 * */
(function ($) {
	var MultiFilters = function (settings) {
		var options = $.extend({
			container: null,
			item: null,
			group: null,
			handler: null,
			placeholder: null,
			selected: null,
			drop: null,
			checkbox: null,
			labelText: null,
			btnReset: null,
			btnResetAll: null,
			tagsContainer: null,
			tagsItem: ".tags-item-js",
			tagsItemTpl: null,
			tagTextContainer: ".tag-text-js",

			dropOpenClass: 'is-open',
			filtersOnClass: 'filters-on',

			dataGroup: 'group',
			dataTag: 'tag',
			dataName: 'index',
			dataPrefix: 'prefix',
			dataPostfix: 'postfix'
		}, settings || {});

		this.options = options;
		var container = $(options.container);

		this.$container = container;
		this.$item = $(options.item, container);
		this.$handler = $(options.handler, container);
		this.$placeholder = $(options.placeholder, container);
		this.$selected = $(options.selected, container);
		this.$drop = $(options.drop, container);
		this.$group = $(options.group, container);
		this.$checkbox = $(options.checkbox, container);
		this.$labelText = $(options.labelText, container);
		this.$btnReset = $(options.btnReset, container);
		this.$btnResetAll = $(options.btnResetAll, container);
		this.$tagsContainer = $(options.tagsContainer, container);
		this.tagsItem = options.tagsItem; // не jq-объект, чтобы можна было искать в DOM после добавления
		this.tagTextContainer = options.tagTextContainer; // не jq-объект, чтобы можна было искать в DOM после добавления
		this.tagsItemTpl = !options.tagsItemTpl ?
			'<div class="' + options.tagsItem.substring(1) + '"><i>Удалить</i><span class="' + options.tagTextContainer.substring(1) + '"></span></div>' :
			options.tagsItemTpl ;

		this.modifiers = {
			dropIsOpened: options.dropOpenClass,
			filtersOn: options.filtersOnClass
		};

		this.attributes = {
			group: options.dataGroup,
			tag: options.dataTag,
			name: options.dataName,
			prefix: options.dataPrefix,
			postfix: options.dataPostfix
		};

		this.bindCheckboxEvents();
		this.bindTagsEvents();
		this.toggleDrop();
		this.resetCheckboxesInGroup();
		this.resetAllCheckboxes();
		// this.addClassCustom();

	};

	// MultiFilters.prototype.dropIsOpened = false;

	MultiFilters.prototype.bindCheckboxEvents = function () {
		var self = this;
		var $container = self.$container;
		var $item = self.$item;
		var $group = self.$group;
		var $checkbox = self.$checkbox;
		var $btnReset = self.$btnReset;
		var filtersOnClass = self.modifiers.filtersOn;
		var attributes = self.attributes;

		$checkbox.on('change', function () {
			var $currentCheckbox = $(this);
			// console.info('Checkbox is change...');
			var $currentContainer = $currentCheckbox.closest($container);
			var $currentItem = $currentCheckbox.closest($item);
			var $currentGroup = $currentCheckbox.closest($group);
			var $currentLabel = $currentCheckbox.closest('label');
			var $currentLabelText = $currentLabel.find(self.$labelText);
			var $currentTagsContainer = $currentContainer.find(self.$tagsContainer);

			// attributes
			var currentAttrGroup = $currentGroup.data(attributes.group);
			var currentAttrName = $currentLabel.data(attributes.name);
			var currentAttrTag = $currentLabel.data(attributes.tag);

			// buttons
			var $currentBtnReset = $currentItem.find($btnReset);
			var $currentBtnResetAll = $currentContainer.find(self.$btnResetAll);

			// отключить кнопку очистки чекбоксов в ГРУППЕ
			self.disabledButton($currentBtnReset);
			// удалить класс наличия отмеченных чекбоксов с фильтров в ГРУППЕ
			self.removeClassCustom($currentItem, filtersOnClass);

			// console.log("currentAttrGroup: ", currentAttrGroup);
			// console.log("currentAttrName: ", currentAttrName);

			if($currentCheckbox.prop('checked')) {
				// добавляем тэг фильтра
				self.addTag($currentTagsContainer, currentAttrGroup, currentAttrName, currentAttrTag || $currentLabelText.text());
			} else {
				self.removeTag($currentTagsContainer, currentAttrGroup, currentAttrName);
			}

			// отключить кнопку очистки ВСЕХ чекбоксов
			self.disabledButton($currentBtnResetAll);
			// удалить класс наличия отмеченных чекбоксов со ВСЕХ фильтров
			// self.removeClassCustom($item, filtersOnClass);

			if (self.checkProp($currentGroup)) {
				// включить кнопку очистки чекбоксов в ГРУППЕ
				self.enabledButton($currentBtnReset);
				// добавить класс наличия отмеченных чекбоксов с фильтров в ГРУППЕ
				self.addClassCustom($currentItem, filtersOnClass);
			}

			// включить кнопку очистки ВСЕХ чекбоксов
			if (self.checkProp($currentContainer.find($group))) {
				self.enabledButton($currentBtnResetAll);
			}

			// проверка омечены все чекбоксы, или не все
			// var $toggle = $currentGroup.find('.toggle-all-filters-js');
			// if (self.checkProp($currentGroup, true)) {
			// 	$toggle.prop('checked', true);
			// 	self.checkedToggleBtn($toggle, activeClass);
			// } else {
			// 	$toggle.prop('checked', false);
			// 	self.uncheckedToggleBtn($toggle, activeClass);
			// }

			self.setLengthCheckedCheckboxes($currentGroup);
		});
	};

	MultiFilters.prototype.checkProp = function ($group, cond) {
		// если cond === true, происходит сравнение количества все фильтров к отмеченым

		var $checkboxes = $group.find(':checkbox');
		var hasChecked = false;
		var countChecked = 0;

		$.each($checkboxes, function () {

			if ($(this).prop('checked')) {
				hasChecked = true;

				if (cond !== true) {
					return false;
				}

				countChecked++;
			}
		});

		return hasChecked;

		// if (cond === true) {
		// 	// если количества все фильтров равно количесту отмеченных, то возвращает true, иначе false
		// 	return $checkboxes.length === self.getTotalCheckedInputs($group);
		// } else {
		// 	return hasChecked;
		// }
	};

	MultiFilters.prototype.setLengthCheckedCheckboxes = function ($wrap) {
		var self = this;
		var $currentItem = $wrap.closest(self.$item);
		var $currentHolder = $currentItem.find(self.$placeholder);
		var $currentSelected = $currentItem.find(self.$selected);
		var attributes = self.attributes;
		var textPrefix = $currentSelected.data(attributes.prefix) || "";
		var textPostfix = $currentSelected.data(attributes.postfix) || "";

		var lengthChecked = self.getLengthCheckedCheckboxes($wrap);

		$currentSelected.html(textPrefix + " " + lengthChecked + " " + textPostfix);

		$currentHolder.toggle(!lengthChecked > 0);
		$currentSelected.toggle(lengthChecked > 0);
	};

	MultiFilters.prototype.getLengthCheckedCheckboxes = function ($wrap) {
		var $checkboxes = $wrap.find(':checkbox');

		var totalCheckedInput = 0;

		$.each($checkboxes, function () {

			if ($(this).prop('checked')) {

				totalCheckedInput++;
			}
		});

		return totalCheckedInput;
	};

	MultiFilters.prototype.bindTagsEvents = function () {
		var self = this;
		var $container = self.$container;
		var attributes = self.attributes;

		$container.on('click', self.tagsItem, function (e) {
			var $currentTag = $(this);
			self.removeTag($currentTag.closest(self.$tagsContainer), $currentTag.data(attributes.group), $currentTag.data(attributes.name));

			e.preventDefault();
		});
	};

	MultiFilters.prototype.resetCheckboxesInGroup = function () {
		var self = this;

		self.$btnReset.on('click', function (e) {
			e.preventDefault();

			var $currentBtn = $(this);

			self.resetCheckboxes($currentBtn.closest(self.$item));
		});
	};

	MultiFilters.prototype.resetAllCheckboxes = function () {
		var self = this;

		self.$btnResetAll.on('click', function (e) {
			e.preventDefault();

			var $currentBtn = $(this);

			self.resetCheckboxes($currentBtn.closest(self.$container).find(self.$group));
		});
	};

	MultiFilters.prototype.resetCheckboxes = function ($container) {
		$container.find(':checked').prop('checked', false).trigger('change');
	};

	MultiFilters.prototype.enabledButton = function ($button) {
		$button.prop('disabled', false);
	};

	MultiFilters.prototype.disabledButton = function ($button) {
		$button.prop('disabled', true);
	};

	MultiFilters.prototype.toggleDrop = function () {
		var self = this;
		var $container = self.$container;
		var $item = self.$item;
		var $handler = self.$handler;
		var $drop = self.$drop;
		var dropIsOpenedClass = self.modifiers.dropIsOpened;
		// window.preventAction = true;

		$handler.on('click', function (e) {
			e.preventDefault();
			e.stopPropagation();

			var $currentHandler = $(this);
			var $currentItem = $currentHandler.closest($item);

			if($currentItem.hasClass(dropIsOpenedClass)) {
				// closeVisibleDrop();
				closeCurrentDrop($currentItem);

				return;
			}

			// closeVisibleDrop();
			openCurrentDrop($currentItem);
		});

		// $(document).on('click', function () {
		// 	closeVisibleDrop();
		// });

		// $(document).keyup(function(e) {
		// 	// console.log('Is drop opened? - ', self.dropIsOpened);
		// 	if (self.dropIsOpened && e.keyCode === 27) {
		// 		closeVisibleDrop();
		// 		// console.log('Drop closed!');
		// 	}
		// });

		$container.on('closeDrop', function () {
			closeVisibleDrop();
		});

		$($drop).on('click', function (e) {
			e.stopPropagation();
		});

		function openCurrentDrop($elements) {
			self.addClassCustom($elements, dropIsOpenedClass);
			// self.dropIsOpened = true;
			// reinit sticky
			// $(".m-aside").hcSticky('reinit');
			// $(".m-aside").updateSticky();
		}

		function closeCurrentDrop($elements) {
			self.removeClassCustom($elements, dropIsOpenedClass);
			// self.dropIsOpened = true;
			// reinit sticky
			// $(".m-aside").hcSticky('reinit');
			// $(".m-aside").updateSticky();
		}

		function closeVisibleDrop() {
			self.removeClassCustom($item, dropIsOpenedClass);
			// self.dropIsOpened = false;
			// reinit sticky
			// $(".m-aside").hcSticky('reinit');
			// $(".m-aside").updateSticky();
		}
	};

	MultiFilters.prototype.addClassCustom = function (elements, modifiersClass) {
		var self = this;

		$.each(elements, function () {
			$(this).addClass(modifiersClass);
		});
	};

	MultiFilters.prototype.removeClassCustom = function (elements, modifiersClass) {
		var self = this;

		$.each(elements, function () {
			$(this).removeClass(modifiersClass);
		});
	};

	MultiFilters.prototype.addTag = function ($tagsContainer, attrGroup, attrName, tag) {
		var self = this;
		var attributes = self.attributes;

		$(self.tagsItemTpl).clone()
			.find(self.tagTextContainer)
			.html(tag)
			.end()
			.attr('data-' + attributes.group, attrGroup)
			.attr('data-' + attributes.name, attrName)
			.appendTo($tagsContainer);
	};

	MultiFilters.prototype.removeTag = function ($tagsContainer, attrGroup, attrName) {
		var self = this;
		var attributes = self.attributes;

		var dataGroup = "[data-" + attributes.group + "=" + attrGroup + "]";
		var dataName = "[data-" + attributes.name + "=" + attrName + "]";
		var filtersValue = dataGroup + dataName;
		var $currentTag = $tagsContainer.find(self.tagsItem).filter(filtersValue);

		// отключить соответствующий чекбокс
		var b = $currentTag.closest(self.$container)
			.find(self.$group).filter(dataGroup)
			.find(dataName)
			.find(self.$checkbox).filter(':checked')
			.prop('checked', false)
			.trigger('change');

		// удалить тэг
		$currentTag.remove();
	};

	window.MultiFilters = MultiFilters;
}(jQuery));

/**
 * !multi filters initial
 * */
function multiFiltersInit() {
	var productFilters = '.p-filters-js';
	// var catalogMenuChangeTimeout;

	if ($(productFilters).length) {
		new MultiFilters({
			container: productFilters,
			item: '.p-filters-item-js',
			group: '.p-filters-group-js',
			handler: '.p-filters-select-js',
			placeholder: '.p-filters-placeholder-js',
			selected: '.p-filters-selected-js',
			drop: '.p-filters-drop-js',
			checkbox: '.p-filters-drop-list input[type="checkbox"]',
			labelText: '.p-filters-label-text-js',
			btnReset: '.btn-reset-js',
			btnResetAll: '.btn-clear-filters-js',
			tagsContainer: '.p-filters-tags-js',
			tagsItem: '.p-filters-tags-item-js',
			tagTextContainer: '.p-filters-tag-text-js',
			tagsItemTpl: '<div class="p-filters-tags__item p-filters-tags-item-js"><i>Удалить</i><span class="p-filters-tag-text-js"></span></div>',


			dropOpenClass: 'p-filters-is-open',
			filtersOnClass: 'p-filters-on',

			dataGroup: 'filters-group',
			dataTag: 'filter-tag',
			dataName: 'filter-name',
			dataPrefix: 'value-prefix',
			dataPostfix: 'value-postfix'
		})
	}
}

/**
 * !sorting
 * */
function sortingOrder() {
	var $sortingContainer = $('.sorting-js');
	var _ascending = 'order-asc',
		_descending = 'order-desc';
	var activeClass = 'active';

	var $sortingItems = $('.sorting-thumbs-js a');
	var $sortingItemParent = $sortingItems.parent();

	$sortingItems.on('click', function (e) {
		e.preventDefault();

		var $this = $(this);
		var $thisParent = $this.parent();
		if (!$thisParent.hasClass(activeClass)) {
			$sortingItemParent.removeClass(activeClass);
			$thisParent.addClass(activeClass);

			return;
		}

		var $thisSortingContainer = $this.closest($sortingContainer);

		$thisSortingContainer.toggleClass(_ascending + ' ' + _descending)
	})
}

/**
 * !Plugin collapse and expand blocks by fire events on the title of these blocks
 * !Extended capabilities
 * */
(function ($) {
	var JsAccordion = function (settings) {
		var options = $.extend(true, {
			accordionContainer: null,
			accordionItem: null,
			accordionHeader: null, // wrap for accordion's switcher
			accordionHand: null, // accordion's switcher
			accordionContent: null,
			indexInit: 0, // if "false", all accordion are closed
			showFromHash: true, // if "false", all accordion are closed
			animateSpeed: 300,
			scrollToTop: false, // if true, scroll to current accordion;
			scrollToTopSpeed: 300,
			scrollToTopOffset: 0,
			clickOutside: false, // if true, close current accordion's content on click outside accordion;
			collapseInside: true, // collapse attachments,
			modifiers: {
				activeItem: 'is-open',
				activeHeader: 'is-open',
				activeHand: 'is-open',
				activeContent: 'is-open',
				noHoverClass: 'is-open'
			}
		}, settings || {});

		this.options = options;
		var container = $(options.accordionContainer);

		this.$accordionContainer = container;
		this.$accordionItem = $(options.accordionItem, container);
		this.$accordionHeader = $(options.accordionHeader, container);
		this.$accordionHand = $(options.accordionHand, container);
		this.$accordionContent = options.accordionContent ?
			$(options.accordionContent, container) :
			this.$accordionHeader.next();

		this.scrollToTop = options.scrollToTop;
		this._scrollToTopSpeed = options.scrollToTopSpeed;
		this._scrollToTopOffset = options.scrollToTopOffset;
		this.clickOutside = options.clickOutside;
		this._indexInit = options.indexInit;
		this._animateSpeed = options.animateSpeed;
		this._collapseInside = options.collapseInside;

		this.modifiers = options.modifiers;

		this.bindEvents();
		if (options.indexInit !== false) {
			this.activeAccordion();
		}
		this.hashAccordion();
	};

	JsAccordion.prototype.bindEvents = function () {
		var self = this,
			$accordionContent = self.$accordionContent,
			animateSpeed = self._animateSpeed,
			modifiers = self.modifiers;

		self.$accordionHand.on('click', 'a', function (e) {
			e.stopPropagation();
		});

		self.$accordionHand.on('mouseenter', 'a', function () {
			$(this).closest(self.$accordionHand).addClass(modifiers.noHoverClass);
		}).on('mouseleave', 'a', function () {
			$(this).closest(self.$accordionHand).removeClass(modifiers.noHoverClass);
		});

		self.$accordionHand.on('click', function (e) {
			e.preventDefault();

			var $currentHand = $(this),
				$currentHeader = $currentHand.closest(self.$accordionHeader),
				$currentItem = $currentHand.closest(self.$accordionItem),
				$currentItemContent = $currentHeader.next();

			if ($accordionContent.is(':animated')) return;

			if ($currentHeader.hasClass(modifiers.activeHeader)){

				$currentItem.removeClass(modifiers.activeItem);
				$currentHeader.removeClass(modifiers.activeHeader);
				$currentHand.removeClass(modifiers.activeHand);
				$currentItemContent.removeClass(modifiers.activeContent);

				$currentItemContent.slideUp(animateSpeed, function () {

					// console.log('closed');

					if (self._collapseInside) {
						var $internalContent = $currentItem.find(self.$accordionHeader).next();

						$.each($internalContent, function () {
							if ($(this).hasClass(self.modifiers.activeContent)) {

								// self.scrollPosition($currentItem);

								$(this).slideUp(self._animateSpeed, function () {
									// console.log('closed attachment');
									self.scrollPosition($currentItem);
								});
							}
						});


						$currentItem.find(self.$accordionItem).removeClass(self.modifiers.activeItem);
						$currentItem.find(self.$accordionHeader).removeClass(self.modifiers.activeHeader);
						$currentItem.find(self.$accordionHand).removeClass(self.modifiers.activeHand);
						$internalContent.removeClass(self.modifiers.activeContent);
					}
				});

				return;
			}

			var $siblings = $currentItem.siblings();

			$siblings.find(self.$accordionHeader).next().slideUp(self._animateSpeed, function () {
				// console.log('closed siblings');
			});

			$siblings.removeClass(modifiers.activeItem);
			$siblings.find(self.$accordionHeader).removeClass(modifiers.activeHeader);
			$siblings.find(self.$accordionHand).removeClass(modifiers.activeHand);
			$siblings.find(self.$accordionHeader).next().removeClass(modifiers.activeContent);

			// self.scrollPosition($currentItem);

			$currentItemContent.slideDown(animateSpeed, function () {
				// console.log('opened');
				self.scrollPosition($currentItem);
			});

			$currentItem.addClass(modifiers.activeItem);
			$currentHeader.addClass(modifiers.activeHeader);
			$currentHand.addClass(modifiers.activeHand);
			$currentItemContent.addClass(modifiers.activeContent);

			e.stopPropagation();
		});

		$(document).click(function () {
			if (self.clickOutside) {
				self.closeAllAccordions();
			}
		});

		$accordionContent.on('click', function(e){
			e.stopPropagation();
		});
	};

	// show accordion's content from hash tag
	JsAccordion.prototype.hashAccordion = function() {
		var self = this;
		var modifiers = self.modifiers,
			hashTag = window.location.hash;

		if ( !hashTag ) return false;

		var activeItemClass = modifiers.activeItem;
		var activeHeaderClass = modifiers.activeHeader;
		var activeHandClass = modifiers.activeHand;
		var activeContentClass = modifiers.activeContent;

		var $accordionHeader = self.$accordionHeader;
		var $accordionItem = self.$accordionItem;

		var $currentItem = $(hashTag);
		var $currentItemParents = $currentItem.parents().filter($accordionItem);

		// open parents accordion

		if ($currentItemParents.length) {
			var $currentHeaderParents = $currentItemParents.children($accordionHeader),
				$currentHandParents = $currentItemParents.children($accordionItem),
				$currentItemContentParents = $currentHeaderParents.next();

			$currentItemContentParents.slideDown(0);

			$currentItemParents.addClass(activeItemClass);
			$currentHeaderParents.addClass(activeHeaderClass);
			$currentHandParents.addClass(activeHandClass);
			$currentItemContentParents.addClass(activeContentClass);
		}

		// open current accordion

		var $currentHeader = $currentItem.children($accordionHeader),
			$currentHand = $currentHeader.children($accordionItem),
			$currentItemContent = $currentHeader.next();

		$currentItemContent.slideDown(0, function () {
			self.scrollPosition($currentItem);
		});

		$currentItem.addClass(activeItemClass);
		$currentHeader.addClass(activeHeaderClass);
		$currentHand.addClass(activeHandClass);
		$currentItemContent.addClass(activeContentClass);
	};

	// show current accordion's content
	JsAccordion.prototype.activeAccordion = function() {
		var self = this;
		var indexInit = self._indexInit;

		if ( indexInit === false ) return false;

		$.each(self.$accordionContainer, function () {
			var $currentItem = $(this).children().eq(indexInit);

			$currentItem.addClass(self.modifiers.activeItem);
			$currentItem.children(self.$accordionHeader).addClass(self.modifiers.activeHeader);
			$currentItem.children(self.$accordionHeader).find(self.$accordionHand).addClass(self.modifiers.activeHand);

			// self.scrollPosition($currentItem);

			$currentItem.children(self.$accordionHeader).next().addClass(self.modifiers.activeContent).slideDown(self._animateSpeed, function () {
				// console.log('opened active');

				// self.scrollPosition($currentItem);
			});
		});
	};

	// close all accordions
	JsAccordion.prototype.closeAllAccordions = function() {
		var self = this;

		self.$accordionHeader.next().slideUp(self._animateSpeed, function () {
			// console.log('closed all');
		});

		var modifiers = self.modifiers;

		self.$accordionItem.removeClass(modifiers.activeItem);
		self.$accordionHeader.removeClass(modifiers.activeHeader);
		self.$accordionHand.removeClass(modifiers.activeHand);
		self.$accordionHeader.next().removeClass(modifiers.activeContent);
	};

	// open all accordions
	JsAccordion.prototype.openAllAccordions = function() {
		var self = this;

		self.$accordionHeader.next().slideDown(self._animateSpeed, function () {
			// console.log('open all');
		});

		var modifiers = self.modifiers;

		self.$accordionItem.addClass(modifiers.activeItem);
		self.$accordionHeader.addClass(modifiers.activeHeader);
		self.$accordionHand.addClass(modifiers.activeHand);
		self.$accordionHeader.next().addClass(modifiers.activeContent);
	};

	JsAccordion.prototype.scrollPosition = function (element) {
		var self = this;
		if (self.scrollToTop && !$('html, body').is('animated')) {
			$('html, body').animate({ scrollTop: element.offset().top - self._scrollToTopOffset }, self._scrollToTopSpeed);
		}
	};

	window.JsAccordion = JsAccordion;
}(jQuery));

/**
 * Initial accordion
 * */
function initMultiAccordion() {
	// accordion default
	var $accordion = $('.js-accordion__container');

	if($accordion.length){
		new JsAccordion({
			accordionContainer: '.js-accordion__container',
			accordionItem: '.js-accordion__item',
			accordionHeader: '.js-accordion__header',
			accordionHand: '.js-accordion__hand',
			// scrollToTop: true,
			// scrollToTopSpeed: 300,
			// scrollToTopOffset: $('.header').outerHeight(),
			indexInit: false,
			clickOutside: false,
			animateSpeed: 200
		});
	}
}

/*popup initial*/
function popupInitial(){

	var btnCloseTpl = '<button title="%title%" type="button" class="mfp-close"><svg class="svg-ico-close" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 57.2 57.2"><path d="M34.3 28.6L56 6.9c1.6-1.6 1.6-4.1 0-5.7 -1.6-1.6-4.1-1.6-5.7 0L28.6 22.9 6.9 1.3c-1.6-1.6-4.1-1.6-5.7 0 -1.6 1.6-1.6 4.1 0 5.7l21.7 21.6L1.3 50.3c-1.6 1.5-1.6 4.1 0 5.6 0.8 0.8 1.8 1.2 2.8 1.2s2-0.4 2.8-1.2l21.7-21.6L50.3 56c0.8 0.8 1.8 1.2 2.8 1.2s2-0.4 2.8-1.2c1.6-1.6 1.6-4.1 0-5.7L34.3 28.6z"></path></svg></button>';

	$('.btn-order-js').magnificPopup({
		type: 'ajax',
		midClick: true, // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
		// closeOnContentClick: false,
		mainClass: 'mfp-zoom-in ',
		removalDelay: 500,
		fixedContentPos: 'auto',
		overflowY: 'auto',
		closeMarkup: btnCloseTpl,
		// tClose: 'Close (Esc)',
		callbacks: {
			open: function() {
				// Will fire when this exact popup is opened
				// this - is Magnific Popup object
			},
			close: function() {
				// Will fire when popup is closed
			},
			ajaxContentAdded: function() {
				// Ajax content is loaded and appended to DOM
				spinnerInit(this.content.find('.spinner-js'));
				priceCalculation();
			}
		}
	});

	$('.btn-popup-js').magnificPopup({
		type: 'inline',
		midClick: true, // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.,
		// closeOnContentClick: false,
		mainClass: 'mfp-zoom-in',
		removalDelay: 500,
		fixedContentPos: 'auto',
		overflowY: 'auto',
		closeMarkup: btnCloseTpl,
		callbacks: {
			open: function() {
				$('.shutter-js').trigger('extraPopupClose');
			}
		}
	});
}

/**
 * ui spinner initial
 */
function spinnerInit($spinner) {
	$spinner.spinner({
		min: 0
	});
}

/**
 * !product price calculation
 * */
function priceCalculation() {
	var $container = $('.order-calc-js');
	var $price = $('.price-js');
	var objMain = {},
		objId = {},
		objCount = {},
		objPriceSum = {};

	$(document).on('change spin', '.price-calc__number-js', function (e, ui) {

		var $currentInput = $(this);
		var $currentPrice = $currentInput.closest('.c-tr').find($price);
		var priceVal = $currentPrice.data('price');

		var currentItemCount = ui ? ui.value : +$currentInput.val();

		var priceValSum = Math.round(priceVal * currentItemCount * 100) / 100;

		$currentPrice.attr('data-price-sum', priceValSum);

		// добавляем в ассоциативный ряд значения для каждого элемента
		objId['count'] = currentItemCount;
		objId['priceSum'] = priceValSum;

		// добавляем в общий объект создаваемые ассоциативные ряды элементов
		var id = $currentInput.data('id');
		objMain[id] = objId;

		// console.log(id + ": ", objMain[id]['count']);

		// добавляем в отдельный объект параметры каждого элемента
		objCount[id] = objMain[id]['count']; // объект с количеством выбранных элеметров
		objPriceSum[id] = objMain[id]['priceSum']; // объект с общей ценой выбранных элементов

		// console.log("objCount: ", objCount);
		// console.log("objPriceSum: ", objPriceSum);

		// суммируем значения в созданных объектах
		var countSum = sum(objCount);
		var priceSum = sum(objPriceSum);

		// console.log("countSum: ", countSum);
		// console.log("priceSum: ", priceSum);

		var $currentContainer = $currentPrice.closest($container);
		$currentContainer.find('.price-calc__totals-label-js').toggleClass('show', countSum > 0);
		$currentContainer.find('.price-calc__counts-total-js').text(countSum);
		$currentContainer.find('.price-calc__price-total-js').text(priceSum);
	});

	function sum(obj) {
		var result = 0;
		var prop;

		for(prop in obj) {
			result += obj[prop];
		}

		return Math.round(result*100)/100;
	}

}

/**only number input*/
function onlyNumberInput() {
	// link: https://stackoverflow.com/questions/995183/how-to-allow-only-numeric-0-9-in-html-inputbox-using-jquery

	$("[data-only-number]").keydown(function (e) {
		// Allow: backspace, delete, tab, escape, enter and .
		if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
			// Allow: Ctrl+A, Command+A
			(e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
			// Allow: home, end, left, right, down, up
			(e.keyCode >= 35 && e.keyCode <= 40)) {
			// let it happen, don't do anything
			return;
		}
		// Ensure that it is a number and stop the keypress
		if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
			e.preventDefault();
		}
	});
}

/**
 * !Sticky element on page
 */
function stickyInit() {
	// var $mAside = $('.m-aside');
	// if ($mAside.length) {
	// 	$mAside.hcSticky({
	// 		top: $('.header').outerHeight() + 20,
	// 		wrapperClassName: 'm-aside-sticky'
	// 		// responsive: false
	//
	// 	});
	// }
	var $mAside = $('.m-aside');
	if ($mAside.length) {
		// var contactsMapSticky = $mAside.stickySidebar({
		// 	containerSelector: '.m-container',
		// 	innerWrapperSelector: '.m-aside-holder',
		// 	topSpacing: $('.header').outerHeight() + 20,
		// 	resizeSensor: false, // recalculation sticky on change size of elements
		// 	MinWidth: 640
		//
		// });

		var mAsideSticky = new StickySidebar('.m-aside', {
			containerSelector: '.m-container',
			innerWrapperSelector: '.m-aside-holder',
			topSpacing: $('.header').outerHeight() + 20,
			resizeSensor: false, // recalculation sticky on change size of elements
			MinWidth: 640

		});

		$('.view-switcher-news-js').on('changed.toggleView', function () {
			mAsideSticky.updateSticky();
		});

		$('.view-switcher-products-js').on('changed.toggleView', function () {
			mAsideSticky.updateSticky();
		});
	}
	// var $filtersTags = $('.p-filters-tags');
	// if ($filtersTags.length) {
	// 	$filtersTags.stickySidebar({
	// 		containerSelector: '.p-filters',
	// 		innerWrapperSelector: '.p-filters-tags__holder',
	// 		topSpacing: $('.header').outerHeight(),
	// 		resizeSensor: false, // recalculation sticky on change size of elements
	// 		MinWidth: 640
	//
	// 	});
	// }

	var contactsMap = '.contacts-map';
	if ($(contactsMap).length) {

		var contactsMapSticky = new StickySidebar(contactsMap, {
			containerSelector: '.contacts',
			innerWrapperSelector: '.contacts-map__holder',
			topSpacing: $('.header').outerHeight(),
			resizeSensor: true // recalculation sticky on change size of elements

		});

		var contactsMapTimeout;

		$('.tabs-js').on('afterChange.tabSwitcher', function () {
			clearTimeout(contactsMapTimeout);

			contactsMapTimeout = setTimeout(function () {
				contactsMapSticky.updateSticky();
			}, 50);
		});
	}

	var cardInfo = '.card-info-js';
	var $cardInfo = $(cardInfo);
	if ($cardInfo.length) {

		var cardInfoSticky = new StickySidebar(cardInfo, {
			containerSelector: '.p-card',
			innerWrapperSelector: '.p-card__content__holder',
			topSpacing: $('.header').outerHeight() + 40,
			resizeSensor: true // recalculation sticky on change size of elements

		});

		// var cardInfoElement = document.querySelector(cardInfo);

		// cardInfoElement.addEventListener('affix.bottom.stickySidebar', function () {
		// 	$cardInfo.addClass('is-bottom-affixed');
		// });
		//
		// cardInfoElement.addEventListener('affix.unbottom.stickySidebar', function (event) {
		// 	$cardInfo.removeClass('is-bottom-affixed');
		// });

		var shareDropTimeout;
		$('.social-share__container-js').on('afterChange.msDrop', function () {
			clearTimeout(shareDropTimeout);

			shareDropTimeout = setTimeout(function () {
				cardInfoSticky.updateSticky();
			}, 100);
		});

		var cardInfoTimeout;
		$('.p-card').on('change.zoomImages', function () {
			clearTimeout(cardInfoTimeout);

			cardInfoTimeout = setTimeout(function () {
				cardInfoSticky.updateSticky();
			}, 500);
		});
	}
}

/**
 * get height children elements in group
 */
(function () {
	var $container = $('.group-js'),
		$body = $('.group__body-js'),
		$spacer = $('.group__spacer-js');

	$(window).on('load debouncedresize', function (e) {

		// spacersHeight = $spacer.outerHeight();

		$.each($container, function(){

			var $curContainer = $(this);
			var $curSpacer = $curContainer.find($spacer);
			var containerHeight = $curContainer.outerHeight();

			var spacersHeight = 0;
			$.each($curSpacer, function () {
				var $thisSpacer = $(this);
				spacersHeight = spacersHeight + $thisSpacer.outerHeight();
			});

			$curContainer.find($body).height(containerHeight - spacersHeight);
		});

	});
})();

/**
 * !Always place the footer at the bottom of the page
 * */
(function () {
	var $footer = $('.footer__holder');

	if ($footer.length) {
		$('.main__holder').append($('<div class="spacer"></div>')); // need for sidebar's element sticky of bottom page
		$('.wrapper').append($('<div class="spacer"></div>')); // need for sidebar's element sticky of bottom page (for responsive)

		// setTimeout(function () {
		// 	layoutFooter();
		// 	$($footer).addClass('isBottoming');
		// }, 200);

		layoutFooter();
		$($footer).addClass('isBottoming');

		$(window).on('resizeByWidth', function () {
			layoutFooter();
		});

		function layoutFooter() {
			// var footerHeight = $('.footer__holder', $footer).outerHeight();
			var footerHeight = $($footer).outerHeight();
			// $footer.css({
			// 	'margin-top': -footerHeight
			// });

			$('.spacer').css({
				'height': footerHeight,
				'pointer-events': 'none', 'float': 'left',
				'width': '100%'
			});
		}
	}
})();

/**
 * !Testing form validation (for example). Do not use on release!
 * */
function formSuccessExample() {
	var $form = $('.user-form form, .subscription-form form, .msg-form form');

	if ( $form.length ) {

		$form.submit(function (event) {
			var $thisForm = $(this);

			if ($thisForm.parent().hasClass('success-form')) return;

			event.preventDefault();

			testValidateForm($thisForm);
		});

		// $(':text, input[type="email"], textarea', $form).on('keyup change', function () {
		// 	var $form = $(this).closest('form');
		// 	if ($form.parent().hasClass('error-form')) {
		// 		testValidateForm($form);
		// 	}
		// })

	}

	function testValidateForm(form) {
		var $thisFormWrap = form.parent();

		var $inputs = $(':text, input[type="email"], input[type="password"], textarea', form);

		var inputsLength = $inputs.length;
		var inputsHasValueLength = $inputs.filter(function () {
			return $(this).val().length;
		}).length;

		$thisFormWrap.toggleClass('error-form', inputsLength !== inputsHasValueLength);
		$thisFormWrap.toggleClass('success-form', inputsLength === inputsHasValueLength);

		$.each($inputs, function () {
			var $thisInput = $(this);
			var thisInputVal = $thisInput.val();
			var $thisInputWrap = $thisInput.parent();

			$thisInput.toggleClass('error', !thisInputVal.length);
			$thisInput.toggleClass('success', !!thisInputVal.length);

			$thisInputWrap.toggleClass('error', !thisInputVal.length);
			$thisInputWrap.toggleClass('success', !!thisInputVal.length);
		});
	}
}

/**
 * =========== !ready document, load/resize window ===========
 */

$(window).on('load', function () {
	// add functions
});

$(window).on('debouncedresize', function () {
	// $(document.body).trigger("sticky_kit:recalc");
});

$(document).ready(function () {
	placeholderInit();
	printShow();
	inputToggleFocusClass();
	inputHasValueClass();
	// inputFilledClass();
	customSelect($('select.cselect'));
	fileInput();
	fullPageInitial();
	slidersInit();
	objectFitImages(); // object-fit-images initial
	shuttersInit();
	tabSwitcher();
	toggleDropInit();
	menuSwitcher();
	zoomImages();
	addDataLengthChildren();
	equalHeight();
	toggleViewInit();
	multiFiltersInit();
	sortingOrder();
	initMultiAccordion();
	popupInitial();
	spinnerInit($(".spinner-js"));
	priceCalculation();
	onlyNumberInput();

	stickyInit();
	/* for testing validate forms */
	formSuccessExample();
});