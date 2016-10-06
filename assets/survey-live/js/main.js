"use strict";

const idSurvey = $("#survey_id").val();
const idSurveyApplying = $("#survey_applying_id").val();

window.addEventListener("load", function(){
	$("#toggle_conditions").click(function(){
		$("#div_conditions").toggle(200);
	});
	var time_limit_types = ["seconds", "minutes", "hours", "days", "weeks"];
	//click hecho en el boton "entrar/ver" del preview de seccion
	$(".link_section").click(function(){
		//si ya la seccion estÃ¡ terminada (solo aplica a aquellas con tiempo limite)
		if(	$(this).attr("data-finished-at") != "undefined" || 
			(/* $(this).attr("data-time-limit-type") == "undefined" && */$(this).attr("data-started-at") != "undefined")){
			$("#home_interface").hide(200);
			$("#sections_interface").children().each(function(){
				$(this).hide();
			});
			$("#sections_interface, #section_live_"+$(this).attr("data-id-section")).show(200);
		//si no lo estÃ¡
		}else{
			var tiempo_limite = time_limit_types.indexOf($(this).attr("data-time-limit-type")) != -1;
			var pausing = $(this).attr("data-pausing") == "no";
			var entrar = (!tiempo_limite && !pausing) || confirm("Esta seccion posee " + (tiempo_limite?"una cuenta regresiva que se activara apenas entre":"") + (tiempo_limite && pausing?" ademas de ":"") + (pausing?"la restriccion de no navegar en otras secciones mientras se encuentra en esta":"") + ". ¿Desea ingresar?");

			if(entrar){
				var idsection = $(this).attr("data-id-section");
				HTTP.post({
					url : "/survey-applying/"+idSurvey+"/section/"+idsection+"/start",
					data : {
						"id_survey_applying" : idSurveyApplying
					}, before : function(){
					}, success : function(d, e, f){
						$("#home_interface").hide(200);
						$("#sections_interface").children().each(function(){
							$(this).hide();
						});

						var data = {
							idsection : idsection
						};

						createSectionInterface(data);
						$("#sections_interface").show(200);
					}, error : function(x, y, z){
					}, after : function(v){
						unlock_screen();
					}
				});
			}
		}
	});

	var months = Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

	var cronometroGlobal = setInterval(function(){
		var t = $("#global_resting_time");
		var startedAt = new Date(t.attr("data-started-at"));
		var now = new Date();
		var surveyStatus = $("#survey_status").val();
		switch(t.attr("data-type-time-apply")){
			case "start_null_end_null":{
				switch(surveyStatus){
					case "not-started":{
						t.html("Esperando a ser aperturada por su creador.");
					}break;
					case "ongoing":{
						t.html("En proceso, sujeta al cierre o suspensiÃ³n por parte de su creador (en cualquier momento).");
					}break;
					case "finished":{
						t.html("Este cuestionario ya no admite nuevas solicitudes");
					}break;
				}
			};break;
			case "start_null_end_time":{
				switch(surveyStatus){
					case "not-started":{
						t.html("Esperando a ser aperturada por su creador.");
					}break;
					case "ongoing":{
						var tiempo_restante = formatTime({
							type : "resting",
							start : startedAt,
							time_amount : Number($(t).attr("data-time-amount")),
							time_amount_type : $(t).attr("data-time-type"),
							now : new Date()
						});
						if(tiempo_restante != null){
							tiempo_restante["type"] = "text_resting_time";
							var str = "<strong>Tiempo restante para finalizar:</strong> "+formatTime(tiempo_restante)+"</strong>";
							$(t).html(str);
						}
						else{
							//wait push from server...
						}
					}break;
					case "finished":{
						t.html("Este cuestionario ya no admite nuevas solicitudes");
					}break;
				}
			};break;
			case "start_null_end_date":{
				switch(surveyStatus){
					case "not-started":{
						t.html("Esperando a ser aperturada por su creador.");
					}break;
					case "ongoing":{
						var tiempo_restante = formatTime({
							type : "resting_with_date",
							start : startedAt,
							end : new Date($(t).attr("data-end")),
							now : new Date()
						});
						if(tiempo_restante == null){
							//wait push from server...
						}
						else if(tiempo_restante.resting_time >= 3600*24*7){
							var __end = new Date($(t).attr("data-end"));
							$(t).html("Pautado para terminar el "+(months[Number(__end.getMonth())]+" "+__end.getDate()+", "+__end.getFullYear()+" "+complete(__end.getHours())+":"+complete(__end.getMinutes())+":"+complete(__end.getSeconds())));
						}else{
							tiempo_restante["type"] = "text_resting_time";
							var str = "<strong>Tiempo restante para finalizar:</strong> "+formatTime(tiempo_restante)+"</strong>";
							$(t).html(str);
						}
					}break;
					case "finished":{
						t.html("Este cuestionario ya no admite nuevas solicitudes");
					}break;
				}
			};break;
			case "start_date_end_null":{
				switch(surveyStatus){
					case "not-started":{
						var tiempo_restante = formatTime({
							type : "resting_with_date",
							end : new Date($(t).attr("data-start")),
							now : new Date()
						});
						if(tiempo_restante == null){
							//wait push from server...
						}else if(tiempo_restante.resting_time >= 3600*24*7){
							var __start = new Date($(t).attr("data-start"));
							$(t).html("Pautado para iniciar el "+(months[Number(__start.getMonth())-1]+" "+__start.getDate()+", "+__start.getFullYear()+" "+complete(__start.getHours())+":"+complete(__start.getMinutes())+":"+complete(__start.getSeconds())));
						}else if(tiempo_restante.resting_time){
							tiempo_restante["type"] = "text_resting_time";
							var str = "<strong>Tiempo restante para inicio:</strong> "+formatTime(tiempo_restante)+"</strong>";
							$(t).html(str);
						}
					}break;
					case "ongoing":{
						$("#global_resting_time").html("Este cuestionario ha estado permanentemente abierto y su disponibilidad al publico depende de su creador");
					}break;
					case "finished":{
						t.html("Este cuestionario ya no admite nuevas solicitudes");
					}break;
				}
			};break;
			case "start_date_end_time":{
				switch(surveyStatus){
					case "not-started":{
						var tiempo_restante = formatTime({
							type : "resting_with_date",
							end : new Date($(t).attr("data-start")),
							now : new Date()
						});
						if(tiempo_restante == null){
							//wait push from server...
						}else if(tiempo_restante.resting_time >= 3600*24*7){
							var __start = new Date($(t).attr("data-start"));
							$(t).html("Pautado para iniciar el "+(months[Number(__start.getMonth())-1]+" "+__start.getDate()+", "+__start.getFullYear()+" "+complete(__start.getHours())+":"+complete(__start.getMinutes())+":"+complete(__start.getSeconds())));
						}else{
							tiempo_restante["type"] = "text_resting_time";
							var str = "<strong>Tiempo restante para inicio:</strong> "+formatTime(tiempo_restante)+"</strong>";
							$(t).html(str);
						}
					}break;
					case "ongoing":{
						var tiempo_restante = formatTime({
							type : "resting",
							start : startedAt,
							time_amount : Number($(t).attr("data-time-amount")),
							time_amount_type : $(t).attr("data-time-type"),
							now : new Date()
						});
						if(tiempo_restante != null){
							tiempo_restante["type"] = "text_resting_time";
							var str = "<strong>Tiempo restante para finalizar:</strong> "+formatTime(tiempo_restante)+"</strong>";
							$(t).html(str);
						}
						else{
							//wait push from server...
						}
					}break;
					case "finished":{
						t.html("Este cuestionario ya no admite nuevas solicitudes");
					}break;
				}
			};break;
			case "start_date_end_date":{
				switch(surveyStatus){
					case "not-started":{
						var tiempo_restante = formatTime({
							type : "resting_with_date",
							end : new Date($(t).attr("data-start")),
							now : new Date()
						});
						if(tiempo_restante == null){
							//wait push from server...
						}else if(tiempo_restante.resting_time >= 3600*24*7){
							var __start = new Date($(t).attr("data-start"));
							$(t).html("Pautado para iniciar el "+(months[Number(__start.getMonth())-1]+" "+__start.getDate()+", "+__start.getFullYear()+" "+complete(__start.getHours())+":"+complete(__start.getMinutes())+":"+complete(__start.getSeconds())));
						}else{
							tiempo_restante["type"] = "text_resting_time";
							var str = "<strong>Tiempo restante para inicio:</strong> "+formatTime(tiempo_restante)+"</strong>";
							$(t).html(str);
						}
					}break;
					case "ongoing":{
						var tiempo_restante = formatTime({
							type : "resting_with_date",
							start : startedAt,
							end : new Date($(t).attr("data-end")),
							now : new Date()
						});
						if(tiempo_restante == null){
							//wait push from server...
						}
						else if(tiempo_restante.resting_time >= 3600*24*7){
							var __end = new Date($(t).attr("data-end"));
							$(t).html("Pautado para terminar el "+(months[Number(__end.getMonth())-1]+" "+__end.getDate()+", "+__end.getFullYear()+" "+complete(__end.getHours())+":"+complete(__end.getMinutes())+":"+complete(__end.getSeconds())));
						}else{
							tiempo_restante["type"] = "text_resting_time";
							var str = "<strong>Tiempo restante para finalizar:</strong> "+formatTime(tiempo_restante)+"</strong>";
							$(t).html(str);
						}
					}break;
					case "finished":{
						t.html("Este cuestionario ya no admite nuevas solicitudes");
					}break;
				}
			};
		}
		//cronometro de secciones con tiempo asociado (esta estructura tendria sentido si permitiera
		//aperturar varias secciones con tiempo limite al mismo tiempo, ya que tal como esta configurado
		//ahorita solo se permite una a la vez)
		$(".cronometro").each(function(){
			if($(this).attr("data-finished-at") != "undefined"){
				//$(this).html("Terminada a tiempo");
				//return;
			}

			var start = new Date($(this).attr("data-started-at"));
			var time_limit_type = $(this).attr("data-time-limit-type");
			var time_limit_val = $(this).attr("data-time-limit-val");
			var total = conversion(time_limit_val, time_limit_type);
			var now = Date.now();

			if(now - start.getTime() > total){
				$(this).html("Tiempo agotado");
			}else if(!isNaN(total - (now - start.getTime()))){
				$(this).html(formatTime({
					type: "text_resting_time_only_milisecs",
					milisecs : total - (now - start.getTime())
				}));
			}else if($(this).attr("data-started-at") != "undefined"){
				$(this).html("En proceso...");
			}else{
				$(this).html("Sin iniciar");
			}
		});
	}, 1000);

	notifications();

	//para aquellas secciones ya aperturadas e incluso cerradas, construir la interfaz correspondiente
	//pensar que en el template ya podriamos tener algo adelantado
	$("#sections_interface").children().each(function(){
		if($(this).attr("data-finished-at") != "undefined"){
			setSectionInterfaceToClosed({
				idsection : $(this).attr("data-id-section"),
				display : "none",
			});
		}else{
			$(this).attr("id", "");
			createSectionInterface({
				idsection : $(this).attr("data-id-section"),
				display : "none"
			});
			$(this).remove();
		}
	});

	//dependiendo del status del usuario con respecto a la encuesta se muestra la interfaz correspondiente
	if($("#user_status").val() == "doing"){
		if($("#actual_section").val() == "null"){
			$("#home_interface").show(200);
		}else{
			$("#sections_interface").show(200);
			$("#section_live_"+$("#actual_section").val()).show(200);
		}
	}else{
		$("#home_interface").show(200);
	}

	$(".resting_time").each(function(){
		var inicio = $(this).attr("data-started-at");
		var fin = $(this).attr("data-finished-at");
		var type = $(this).attr("data-time-limit-type");
		var amount = $(this).attr("data-time-limit-val");
		if(inicio != "undefined" && fin != "undefined" && type != "limit"){
			inicio = new Date(inicio);
			fin = new Date(fin);
			var cantidad = conversion(amount, type);
			var hecho = fin.getTime() - inicio.getTime();
			if(hecho < cantidad)
				$(this).html("Terminado a tiempo");
			else
				$(this).html("Tiempo agotado");
		}
	});
});

//bindear notificacion de seccion cerrada, y los efectos colaterales
function attachSectionClosingNotification(idsection){
	Notifications.on('notification_survey_'+idSurveyApplying+'_section_'+idsection+'_closing', function(d){
		var fin = new Date();
		$(".link_section[data-id-section='"+idsection+"']").html("<strong>Ver</strong>").attr("data-finished-at", fin);
		//$("#home_interface").show(200);
		setSectionInterfaceToClosed({
			idsection : idsection
		});
		//$("#sections_interface").children().hide();
		//$("#sections_interface").hide();
		$("#section_resting_time_"+idsection).removeClass("cronometro").html("Tiempo agotado").attr("data-finished-at", fin);
	});
}

//configuracion de notificaciones
function notifications(){
	//cuestionario activoado
	Notifications.on('notification_survey_'+$("#survey_id").val()+'_activated', function(data){
		window.location.reload();
	});
	//cuestionario terminado
	Notifications.on('notification_survey_'+$("#survey_id").val()+'_finished', function(data){
		window.location.reload();
	});
	//cuestionario eliminado
	Notifications.on('notification_survey_'+$("#survey_id").val()+'_removed', function(data){
		$("body").empty();
		alert("no existe mas");
		window.location.href = "/";
	});
	//para aquella (o aquellas tambien) seccion que fue iniciada y posee tiempo limite asociado y aun no esta cerrada
	//se le bindea la notificacion de finished
	$("#home_interface").find(".resting_time").each(function(){
		if(	$(this).attr("data-started-at") != "undefined" && 
			$(this).attr("data-time-limit-type") != "undefined" && 
			$(this).attr("data-finished-at") == "undefined" ){
			attachSectionClosingNotification($(this).attr("data-id-section"));
		}
	});
}

//configurar interfaz para seccion a desarrollar
//ESTA FUNCION PUEDE QUE CREZCA MUUCHO MAS CON TODAS LAS VARIANTES Y CONFIGURACIONES POR VENIR
function createSectionInterface(data){
	var now = new Date();
	var maindiv = document.createElement("div");
	maindiv.align = "center";
	maindiv.id = "section_live_"+data.idsection;
	if(data.display)
		maindiv.style.display = data.display;

	var auxspan = document.createElement("span");
	auxspan.innerHTML = "En proceso...";

	var cronometro = document.getElementById("section_resting_time_"+data.idsection).cloneNode();
	cronometro.id += "_inside";
	cronometro.className = "cronometro";
	if($("#section_resting_time_"+data.idsection).attr("data-started-at") == "undefined"){
		cronometro.setAttribute("data-started-at", now);
		$("#section_resting_time_"+data.idsection).attr("data-started-at", now);
	}else{
		cronometro.setAttribute("data-started-at", $("#section_resting_time_"+data.idsection).attr("data-started-at"));
	}

	var btnstop = document.createElement("button");
	var btngoback = null;
	if($("#section_resting_time_"+data.idsection).attr("data-time-limit-val") != "undefined"){
		btnstop.innerHTML = "terminar seccion"
		btnstop.onclick = function(){
			if(confirm("seguro?")){
				HTTP.post({
					url : "/survey-applying/"+idSurvey+"/section/"+data.idsection+"/finish",
					data : {
						"id_survey_applying" : idSurveyApplying
					}, before : function(){
					}, success : function(d, e, f){
						//paralelamente llega la notificacion por socket y se reconfigura l interfaz
						setTimeout(function(){
							$("#section_resting_time_"+data.idsection).html("Terminado a tiempo");
						}, 1000);
					}, error : function(x, y, z){
					}, after : function(v){
						unlock_screen();
					}
				});
			}
		}
		if($("#section_resting_time_"+data.idsection).attr("data-pausing") == "yes"){
			btngoback = document.createElement("button");
			btngoback.innerHTML = "go back"
			btngoback.onclick = function(){
				$("#home_interface").show(200);
				$("#sections_interface").children().hide();
				$("#sections_interface").hide();
			}
		}
	}else{
		btnstop.innerHTML = "volver a home"
		btnstop.onclick = function(){
			$("#home_interface").show(200);
			$("#sections_interface").children().hide();
			$("#sections_interface").hide();
		}
	}

	maindiv.appendChild(auxspan);
	maindiv.appendChild(document.createElement("br"));
	maindiv.appendChild(cronometro);
	maindiv.appendChild(document.createElement("br"));
	maindiv.appendChild(btnstop);
	if(btngoback != null){
		maindiv.appendChild(document.createElement("br"));
		maindiv.appendChild(btngoback);
	}
	$("#sections_interface").append(maindiv);
	attachSectionClosingNotification(data.idsection);
	$("#enter_section_"+data.idsection).attr("data-started-at", now);
}

//configurar interfaz de seccion ya terminada
//ESTA FUNCION PUEDE QUE CREZCA MUUCHO MAS CON TODAS LAS VARIANTES Y CONFIGURACIONES POR VENIR
function setSectionInterfaceToClosed(data){
	$("#section_live_"+data.idsection).empty();

	var auxspan = document.createElement("span");
	auxspan.innerHTML = "Terminada";

	var btngoback = document.createElement("button");
	btngoback.innerHTML = "go back"
	btngoback.onclick = function(){
		$("#section_live_"+data.idsection).hide(200);
		$("#home_interface").show(200);
	}

	$("#section_live_"+data.idsection).append(auxspan);
	$("#section_live_"+data.idsection).append(document.createElement("br"));
	$("#section_live_"+data.idsection).append(document.createElement("br"));
	$("#section_live_"+data.idsection).append(btngoback);

	$("#section_resting_time_"+data.idsection).removeClass("cronometro").html();
}