/*
 * debouncedresize: special jQuery event that happens once after a window resize
 *
 * latest version and complete README available on Github:
 * https://github.com/louisremi/jquery-smartresize
 *
 * Copyright 2012 @louis_remi
 * Licensed under the MIT license.
 *
 * This saved you an hour of work? 
 * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
 */
(function(d){var b=d.event,a,c;a=b.special.debouncedresize={setup:function(){d(this).on("resize",a.handler)},teardown:function(){d(this).off("resize",a.handler)},handler:function(i,e){var h=this,g=arguments,f=function(){i.type="debouncedresize";b.dispatch.apply(h,g)};if(c){clearTimeout(c)}e?f():c=setTimeout(f,a.threshold)},threshold:150}})(jQuery);