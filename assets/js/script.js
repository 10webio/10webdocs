jQuery(window).resize(function(){
	if(matchMedia('only screen and (min-width : 768px)').matches){
		jQuery("#bd-docs-nav").show();
	} else{
		jQuery("#bd-docs-nav").removeClass("sticky_aside");
	}
});

var click = false;

var TimerDateDiff = {
	inSeconds: function(d1, d2) {
		var t2 = d2.getTime();
		var t1 = d1.getTime();
		return parseInt((t1 - t2)/60*1000);
	},
}

var currentDate = new Date();
var date = new Date('Mar 25 2017 14:47:00 GMT+0400 (Caucasus Standard Time)');
var megaSaleOpened = false;
var baseDomainMegaSale = '10web.io';
jQuery( document ).ready(function() {
  jQuery(".parent-icon").each(function(){
	if(jQuery(this).closest(".has_child").find(".nav.bd-sidenav:visible").length){
		  jQuery(this).addClass("active");
	  } else{
		  jQuery(this).removeClass("active");
	  }
  });
  jQuery(".parent-icon").click(function(e){
	  e.stopPropagation();
	  e.preventDefault();
	  if(jQuery(this).closest(".has_child").find(".nav.bd-sidenav:visible").length){
		  jQuery(this).removeClass("active");
		  jQuery(this).closest(".has_child").find(".nav.bd-sidenav").slideUp(300);
	  } else{
		  jQuery(this).addClass("active");
		  jQuery(this).closest(".has_child").find(".nav.bd-sidenav").slideDown(300);
	  }
  });
  
  jQuery(".mobile-nav").click(function(){
	  jQuery("#bd-docs-nav").slideToggle();
  });
  
  jQuery(".bd-toc li.toc-entry").click(function(e){
	    click = true;
	    e.stopPropagation();
		jQuery(".bd-toc li.toc-entry").removeClass("active");
		jQuery(this).addClass("active");
		setInterval(function(){ click = false; }, 50);
	});
	
	jQuery(".bd-toc").css("max-height",jQuery(".bd-toc .section-nav").outerHeight(true));
	
	/*Search in plugins page*/
	if(jQuery('#plugins_search_input').length!=0) {		

		jQuery.extend(jQuery.expr[':'], {
		  'containsi': function(elem, i, match, array)
		  {
		    return (elem.textContent || elem.innerText || '').toLowerCase()
		    .indexOf((match[3] || "").toLowerCase()) >= 0;
		  }
		});

		var $grid = jQuery('.plugins-container').isotope({
			layoutMode: 'fitRows',
			itemSelector: '.plugins-container > .plugin',
			fitRows: {
				percentPosition: true,
				columnWidth: '.plugins-container > .plugin',
				gutter: 0
			}
		});
		jQuery(document).on('keyup','#plugins_search_input',function () { 
			searched_word = jQuery(this).val();
			if(searched_word != ""){
				jQuery("#plugins_reset").css("display","inline-block");
			} else {
				jQuery("#plugins_reset").css("display","none");
			}
			if(searched_word != '') {
				jQuery('.plugin').each(function() {
					if (jQuery(this).find("h5:containsi(" + searched_word + ")").length > 0) {
						jQuery(this).removeClass(' hidden');
					}
					else
						jQuery(this).addClass(' hidden');
				});
				jQuery(".plugins-container").each(function(){
					if(!jQuery(this).find(".plugin:visible").length){
						jQuery(this).prev().hide();
					} else {
						jQuery(this).prev().show();
					}
				});
				jQuery(this).addClass('active');
			}
			else {
				jQuery('.plugins-container .plugin').removeClass(' hidden');
				jQuery('.plugins-container .no_result').hide();
				jQuery(this).removeClass('active');
			}		
			$grid.isotope();			
		});
		 

		jQuery(document).on('click','#plugins_reset',function () {
			jQuery('.plugins-container .plugin').removeClass(' hidden');
			jQuery('.plugins-container .no_result').hide();
			jQuery(this).css("display","none");
			jQuery('#plugins_search_input').val('');
			$grid.isotope();
		});

	}
	
	/*Mega Sale*/
	if(location.href != "https://docs.10web.io/"){
		if( typeof jQuery.cookie( "var_opened" ) === 'undefined' ) {
			jQuery.cookie( "var_opened", "1", { expires: 1, path: '/', domain: baseDomainMegaSale } );
		}
		if( typeof jQuery.cookie( "currentDate" ) === 'undefined' ) {
			jQuery.cookie( "currentDate", new Date(), { expires: 1, path: '/', domain: baseDomainMegaSale } );
		}

		if( typeof jQuery.cookie( "rand_num" ) === 'undefined' ) { 
		/* from 5 to 8 */
			jQuery.cookie( "rand_num", Math.floor( Math.random() * ((8 - 5) + 1) + 21 ), { expires: 1, path: '/', domain: baseDomainMegaSale } ); 
		} 

		if( TimerDateDiff.inSeconds( currentDate, new Date(jQuery.cookie( "currentDate" )) ) > -40000){
			date.setTime( new Date(jQuery.cookie("currentDate")).getTime() + jQuery.cookie("rand_num") * 3600000 );
			jQuery.cookie("var_first_time", "1", { expires: 1, path: '/', domain: baseDomainMegaSale });
		}

		if( TimerDateDiff.inSeconds( currentDate, new Date(jQuery.cookie( "currentDate" )) ) > 1440844100 && jQuery.cookie("var_first_time") == "1" ){		
			jQuery.removeCookie( "currentDate" );
			jQuery.removeCookie( "rand_num" );
			jQuery.cookie( "currentDate", new Date(), { expires: 1, path: '/', domain: baseDomainMegaSale } );
			jQuery.cookie( "rand_num", Math.floor( Math.random() * ((8-5)+1) + 21 ), { expires: 1, path: '/', domain: baseDomainMegaSale } ); 
			date.setTime( new Date(jQuery.cookie("currentDate")).getTime() + jQuery.cookie("rand_num") * 3600000 );
		}

		if( typeof jQuery.cookie( "dateInDomains" ) === 'undefined' ) {
			jQuery.cookie( "dateInDomains", new Date( date ), { expires: 1, path: '/', domain: baseDomainMegaSale } );
			date = jQuery.cookie( "dateInDomains" );		
		}	

		jQuery('#wd-counter-sale, #wd-counter-sale-small').timeTo({
			timeTo: new Date(date),
			displayDays: false
		});


		if ( (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) || navigator.appVersion.indexOf("Mac")!=-1) {
			jQuery("body").addClass("ios_device");
		}
		
		if(jQuery.cookie("var_opened") == "1"){
			jQuery( ".mega_deal.small" ).removeClass("show_bigsale");
			jQuery( ".mega_deal.big" ).addClass("show_bigsale");
		}
		else{
			jQuery( ".mega_deal.big" ).removeClass("show_bigsale");
			jQuery( ".mega_deal.small" ).addClass("show_bigsale");
		} 

		if( new Date() < new Date(date) && !megaSaleOpened){
			setTimeout(function(){
				if(jQuery(window).width() > 768){
					jQuery( ".show_bigsale" ).animate({
						bottom: '0px'
					}, 1000);
					megaSaleOpened = true;
				}
			}, 3000);
		}


		jQuery( ".general_mega_salex" ).click(function() {
			jQuery.cookie("var_opened", "0", { expires: 1, path: '/', domain: baseDomainMegaSale });
			jQuery( ".mega_deal.big" ).animate({
				bottom: '-501px'
			}, 250, function() {
				jQuery( ".mega_deal.small" ).animate({
					bottom: '0px'
				}, 250)
			});
			jQuery( ".mega_deal.big" ).removeClass("show_bigsale");
			jQuery( ".mega_deal.small" ).addClass("show_bigsale");
		});

		jQuery( ".mega_deal.small" ).click(function() {
			jQuery.cookie("var_opened", "1", { expires: 1, path: '/', domain: baseDomainMegaSale });
			jQuery( ".mega_deal.small" ).animate({
				bottom: '-96px'
			}, 250, function() {
					jQuery( ".mega_deal.big" ).animate({
					bottom: '0px'
				}, 250)
			});
			jQuery( ".mega_deal.small" ).removeClass("show_bigsale");
			jQuery( ".mega_deal.big" ).addClass("show_bigsale");
		});   
	}
});
jQuery(window).scroll(function () {
	var sTop = jQuery(window).scrollTop();
	if (jQuery("#bd-docs-nav").length && matchMedia('screen  and ( min-width: 769px )').matches) {
		$nav = jQuery("#bd-docs-nav");
		if ((sTop + 20) > (jQuery(".row.flex-xl-nowrap").offset().top + jQuery(".row.flex-xl-nowrap").height()) - jQuery("#bd-docs-nav").height() ) {
			$nav.removeClass('sticky_aside').removeClass('static_aside').addClass('sticky_bottom_aside');
		} else if ((sTop + 20) > jQuery(".tenweb-sidebar").offset().top) {
			$nav.removeClass('static_aside').removeClass('sticky_bottom_aside').addClass('sticky_aside');
		}
		else {
			$nav.removeClass('sticky_aside').removeClass('sticky_bottom_aside').addClass('static_aside');
		}
	}
	
	if (jQuery(".bd-toc li.toc-entry").length) {		
		highlightActive(sTop,jQuery(".tenweb-content h4,.tenweb-content h3,.tenweb-content h2"));
	}
	if(location.href != "https://docs.10web.io/"){
		if (jQuery(window).scrollTop() > 400 && !megaSaleOpened) {
			if(jQuery(window).width() > 768){
				jQuery( ".show_bigsale" ).animate({
					bottom: '0px'
				}, 1000);
				megaSaleOpened = true;
			}
		}
	}
});


function highlightActive(sTop,titles){
	if(titles.length){
		jQuery(titles).each(function (index, el) {
			if(titles.eq(index + 1).length){
				if (sTop > jQuery(el).offset().top && sTop < titles.eq(index + 1).offset().top && !click) {
					jQuery(".bd-toc li").removeClass("active");
					jQuery(".bd-toc li").eq(index).addClass("active");
					click = false;
				}
			} else {
				if (sTop > jQuery(el).offset().top && !click) {
					jQuery(".bd-toc li").removeClass("active");
					jQuery(".bd-toc li").eq(index).addClass("active");
					click = false;
				}
			}
		});
	}
}