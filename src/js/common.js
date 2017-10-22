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
			responsiveWidth: 1000,
			responsiveHeight: 600,
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
				slidesPerGroup: 3,
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
		btnMenuClose: null, // element which closes a menu
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
		self.$btnMenuClose = $(options.btnMenuClose);
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
		self.eventsBtnMenuClose();
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
	ExtraPopup.prototype.eventsBtnMenuClose = function () {

		var self = this;

		self.$btnMenuClose.on('click', function (e) {
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
			$buttonClose = self.$btnMenuClose,
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
			$buttonClose = self.$btnMenuClose,
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
 * !extra popup initial
 * */
function popupsInit(){

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
	var navPopupClass = '.nav-popup-js';
	var $navPopup = $(navPopupClass);

	if($navPopup.length){

		new ExtraPopup({
			navContainer: navPopupClass,
			navMenu: '.nav__list',
			btnMenu: '.btn-nav-js',
			btnMenuClose: '.btn-shutter-close-js',
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
	var searchPopupClass = '.search-popup-js';
	var $searchPopup = $(searchPopupClass);

	if($searchPopup.length){

		new ExtraPopup({
			navContainer: searchPopupClass,
			// navMenu: '.nav__list',
			btnMenu: '.btn-search-popup-js',
			btnMenuClose: '.btn-shutter-close-js',
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

	/*login*/
	var loginPopupClass = '.login-popup-js';
	var $loginPopup = $(loginPopupClass);

	if($loginPopup.length){

		new ExtraPopup({
			navContainer: loginPopupClass,
			// navMenu: '.nav__list',
			btnMenu: '.btn-login-popup-js',
			btnMenuClose: '.btn-shutter-close-js',
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

	$searchPopup.on('extraPopupBeforeOpen', function () {
		$navPopup.trigger('extraPopupClose');
		$loginPopup.trigger('extraPopupClose');
	});

	$navPopup.on('extraPopupBeforeOpen', function () {
		$searchPopup.trigger('extraPopupClose');
		$loginPopup.trigger('extraPopupClose');
	});

	$loginPopup.on('extraPopupBeforeOpen', function () {
		$navPopup.trigger('extraPopupClose');
		$searchPopup.trigger('extraPopupClose');
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
 * !Toggle drop
 * */
function toggleDrop() {

	var $choiceContainer = $('.js-choice-wrap');
	var openClass = 'choice-opened';

	if ($choiceContainer.length) {

		$.each($choiceContainer, function () {
			var $thisContainer = $(this);

			if ($thisContainer.attr('data-parent-position') !== undefined) {
				$thisContainer.parent().css({
					'position': 'relative',
					'padding-right': Math.round($thisContainer.outerWidth() + 10),
					'overflow': 'visible'
				});
			}
		});

		$('.js-choice-open').on('click', function (e) {
			e.preventDefault();
			var $currentContainer = $(this).closest('.js-choice-wrap');

			e.stopPropagation();

			if ($currentContainer.hasClass(openClass)) {
				$currentContainer.removeClass(openClass);
				return;
			}

			$choiceContainer.removeClass(openClass);
			$currentContainer.addClass(openClass);
		});

		$(document).on('click', function () {
			closeDrop();
		});

		$(document).keyup(function(e) {
			if ($choiceContainer.hasClass(openClass) && e.keyCode === 27) {
				closeDrop();
			}
		});

		$choiceContainer.on('closeChoiceDrop', function () {
			closeDrop();
		});

		function closeDrop() {
			$choiceContainer.removeClass(openClass);
		}

		$('.js-choice-drop').on('click', 'a', function (e) {
			var $this = $(this);

			// if data-window-location is true, prevent default
			if ($this.closest($choiceContainer).attr('data-window-location') === 'true') {
				e.preventDefault();
			}

			// if data-select is false, do not replace text
			if ($this.closest($choiceContainer).attr('data-select') === 'false') {
				return false;
			}

			$('a', '.js-choice-drop').removeClass('active');

			$this
				.addClass('active')
				.closest('.js-choice-wrap')
				.find('.js-choice-open span')
				.text($this.find('span').text());
		});
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
	var $example = $('.example-class');

	if($example.length) {
		$example.children().matchHeight({
			byRow: true, property: 'height', target: null, remove: false
		});
	}
}

/**
 * !toggle view shops
 * */
function toggleView() {
	var $switcherHand = $('.view-switcher-js a');

	if ( $switcherHand.length ) {

		var $container = $('.view-container-js');
		var activeHand = 'active';
		var activeContainer = 'grid-view-activated';

		$switcherHand.on('click', function (e) {
			e.preventDefault();

			var $this = $(this);

			if ( $this.hasClass(activeHand) ) return false;

			$switcherHand.removeClass(activeHand);
			$container.removeClass(activeContainer);

			$this.addClass(activeHand);

			if ($this.index() === 1) {
				$container.addClass(activeContainer);
			}

			// setTimeout(function () {
			// 	$('.news__item').matchHeight._update();
			// }, 10)
		});
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

	MultiFilters.prototype.dropIsOpened = false;

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
			console.info('Checkbox is change...');
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
				closeVisibleDrop();
				return;
			}

			closeVisibleDrop();
			openCurrentDrop($currentItem);
		});

		$(document).on('click', function () {
			closeVisibleDrop();
		});

		$(document).keyup(function(e) {
			// console.log('Is drop opened? - ', self.dropIsOpened);
			if (self.dropIsOpened && e.keyCode === 27) {
				closeVisibleDrop();
				// console.log('Drop closed!');
			}
		});

		$container.on('closeDrop', function () {
			closeVisibleDrop();
		});

		$($drop).on('click', function (e) {
			e.stopPropagation();
		});

		function openCurrentDrop($elements) {
			self.addClassCustom($elements, dropIsOpenedClass);
			self.dropIsOpened = true;
		}

		function closeVisibleDrop() {
			self.removeClassCustom($item, dropIsOpenedClass);
			self.dropIsOpened = false;
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

	var $sortingItems = $('.sorting-thumbs-js li');

	$sortingItems.on('click', function (e) {
		e.preventDefault();

		var $this = $(this);
		if (!$this.hasClass(activeClass)) {
			$sortingItems.removeClass(activeClass);
			$this.addClass(activeClass);

			return;
		}

		var $thisSortingContainer = $this.closest($sortingContainer);

		$thisSortingContainer.toggleClass(_ascending + ' ' + _descending)
	})
}

/**
 * !Always place the footer at the bottom of the page
 * */
function footerBottom() {
	var $footer = $('.footer__holder');

	if ($footer.length) {
		$('.main__holder').append($('<div class="spacer"></div>')); // need for sidebar's element sticky of bottom page
		$('.wrapper').append($('<div class="spacer"></div>')); // need for sidebar's element sticky of bottom page (for responsive)

		setTimeout(function () {
			layoutFooter();
		}, 200);

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
}

/**
 * !Testing form validation (for example). Do not use on release!
 * */
function formSuccessExample() {
	var $form = $('.user-form form, .subscription-form form');

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
	popupsInit();
	tabSwitcher();
	toggleDrop();
	addDataLengthChildren();
	equalHeight();
	toggleView();
	multiFiltersInit();
	sortingOrder();
	
	footerBottom();
	formSuccessExample();
});