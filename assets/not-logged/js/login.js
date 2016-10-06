"use strict";

document.getElementById("form_login").onsubmit = function(e){
	e.preventDefault();
	HTTP.post({
		url:"login",
		data:{
			email:$("#login_email").val().trim(),
			password:$("#login_password").val().trim()
		},before : function(){
			lock_screen();
		},success:function(d, e, f){
			window.location.reload();
		},error:function(x, y, z){
			alert("Error en el login");
			unlock_screen();
		}
	});
}