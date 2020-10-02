/*
 * CirclePlayer for the jPlayer Plugin (jQuery)
 * http://www.jplayer.org
 *
 * Copyright (c) 2009 - 2012 Happyworm Ltd
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * Version: 1.0.1 (jPlayer 2.1.0+)
 * Date: 30th May 2011
 *
 * Author: Mark J Panaghiston @thepag
 *
 * CirclePlayer prototype developed by:
 * Mark Boas @maboa
 * Silvia Benvenuti @aulentina
 * Jussi Kalliokoski @quinirill
 *
 * Inspired by :
 * Neway @imneway http://imneway.net/ http://forrst.com/posts/Untitled-CPt
 * and
 * Liam McKay @liammckay http://dribbble.com/shots/50882-Purple-Play-Pause
 *
 * Standing on the shoulders of :
 * John Resig @jresig
 * Mark Panaghiston @thepag
 * Louis-Rémi Babé @Louis_Remi
 */
;var CirclePlayer=function(c,f,b){var a=this,e={supplied:"m4a, oga",cssSelectorAncestor:"#cp_container_1",cssSelector:{play:".cp-play",pause:".cp-pause"}},d={bufferHolder:".cp-buffer-holder",buffer1:".cp-buffer-1",buffer2:".cp-buffer-2",progressHolder:".cp-progress-holder",progress1:".cp-progress-1",progress2:".cp-progress-2",circleControl:".cp-circle-control"};this.cssClass={gt50:"cp-gt50",fallback:"cp-fallback"};this.spritePitch=104;this.spriteRatio=0.24;this.player=jQuery(c);this.media=jQuery.extend({},f);this.options=jQuery.extend(true,{},e,b);this.cssTransforms=Modernizr.csstransforms;this.audio={};this.dragging=false;this.eventNamespace=".CirclePlayer";this.jq={};jQuery.each(d,function(g,h){a.jq[g]=jQuery(a.options.cssSelectorAncestor+" "+h)});this._initSolution();this._initPlayer()};CirclePlayer.prototype={_createHtml:function(){},_initPlayer:function(){var a=this;this.player.jPlayer(this.options);this.player.bind(jQuery.jPlayer.event.ready+this.eventNamespace,function(b){if(b.jPlayer.html.used&&b.jPlayer.html.audio.available){a.audio=jQuery(this).data("jPlayer").htmlElement.audio}jQuery(this).jPlayer("setMedia",a.media);a._initCircleControl()});this.player.bind(jQuery.jPlayer.event.play+this.eventNamespace,function(b){jQuery(this).jPlayer("pauseOthers")});this.player.bind(jQuery.jPlayer.event.timeupdate+this.eventNamespace,function(b){if(!a.dragging){a._timeupdate(b.jPlayer.status.currentPercentAbsolute)}});this.player.bind(jQuery.jPlayer.event.progress+this.eventNamespace,function(e){var d=0;if((typeof a.audio.buffered==="object")&&(a.audio.buffered.length>0)){if(a.audio.duration>0){var b=0;for(var c=0;c<a.audio.buffered.length;c++){b+=a.audio.buffered.end(c)-a.audio.buffered.start(c)}d=100*b/a.audio.duration}}else{d=0}a._progress(d)});this.player.bind(jQuery.jPlayer.event.ended+this.eventNamespace,function(b){a._resetSolution()})},_initSolution:function(){if(this.cssTransforms){this.jq.progressHolder.show();this.jq.bufferHolder.show()}else{this.jq.progressHolder.addClass(this.cssClass.gt50).show();this.jq.progress1.addClass(this.cssClass.fallback);this.jq.progress2.hide();this.jq.bufferHolder.hide()}this._resetSolution()},_resetSolution:function(){if(this.cssTransforms){this.jq.progressHolder.removeClass(this.cssClass.gt50);this.jq.progress1.css({transform:"rotate(0deg)"});this.jq.progress2.css({transform:"rotate(0deg)"}).hide()}else{this.jq.progress1.css("background-position","0 "+this.spritePitch+"px")}},_initCircleControl:function(){var a=this;this.jq.circleControl.grab({onstart:function(){a.dragging=true},onmove:function(c){var b=a._getArcPercent(c.position.x,c.position.y);a.player.jPlayer("playHead",b).jPlayer("play");a._timeupdate(b)},onfinish:function(c){a.dragging=false;var b=a._getArcPercent(c.position.x,c.position.y);a.player.jPlayer("playHead",b).jPlayer("play")}})},_timeupdate:function(c){var a=c*3.6+"deg";var b=(Math.floor((Math.round(c))*this.spriteRatio)-1)*-this.spritePitch;if(c<=50){if(this.cssTransforms){this.jq.progressHolder.removeClass(this.cssClass.gt50);this.jq.progress1.css({transform:"rotate("+a+")"});this.jq.progress2.hide()}else{this.jq.progress1.css("background-position","0 "+b+"px")}}else{if(c<=100){if(this.cssTransforms){this.jq.progressHolder.addClass(this.cssClass.gt50);this.jq.progress1.css({transform:"rotate(180deg)"});this.jq.progress2.css({transform:"rotate("+a+")"});this.jq.progress2.show()}else{this.jq.progress1.css("background-position","0 "+b+"px")}}}},_progress:function(b){var a=b*3.6+"deg";if(this.cssTransforms){if(b<=50){this.jq.bufferHolder.removeClass(this.cssClass.gt50);this.jq.buffer1.css({transform:"rotate("+a+")"});this.jq.buffer2.hide()}else{if(b<=100){this.jq.bufferHolder.addClass(this.cssClass.gt50);this.jq.buffer1.css({transform:"rotate(180deg)"});this.jq.buffer2.show();this.jq.buffer2.css({transform:"rotate("+a+")"})}}}},_getArcPercent:function(d,c){var e=this.jq.circleControl.offset(),a=d-e.left-this.jq.circleControl.width()/2,f=c-e.top-this.jq.circleControl.height()/2,b=Math.atan2(f,a);if(b>-1*Math.PI&&b<-0.5*Math.PI){b=2*Math.PI+b}return(b+Math.PI/2)/2*Math.PI*10},setMedia:function(a){this.media=jQuery.extend({},a);this.player.jPlayer("setMedia",this.media)},play:function(a){this.player.jPlayer("play",a)},pause:function(a){this.player.jPlayer("pause",a)},destroy:function(){this.player.unbind(this.eventNamespace);this.player.jPlayer("destroy")}};