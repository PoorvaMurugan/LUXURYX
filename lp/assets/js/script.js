(function($) {
	
	"use strict";
	
	
	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if($('.preloader').length){
			$('.preloader').delay(200).fadeOut(500);
		}
	}
	
	
	//Update Header Style and Scroll to Top
	function headerStyle() {
		if($('.main-header').length){
			var windowpos = $(window).scrollTop();
			var siteHeader = $('.main-header');
			var scrollLink = $('.scroll-to-top');
			
			var HeaderHight = $('.main-header').height();
			if (windowpos >= HeaderHight) {
				siteHeader.addClass('fixed-header');
				scrollLink.fadeIn(300);
			} else {
				siteHeader.removeClass('fixed-header');
				scrollLink.fadeOut(300);
			}
			
		}
	}
	
	headerStyle();
	
	
	//Submenu Dropdown Toggle
	if($('.main-header li.dropdown ul').length){
		$('.main-header li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>');
		
		//Dropdown Button
		$('.main-header li.dropdown .dropdown-btn').on('click', function() {
			$(this).prev('ul').slideToggle(500);
		});
		
		//Disable dropdown parent link
		$('.navigation li.dropdown > a').on('click', function(e) {
			e.preventDefault();
		});
		
		//Disable dropdown parent link
		$('.main-header .navigation li.dropdown > a,.hidden-bar .side-menu li.dropdown > a').on('click', function(e) {
			e.preventDefault();
		});

		$('.xs-sidebar-group .close-button').on('click', function(e) {
			$('.xs-sidebar-group.info-group').removeClass('isActive');
		});

		$('.about-widget').on('click', function(e) {
			$('.about-sidebar').addClass('active');
		});

		$('.about-sidebar .close-button').on('click', function(e) {
			$('.about-sidebar').removeClass('active');
		});
		
		$('.about-sidebar .gradient-layer').on('click', function(e) {
			$('.about-sidebar').removeClass('active');
		});
				
	}
	
	
	//Mobile Nav Hide Show
	if($('.mobile-menu').length){
		
		//$('.mobile-menu .menu-box').mCustomScrollbar();
		
		var mobileMenuContent = $('.main-header .nav-outer .main-menu').html();
		$('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
		$('.sticky-header .main-menu').append(mobileMenuContent);
		
		//Hide / Show Submenu
		$('.mobile-menu .navigation > li.dropdown > .dropdown-btn').on('click', function(e) {
			e.preventDefault();
			var target = $(this).parent('li').children('ul');
			
			if ($(target).is(':visible')){
				$(this).parent('li').removeClass('open');
				$(target).slideUp(500);
				$(this).parents('.navigation').children('li.dropdown').removeClass('open');
				$(this).parents('.navigation').children('li.dropdown > ul').slideUp(500);
				return false;
			}else{
				$(this).parents('.navigation').children('li.dropdown').removeClass('open');
				$(this).parents('.navigation').children('li.dropdown').children('ul').slideUp(500);
				$(this).parent('li').toggleClass('open');
				$(this).parent('li').children('ul').slideToggle(500);
			}
		});

		//3rd Level Nav
		$('.mobile-menu .navigation > li.dropdown > ul  > li.dropdown > .dropdown-btn').on('click', function(e) {
			e.preventDefault();
			var targetInner = $(this).parent('li').children('ul');
			
			if ($(targetInner).is(':visible')){
				$(this).parent('li').removeClass('open');
				$(targetInner).slideUp(500);
				$(this).parents('.navigation > ul').find('li.dropdown').removeClass('open');
				$(this).parents('.navigation > ul').find('li.dropdown > ul').slideUp(500);
				return false;
			}else{
				$(this).parents('.navigation > ul').find('li.dropdown').removeClass('open');
				$(this).parents('.navigation > ul').find('li.dropdown > ul').slideUp(500);
				$(this).parent('li').toggleClass('open');
				$(this).parent('li').children('ul').slideToggle(500);
			}
		});

		//Menu Toggle Btn
		$('.mobile-nav-toggler').on('click', function() {
			$('body').addClass('mobile-menu-visible');

		});

		//Menu Toggle Btn
		$('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function() {
			$('body').removeClass('mobile-menu-visible');
			$('.mobile-menu .navigation > li').removeClass('open');
			$('.mobile-menu .navigation li ul').slideUp(0);
		});

		$(document).keydown(function(e){
	        if(e.keyCode == 27) {
				$('body').removeClass('mobile-menu-visible');
			$('.mobile-menu .navigation > li').removeClass('open');
			$('.mobile-menu .navigation li ul').slideUp(0);
        	}
	    });
		
	}
	
	
	
	// Add Current Class Auto
	function dynamicCurrentMenuClass(selector) {
		let FileName = window.location.href.split("/").reverse()[0];

		selector.find("li").each(function () {
			let anchor = $(this).find("a");
			if ($(anchor).attr("href") == FileName) {
				$(this).addClass("current");
			}
		});
		// if any li has .current elmnt add class
		selector.children("li").each(function () {
			if ($(this).find(".current").length) {
				$(this).addClass("current");
			}
		});
		// if no file name return
		if ("" == FileName) {
			selector.find("li").eq(0).addClass("current");
		}
	}

	if ($('.main-header .main-menu .navigation').length) {
		dynamicCurrentMenuClass($('.main-header .main-menu .navigation'));
	}
	
	
	
	// Tabs Box
	if($('.tabs-box').length){
		$('.tabs-box .tab-buttons .tab-btn').on('click', function(e) {
			e.preventDefault();
			var target = $($(this).attr('data-tab'));
			
			if ($(target).is(':visible')){
				return false;
			}else{
				target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
				$(this).addClass('active-btn');
				target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
				target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab');
				$(target).fadeIn(300);
				$(target).addClass('active-tab');
			}
		});
	}
	
	
	
	//  Animation Fade Left End
	/////////////////////////////////////////////////////
	// CURSOR
	var cursor = $(".cursor"),
	follower = $(".cursor-follower");

	var posX = 0,
		posY = 0;

	var mouseX = 0,
		mouseY = 0;

	TweenMax.to({}, 0.016, {
	repeat: -1,
	onRepeat: function() {
		posX += (mouseX - posX) / 9;
		posY += (mouseY - posY) / 9;

		TweenMax.set(follower, {
			css: {
			left: posX - 12,
			top: posY - 12
			}
		});

		TweenMax.set(cursor, {
			css: {
			left: mouseX,
			top: mouseY
			}
		});
	}
	});

	$(document).on("mousemove", function(e) {
		mouseX = e.clientX;
		mouseY = e.clientY;
	});
	//circle
	$(".theme-btn, a").on("mouseenter", function() {
		cursor.addClass("active");
		follower.addClass("active");
	});
	$(".theme-btn, a").on("mouseleave", function() {
		cursor.removeClass("active");
		follower.removeClass("active");
	});   
	// CURSOR End


	
	// Main Slider
	var slider = new Swiper('.main-slider', {
		slidesPerView: 1,
		spaceBetween: 0,
		loop: true,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		// Navigation arrows
		navigation: {
			nextEl: '.main-slider-next',
			prevEl: '.main-slider-prev',
			clickable: true,
		},
		//Pagination
		pagination: {
			el: ".slider-one_pagination",
			clickable: true,
			//type: "progressbar",
		},
		speed: 500,
		breakpoints: {
			'1600': {
				slidesPerView: 1,
			},
			'1200': {
				slidesPerView: 1,
			},
			'992': {
				slidesPerView: 1,
			},
			'768': {
				slidesPerView: 1,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});
	
	
	
	
	/////////////////////////////////////////////////////
  // 31. Folks animation
  let endTl = gsap.timeline({
    repeat: -1,
    delay: 0.5,
    scrollTrigger: {
      trigger: '.end',
      start: 'bottom 100%-=50px'
    }
  });
  gsap.set('.end', {
    opacity: 0
  });
  gsap.to('.end', {
    opacity: 1,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.end',
      start: 'bottom 100%-=50px',
      once: true
    }
  });
  let mySplitText = new SplitText(".end", { type: "words,chars" });
  let chars = mySplitText.chars;
  //let endGradient = chroma.scale(['#F9D371', '#F47340', '#EF2F88', '#8843F2']);
  endTl.to(chars, {
    duration: 0.5,
    scaleY: 0.6,
    ease: "power3.out",
    stagger: 0.04,
    transformOrigin: 'center bottom'
  });
  endTl.to(chars, {
    yPercent: -20,
    ease: "elastic",
    stagger: 0.03,
    duration: 0.8
  }, 0.5);
  endTl.to(chars, {
    scaleY: 1,
    ease: "elastic.out(2.5, 0.2)",
    stagger: 0.03,
    duration: 1.5
  }, 0.5);
  endTl.to(chars, {
    color: (i, el, arr) => {
      //return endGradient(i / arr.length).hex();
    },
    ease: "power2.out",
    stagger: 0.03,
    duration: 0.3
  }, 0.5);
  endTl.to(chars, {
    yPercent: 0,
    ease: "back",
    stagger: 0.03,
    duration: 0.8
  }, 0.7);
  endTl.to(chars, {
    //color: '#c9f31d',
    duration: 1.4,
    stagger: 0.05
  });
  /////////////////////////////////////////////////////
	
	
	
	
	
	// Single Items Slider
	var slider = new Swiper('.single-item_slider', {
		slidesPerView: 1,
		spaceBetween: 30,
		loop: true,
		autoHeight: true,
		//centeredSlides: true,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		// Navigation arrows
		navigation: {
			nextEl: '.single-item_slider-next',
			prevEl: '.single-item_slider-prev',
			clickable: true,
		},
		//Pagination
		pagination: {
			el: ".single-item_slider-pagination",
			clickable: true,
		},
		speed: 500,
		breakpoints: {
			'1600': {
				slidesPerView: 1,
			},
			'1200': {
				slidesPerView: 1,
			},
			'1100': {
				slidesPerView: 1,
			},
			'992': {
				slidesPerView: 1,
			},
			'768': {
				slidesPerView: 1,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});
	
	
	
	// Clients Slider
	var slider = new Swiper('.clients_slider', {
		slidesPerView: 5,
		spaceBetween: 0,
		loop: true,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		// Navigation arrows
		navigation: {
			nextEl: '.clients_slider-button-next',
			prevEl: '.clients_slider-button-prev',
			clickable: true,
		},
		//Pagination
		pagination: {
			el: ".clients_slider-pagination",
			clickable: true,
		},
		speed: 500,
		breakpoints: {
			'1600': {
				slidesPerView: 5,
			},
			'1200': {
				slidesPerView: 5,
			},
			'992': {
				slidesPerView: 4,
			},
			'768': {
				slidesPerView: 3,
			},
			'576': {
				slidesPerView: 2,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});
	
	
	
	
	
	// Two Items Slider
	var slider = new Swiper('.two-items_slider', {
  slidesPerView: 2,
  spaceBetween: 30,
  loop: true,
  autoHeight: true,
  autoplay: {
    enabled: true,
    delay: 2500,   // FAST
  },
  navigation: {
    nextEl: '.two-items_slider-next',
    prevEl: '.two-items_slider-prev',
    clickable: true,
  },
  pagination: {
    el: ".two-items_slider-pagination",
    clickable: true,
  },
  speed: 600,       // Animation speed
  breakpoints: {
    '1600': { slidesPerView: 2 },
    '1200': { slidesPerView: 2 },
    '1100': { slidesPerView: 2 },
    '992': { slidesPerView: 2 },
    '768': { slidesPerView: 1 },
    '576': { slidesPerView: 1 },
    '0': { slidesPerView: 1 },
  },
});

	
	
	
	
	//Progress Bar
	if($('.progress-line').length){
		$('.progress-line').appear(function(){
			var el = $(this);
			var percent = el.data('width');
			$(el).css('width',percent+'%');
		},{accY: 0});
	}



	//Fact Counter + Text Count
	if($('.count-box').length){
		$('.count-box').appear(function(){
	
			var $t = $(this),
				n = $t.find(".count-text").attr("data-stop"),
				r = parseInt($t.find(".count-text").attr("data-speed"), 10);
				
			if (!$t.hasClass("counted")) {
				$t.addClass("counted");
				$({
					countNum: $t.find(".count-text").text()
				}).animate({
					countNum: n
				}, {
					duration: r,
					easing: "linear",
					step: function() {
						$t.find(".count-text").text(Math.floor(this.countNum));
					},
					complete: function() {
						$t.find(".count-text").text(this.countNum);
					}
				});
			}
			
		},{accY: 0});
	}
	
	
	
	
	
	//Jquery Knob animation 
	if($('.dial').length){
		$('.dial').appear(function(){
		   var elm = $(this);
		   var color = elm.attr('data-fgColor');  
		   var perc = elm.attr('value'); 
		   var thickness = elm.attr('thickness');  
  
		   elm.knob({ 
				'value': 0, 
				 'min':0,
				 'max':100,
				 'skin':'tron',
				 'readOnly':true,
				 'thickness':thickness,
				 'dynamicDraw': true,
				 'displayInput':false
		   });
 
		   $({value: 0}).animate({ value: perc }, {
			   duration: 3500,
			   easing: 'swing',
			   progress: function () { elm.val(Math.ceil(this.value)).trigger('change');
			   }
		   });
 
		   },{accY: 0});
	 }
	
	
	
	
	// Three Items Slider
	var slider = new Swiper('.three-items_slider', {
		slidesPerView: 3,
		spaceBetween: 30,
		loop: true,
		autoHeight: true,
		//centeredSlides: true,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		// Navigation arrows
		navigation: {
			nextEl: '.three-items_slider-next',
			prevEl: '.three-items_slider-prev',
			clickable: true,
		},
		//Pagination
		pagination: {
			el: ".three-items_slider-pagination",
			clickable: true,
		},
		speed: 500,
		breakpoints: {
			'1600': {
				slidesPerView: 3,
			},
			'1200': {
				slidesPerView: 3,
			},
			'1100': {
				slidesPerView: 3,
			},
			'992': {
				slidesPerView: 2,
			},
			'850': {
				slidesPerView: 1,
			},
			'768': {
				slidesPerView: 1,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});
	
	
	
	
	// Four Items Slider
	var slider = new Swiper('.four-items_slider', {
		slidesPerView: 1,
		spaceBetween: 30,
		loop: true,
		autoHeight: true,
		//centeredSlides: true,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		// Navigation arrows
		navigation: {
			nextEl: '.four-items_slider-next',
			prevEl: '.four-items_slider-prev',
			clickable: true,
		},
		//Pagination
		pagination: {
			el: ".four-items_slider-pagination",
			clickable: true,
		},
		speed: 500,
	});
	
	
	
	
	//Accordion Box
	if($('.accordion-box').length){
		$(".accordion-box").on('click', '.acc-btn', function() {
			
			var outerBox = $(this).parents('.accordion-box');
			var target = $(this).parents('.accordion');
			
			if($(this).hasClass('active')!==true){
				$(outerBox).find('.accordion .acc-btn').removeClass('active');
			}
			
			if ($(this).next('.acc-content').is(':visible')){
				return false;
			}else{
				$(this).addClass('active');
				$(outerBox).children('.accordion').removeClass('active-block');
				$(outerBox).find('.accordion').children('.acc-content').slideUp(300);
				target.addClass('active-block');
				$(this).next('.acc-content').slideDown(300);	
			}
		});	
	}
	
	
	
	
	// Odometer
	if ($(".odometer").length) {
		$('.odometer').appear();
		$('.odometer').appear(function(){
			var odo = $(".odometer");
			odo.each(function() {
				var countNumber = $(this).attr("data-count");
				$(this).html(countNumber);
			});
			window.odometerOptions = {
				format: 'd',
			};
		});
	}
	
	

	///////////////////////////////////////////////////// 
    // Title Animation
    let splitTitleLines = gsap.utils.toArray(".title-anim");

    splitTitleLines.forEach(splitTextLine => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: splitTextLine,
          start: 'top 90%',
          end: 'bottom 60%',
          scrub: false,
          markers: false,
          toggleActions: 'play none none none'
        }
      });

      const itemSplitted = new SplitText(splitTextLine, { type: "words, lines" });
      gsap.set(splitTextLine, { perspective: 400 });
      itemSplitted.split({ type: "lines" })
      tl.from(itemSplitted.lines, { duration: 1, delay: 0.3, opacity: 0, rotationX: -80, force3D: true, transformOrigin: "top center -50", stagger: 0.1 });
    });
    /////////////////////////////////////////////////////



	//Header Search
	if($('.search-box-outer').length) {
		$('.search-box-outer').on('click', function() {
			$('body').addClass('search-active');
		});
		$('.close-search').on('click', function() {
			$('body').removeClass('search-active');
		});
	}



	// LightBox Image
	if($('.lightbox-image').length) {
		$('.lightbox-image').magnificPopup({
		  type: 'image',
		  gallery:{
		    enabled:true
		  }
		});
	}
	


	// LightBox Video
	if($('.lightbox-video').length) {
		$('.lightbox-video').magnificPopup({
	      // disableOn: 700,
	      type: 'iframe',
	      mainClass: 'mfp-fade',
	      removalDelay: 160,
	      preloader: false,
	      iframe:{
	        patterns:{
	          youtube:{
	          index: 'youtube.com',
	          id: 'v=',
	          src: 'https://www.youtube.com/embed/%id%'
	        },
	      },
	      srcAction:'iframe_src',
	    },
	      fixedContentPos: false
	    });
	}



	//Contact Form Validation
	if($('#contact-form').length){
		$('#contact-form').validate({
			rules: {
				username: {
					required: true
				},
				email: {
					required: true,
					email: true
				},
				phone: {
					required: true
				},
				message: {
					required: true
				}
			}
		});
	}
	
	
	//Custom Seclect Box
	if($('.custom-select-box').length){
		$('.custom-select-box').selectmenu().selectmenu('menuWidget').addClass('overflow');
	}
	
	
	
	//Scroll To Target
	$('.scroll-to-target').click(function(){
        $('html, body').animate({scrollTop : 0},0);
        return false;
    });
	
	
	
	// Elements Animation
	if($('.wow').length){
		var wow = new WOW(
		  {
			boxClass:     'wow',      // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset:       0,          // distance to the element when triggering the animation (default is 0)
			mobile:       true,       // trigger animations on mobile devices (default is true)
			live:         true       // act on asynchronously loaded content (default is true)
		  }
		);
		wow.init();
	}
	


/* ==========================================================================
   When document is Scrollig, do
   ========================================================================== */
	
	$(window).on('scroll', function() {
		headerStyle();
	});
	
/* ==========================================================================
   When document is loading, do
   ========================================================================== */
	
	$(window).on('load', function() {
		handlePreloader();
	});	

})(window.jQuery);


document.addEventListener("DOMContentLoaded", function () {

  const lockTrigger = document.getElementById("lockTrigger");
  const modal = document.getElementById("mpModal");
  const closeModal = document.getElementById("closeModal");
  const submitBtn = document.getElementById("submitDetails");
  const masterPlan = document.getElementById("masterPlan");

  // Safety check (VERY IMPORTANT)
  if (!lockTrigger || !modal || !submitBtn || !masterPlan) {
    console.warn("Master Plan elements not found");
    return;
  }

  // Open modal
  lockTrigger.addEventListener("click", function () {
    modal.style.display = "flex";
  });

  // Close modal
  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Submit & unlock
  submitBtn.addEventListener("click", function () {
    const name = document.getElementById("mpName").value.trim();
    const phone = document.getElementById("mpPhone").value.trim();

    if (!name || !phone) {
      alert("Please enter Name and Phone Number");
      return;
    }

    modal.style.display = "none";

    // Unlock animation
    masterPlan.classList.add("unlocking");

    setTimeout(function () {
      masterPlan.classList.remove("locked", "unlocking");
      masterPlan.classList.add("unlocked");
    }, 600);
  });

});

const cursor = document.getElementById("customCursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px";
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    const targetEl = document.querySelector(targetId);

    if (targetEl) {
      e.preventDefault();

      // GSAP ScrollSmoother safe scroll
      if (window.ScrollSmoother && ScrollSmoother.get()) {
        ScrollSmoother.get().scrollTo(targetEl, true);
      } else {
        targetEl.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const checkbox = document.getElementById("privacyCheck");
  const button = document.getElementById("sendEnquiryBtn");

  if (checkbox && button) {
    checkbox.addEventListener("change", function () {
      button.disabled = !this.checked;
      button.classList.toggle("enabled", this.checked);
    });
  }
});



/* ==============================
   FLOOR PLAN GALLERY MODAL
================================ */
/* ==============================
   FLOOR PLAN GALLERY MODAL
================================ */

let floorSwiper = null;

function openGallery(images) {
  const modal = document.getElementById("floorModal");
  const gallery = document.getElementById("floorGallery");

  if (!modal || !gallery) return;

  gallery.innerHTML = "";

  images.forEach(src => {
    gallery.innerHTML += `
      <div class="swiper-slide">
        <img src="${src}" alt="Floor Plan">
      </div>`;
  });

  modal.style.display = "flex";

  // Destroy previous slider if exists
  if (floorSwiper) floorSwiper.destroy();

  floorSwiper = new Swiper('.floorSwiper', {
    loop: false,
    centeredSlides: true,
    speed: 600,
    effect: "slide",
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });
}

function closeGallery() {
  document.getElementById("floorModal").style.display = "none";
}

/* X button close */
document.getElementById("floorCloseBtn")?.addEventListener("click", () => {
  closeGallery();
});

/* Close only when clicking background */
document.getElementById("floorModal").addEventListener("click", function (e) {
  if (e.target.id === "floorModal") {
    closeGallery();
  }
});

/* ESC key close support */
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeGallery();
  }
});

/* ESC key close support */
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeGallery();
  }
});



// Call Modal
const callModal = document.getElementById("callModal");
const openCallModal = document.getElementById("openCallModal");
const closeCallModal = document.getElementById("closeCallModal");

openCallModal.addEventListener("click", () => {
  callModal.style.display = "flex";
});

closeCallModal.addEventListener("click", () => {
  callModal.style.display = "none";
});

// Submit Call Form
document.getElementById("bookCallBtn").addEventListener("click", () => {
  const name = document.getElementById("callName").value;
  const phone = document.getElementById("callPhone").value;

  if (!name || !phone) {
    alert("Please fill required fields");
    return;
  }

  alert("Thank you! Our team will call you shortly.");
  callModal.style.display = "none";
});

// Brochure Modal Logic
const brochureModal = document.getElementById("brochureModal");
const openBrochureModal = document.getElementById("openBrochureModal");
const closeBrochureModal = document.getElementById("closeBrochureModal");
const downloadBtn = document.getElementById("downloadBrochureBtn");

openBrochureModal.addEventListener("click", () => {
  brochureModal.style.display = "flex";
});

closeBrochureModal.addEventListener("click", () => {
  brochureModal.style.display = "none";
});

downloadBtn.addEventListener("click", () => {
  const name = document.getElementById("brochureName").value;
  const phone = document.getElementById("brochurePhone").value;
  const email = document.getElementById("brochureEmail").value;

  if (!name || !phone || !email) {
    alert("Please fill all required fields");
    return;
  }

  // 🔽 Trigger brochure download
  const link = document.createElement("a");
  link.href = "assets/brochure/LuxuryXBrochure.pdf"; // 👈 your brochure path
  link.download = "LuxuryXBrochure.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  brochureModal.style.display = "none";
});




    // Open/Close Plot Booking Modal
    document.getElementById('openPlotBooking').addEventListener('click', () => {
        document.getElementById('plotBookingModal').style.display = 'flex';
    });
    document.getElementById('closePlotBooking').addEventListener('click', () => {
        document.getElementById('plotBookingModal').style.display = 'none';
    });
    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('plotBookingModal')) {
            document.getElementById('plotBookingModal').style.display = 'none';
        }
    });

    // Plot Booking Logic
    const plotDetailsModal = document.getElementById('plotDetailsModal');
    const plotDetailsClose = plotDetailsModal.querySelector('.close');
    let currentPlot = '';

    plotDetailsClose.onclick = () => plotDetailsModal.style.display = 'none';
    window.onclick = (e) => { if (e.target === plotDetailsModal) plotDetailsModal.style.display = 'none'; };

    const plotData = {};
    const allPlots = ['1,2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','68','66,67','65','64','63','62','61','60','59','58','57','56','55','54','53','52','51','50','49','48','47','46','45','44','43','42','41','40','39','38','37','36','35','69','70','71','72','73','74','75','76','77','78','79','80','PP1','PP2'];
    const statuses = ['Available', 'Booked', 'Advance'];
    const facings = ['North', 'South', 'East', 'West'];

    allPlots.forEach(p => {
        const status = statuses[Math.floor(Math.random() * 3)];
        plotData[p] = {
            plotNo: p,
            bhk: (Math.floor(Math.random() * 3) + 2) + 'BHK',
            area: Math.floor(Math.random() * 2000) + 1000,
            pricePer: Math.floor(Math.random() * 5000) + 3000,
            additional: Math.floor(Math.random() * 500000) + 100000,
            facing: facings[Math.floor(Math.random() * 4)],
            status: status
        };
    });

    document.querySelectorAll('.spot[data-plot]').forEach(spot => {
        const num = spot.getAttribute('data-plot');
        const data = plotData[num];
        if (data) spot.classList.add(data.status.toLowerCase());
    });

    document.querySelectorAll('.spot[data-plot]').forEach(spot => {
        spot.addEventListener('click', function() {
            const num = this.getAttribute('data-plot');
            const data = plotData[num];
            currentPlot = num;
            document.getElementById('plot-details').innerHTML = `
                <strong>Plot No:</strong> ${data.plotNo}<br>
                <strong>BHK:</strong> ${data.bhk}<br>
                <strong>Build Up Area:</strong> ${data.area} sq ft<br>
                <strong>Price per sq ft:</strong> ₹${data.pricePer}<br>
                <strong>Additional Charges:</strong> ₹${data.additional}<br>
                <strong>Facing:</strong> ${data.facing}<br>
                <strong>Booking Status:</strong> <span style="color:${data.status==='Available'?'green':data.status==='Advance'?'orange':'red'}">${data.status}</span>
            `;
            plotDetailsModal.style.display = 'flex';
        });
    });

    document.getElementById('book-consult').onclick = () => {
        alert('Consultation booked for plot ' + currentPlot);
        plotDetailsModal.style.display = 'none';
    };

    document.getElementById('advance-book').onclick = () => {
        const data = plotData[currentPlot];
        if (data.status === 'Available') {
            data.status = 'Advance';
            const spot = document.querySelector(`.spot[data-plot="${currentPlot}"]`);
            spot.classList.remove('available');
            spot.classList.add('advance');
            alert('Advance booking done for plot ' + currentPlot);
        } else {
            alert('This plot is not available for advance booking.');
        }
        plotDetailsModal.style.display = 'none';
    };



  const openPlotBtn = document.getElementById("openPlotBooking");
  const customerFormModal = document.getElementById("customerFormModal");
  const plotBookingModal = document.getElementById("plotBookingModal");

  const closeCustomerForm = document.getElementById("closeCustomerForm");
  const closePlotBooking = document.getElementById("closePlotBooking");

  const customerForm = document.getElementById("customerDetailsForm");

  /* Step 1: Open customer form */
  openPlotBtn.addEventListener("click", () => {
    customerFormModal.style.display = "flex";
  });

  /* Close customer form */
  closeCustomerForm.addEventListener("click", () => {
    customerFormModal.style.display = "none";
  });

  /* Step 2: Submit form → open plot booking */
  customerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(customerForm);
    const customerData = Object.fromEntries(formData.entries());

    console.log("Customer Details:", customerData); 
    // 🔹 Later send this to backend / API

    customerFormModal.style.display = "none";
    plotBookingModal.style.display = "flex";
  });

  /* Close plot booking */
  closePlotBooking.addEventListener("click", () => {
    plotBookingModal.style.display = "none";
  });

