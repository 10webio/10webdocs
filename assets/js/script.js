jQuery(window).resize(function(){
	if(matchMedia('only screen and (min-width : 768px)').matches){
		jQuery("#bd-docs-nav").show();
	} else{
		jQuery("#bd-docs-nav").removeClass("sticky_aside");
	}
});

var click = false;
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