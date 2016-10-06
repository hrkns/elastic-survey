"use strict";

document.getElementById("form_recover").onsubmit = function(e){
	e.preventDefault();
	HTTP.post({
		url:"account-recovering",
		data:{
			email:$("#recover_email").val().trim()
		},before : function(){
			lock_screen();
		},success:function(d, e, f){
			$("#recover, #tabs").hide(200);
			$("#message").html("Acceda al link de confirmacion enviado a su email.<br><br><a href = 'javascript:;' onclick = '"+'$("input").val("");$("#message").hide(200);$("#signup, #tabs").show(200);'+"'>Volver</a>").show(200);
		},error:function(x, y, z){
			alert("Error de valor dado");
		},after:function(d){
			unlock_screen();
		}
	});
}