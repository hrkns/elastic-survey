"use strict";

document.getElementById("form_register").onsubmit = function(e){
	e.preventDefault();
	HTTP.post({
		url:"register",
		data:{
			email:$("#register_email").val().trim(),
			password:$("#register_password").val().trim(),
			fullname:$("#register_fullname").val().trim()
		},before : function(){
			lock_screen();
		},success:function(d, e, f){
			$("#signup, #tabs").hide(200);
			$("#message").html("Registrado. Para poder iniciar sesion, accede al link de confirmacion enviado a tu email. Si no recibes el correo, accede a la opción de recuperación de cuenta.<br><br><a href = 'javascript:;' onclick = '"+'$("input").val("");$("#message").hide(200);$("#signup, #tabs").show(200);'+"'>Volver</a>").show(200);
		},error:function(x, y, z){
			alert("Error en el registro");
		},after:function(res){
			unlock_screen();
		}
	});
}