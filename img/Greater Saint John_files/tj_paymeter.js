var $=jQuery;var tj_paymeter={json_data_type:"json",endpoints:{meter:null,login:null,logout:null,tj_login:null},story:{id:null,publication:null,category:null},contentId:null,auth_token:null,subscriber_id:null,paywall_script:null,handle_syncronex_login:function(a){if(a.subscriberId!=undefined&&a.authToken!=undefined){tj_paymeter.auth_token=a.authToken;tj_paymeter.subscriber_id=a.subscriberId;tj_paymeter.tj_login()}},syncronex_login_status:function(){var a=tj_paymeter.get_query_string_token()||"";var b={format:"json",source:"web"};if(a!==""){b.authtoken=a}$.ajax({type:"GET",method:"GET",url:tj_paymeter.endpoints.login,dataType:"jsonp",data:b}).success(function(c){tj_paymeter.handle_syncronex_login(c)})},handle_tj_login:function(a){var b=a.data;if(b.status=="success"){return true}else{return false}},tj_login:function(){$.ajax({url:tj_paymeter.endpoints.tj_login,dataType:tj_paymeter.json_data_type,data:{token:tj_paymeter.auth_token},success:function(a){if(tj_paymeter.handle_tj_login(a)){if(window.reloadRequired){tj_paymeter.update_login_view()}}}})},get_query_string_token:function(){var c="sp-tk";url=window.location.href;name=c.replace(/[\[\]]/g,"\\$&");var b=new RegExp("[?&]"+name+"(=([^&#]*)|&|#|$)"),a=b.exec(url);if(!a){return null}if(!a[2]){return""}return decodeURIComponent(a[2].replace(/\+/g," "))},update_login_view:function(){setTimeout(window.location.reload(),500)},get_syncronex_script:function(){$.ajax({url:"/authAjax/getSyncronexContentId",success:function(a){if(!a.data.exempt){$.getScript(tj_paymeter.paywall_script)}}})}};