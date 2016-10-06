"use strict";

function monitoring_surveys(){
	var start, now, total, str, restante, __end, __start;
	var months = Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
	setInterval(function(){
		$("#list_my_surveys div[data-type-application]").each(function(){
			var now = new Date();
			switch($(this).attr("data-status")){
				case "not-started":{
					$(this).find(".do_survey").show();
					switch(($(this).attr("data-type-application"))){
						case "start_null_end_null":{
							/******/
							$(this).find("button[data-type-button='navigate']").show();
							$(this).find("button[data-type-button='start']").show();
							$(this).find("button[data-type-button='stop']").hide();
							$(this).find("button[data-type-button='edit']").show();
							$(this).find("button[data-type-button='delete']").show();
							/******/
							$("#span_resting_time_"+$(this).attr("data-id")).html("");
						}break;
						case "start_null_end_time":{
							/******/
							$(this).find("button[data-type-button='navigate']").show();
							$(this).find("button[data-type-button='start']").show();
							$(this).find("button[data-type-button='stop']").hide();
							$(this).find("button[data-type-button='edit']").show();
							$(this).find("button[data-type-button='delete']").show();
							/******/
							$("#span_resting_time_"+$(this).attr("data-id")).html("");
						}break;
						case "start_null_end_date":{
							/******/
							$(this).find("button[data-type-button='navigate']").show();
							$(this).find("button[data-type-button='start']").show();
							$(this).find("button[data-type-button='stop']").hide();
							$(this).find("button[data-type-button='edit']").show();
							$(this).find("button[data-type-button='delete']").show();
							/******/
							var __end = new Date($(this).attr("data-end"));
							var cond = (__end <= now);
							if(cond){
								$("#span_resting_time_"+$(this).attr("data-id")).html("&nbsp;(Este cuestionario está pautado para terminar en una fecha inferior a la actual)").show();
								$("#span_waiting_for_manual_starting_"+$(this).attr("data-id")).hide();
								$(this).find("button[data-type-button='start']").hide();
							}else{
								$("#span_resting_time_"+$(this).attr("data-id")).html("");
								$("#span_waiting_for_manual_starting_"+$(this).attr("data-id")).show();
								$(this).find("button[data-type-button='start']").show();
							}
						}break;
						case "start_date_end_null":{
							/******/
							$(this).find("button[data-type-button='navigate']").show();
							$(this).find("button[data-type-button='start']").hide();
							$(this).find("button[data-type-button='stop']").hide();
							$(this).find("button[data-type-button='edit']").show();
							$(this).find("button[data-type-button='delete']").show();
							/******/
							__start = new Date($(this).attr("data-start"));
							var tiempo_restante = formatTime({
								type : "resting_with_date",
								end : __start,
								now : new Date()
							});
							if(tiempo_restante == null){
								//__id_survey_to_active = $(this).attr("data-id");
								//start_survey(true);
								$("#span_resting_time_"+$(this).attr("data-id")).html("&nbsp;(Activando...)").show();
							}else if(tiempo_restante.resting_time >= 3600*24*7){
								$("#span_resting_time_"+$(this).attr("data-id")).html("&nbsp(Pautado para comenzar el "+(months[Number(__start.getMonth())]+" "+__start.getDate()+", "+__start.getFullYear()+" "+complete(__start.getHours())+":"+complete(__start.getMinutes())+":"+complete(__start.getSeconds()))+")").show();
							}else if(tiempo_restante.resting_time){
								tiempo_restante["type"] = "text_resting_time";
								var str = "&nbsp;<strong>(Tiempo restante para iniciar:</strong> "+formatTime(tiempo_restante)+")</strong>";
								$("#span_resting_time_"+$(this).attr("data-id")).html(str).show();
							}
						}break;
						case "start_date_end_time":{
							/******/
							$(this).find("button[data-type-button='navigate']").show();
							$(this).find("button[data-type-button='start']").hide();
							$(this).find("button[data-type-button='stop']").hide();
							$(this).find("button[data-type-button='edit']").show();
							$(this).find("button[data-type-button='delete']").show();
							/******/
							__start = new Date($(this).attr("data-start"));
							var tiempo_restante = formatTime({
								type : "resting_with_date",
								end : __start,
								now : new Date()
							});
							if(tiempo_restante == null){
								//__id_survey_to_active = $(this).attr("data-id");
								//start_survey(true);
								$("#span_resting_time_"+$(this).attr("data-id")).html("&nbsp;(Activando...)").show();
							}else if(tiempo_restante.resting_time >= 3600*24*7){
								$("#span_resting_time_"+$(this).attr("data-id")).html("&nbsp(Pautado para comenzar el "+(months[Number(__start.getMonth())]+" "+__start.getDate()+", "+__start.getFullYear()+" "+complete(__start.getHours())+":"+complete(__start.getMinutes())+":"+complete(__start.getSeconds()))+")").show();
							}else if(tiempo_restante.resting_time){
								tiempo_restante["type"] = "text_resting_time";
								var str = "&nbsp;<strong>(Tiempo restante para iniciar:</strong> "+formatTime(tiempo_restante)+")</strong>";
								$("#span_resting_time_"+$(this).attr("data-id")).html(str).show();
							}
						}break;
						case "start_date_end_date":{
							/******/
							$(this).find("button[data-type-button='navigate']").show();
							$(this).find("button[data-type-button='start']").hide();
							$(this).find("button[data-type-button='stop']").hide();
							$(this).find("button[data-type-button='edit']").show();
							$(this).find("button[data-type-button='delete']").show();
							/******/
							var __end = new Date($(this).attr("data-end"));
							var cond = (__end <= now);
							if(cond){
								$("#span_resting_time_"+$(this).attr("data-id")).html("&nbsp;(Este cuestionario está pautado para terminar en una fecha inferior a la actual)").show();
								$("#span_waiting_for_manual_starting_"+$(this).attr("data-id")).hide();
								$(this).find("button[data-type-button='start']").hide();
							}else{
								__start = new Date($(this).attr("data-start"));
								var tiempo_restante = formatTime({
									type : "resting_with_date",
									end : __start,
									now : now
								});
								if(tiempo_restante == null){
									//__id_survey_to_active = $(this).attr("data-id");
									//start_survey(true);
									$("#span_resting_time_"+$(this).attr("data-id")).html("&nbsp;(Activando...)").show();
								}else if(tiempo_restante.resting_time >= 3600*24*7){
									$("#span_resting_time_"+$(this).attr("data-id")).html("&nbsp(Pautado para comenzar el "+(months[Number(__start.getMonth())]+" "+__start.getDate()+", "+__start.getFullYear()+" "+complete(__start.getHours())+":"+complete(__start.getMinutes())+":"+complete(__start.getSeconds()))+")").show();
								}else if(tiempo_restante.resting_time){
									tiempo_restante["type"] = "text_resting_time";
									var str = "&nbsp;<strong>(Tiempo restante para iniciar:</strong> "+formatTime(tiempo_restante)+")</strong>";
									$("#span_resting_time_"+$(this).attr("data-id")).html(str).show();
								}
							}
						}break;
					}
				}break;
				case "ongoing":{
					$(this).find(".do_survey").show();
					switch(($(this).attr("data-type-application"))){
						case "start_null_end_null":{
							/******/
							$(this).find("button[data-type-button='navigate']").show();
							$(this).find("button[data-type-button='start']").hide();
							$(this).find("button[data-type-button='stop']").show();
							$(this).find("button[data-type-button='edit']").show();
							$(this).find("button[data-type-button='delete']").hide();
							/******/
							$("#span_resting_time_"+$(this).attr("data-id")).html("&nbsp;(A la espera de detención manual)").show();
						}break;
						case "start_null_end_time":{
							/******/
							$(this).find("button[data-type-button='navigate']").show();
							$(this).find("button[data-type-button='start']").hide();
							$(this).find("button[data-type-button='stop']").hide();
							$(this).find("button[data-type-button='edit']").show();
							$(this).find("button[data-type-button='delete']").hide();
							/******/
							var tiempo_restante = formatTime({
								type : "resting",
								start : new Date($(this).attr("data-started-at")),
								time_amount : Number($(this).attr("data-time-amount")),
								time_amount_type : $(this).attr("data-time-type"),
								now : new Date()
							});
							if(tiempo_restante == null){
								//__id_survey_to_stop = $(this).attr("data-id");
								//stop_survey(true);
								$("#span_resting_time_"+$(this).attr("data-id")).html("&nbsp;(Deteniendo...)");
							}else{
								tiempo_restante["type"] = "text_resting_time";
								var str = "&nbsp;<strong>(Tiempo restante para finalizar:</strong> "+formatTime(tiempo_restante)+")</strong>";
								$("#span_resting_time_"+$(this).attr("data-id")).html(str).show();
							}
						}break;
						case "start_null_end_date":{
							/******/
							$(this).find("button[data-type-button='navigate']").show();
							$(this).find("button[data-type-button='start']").hide();
							$(this).find("button[data-type-button='stop']").hide();
							$(this).find("button[data-type-button='edit']").show();
							$(this).find("button[data-type-button='delete']").hide();
							/******/
							start = new Date($(this).attr("data-started-at"));
							__end = new Date($(this).attr("data-end"));
							var tiempo_restante = formatTime({
								type : "resting_with_date",
								start : start,
								end : __end,
								now : now
							});
							
							if(tiempo_restante == null){
								//__id_survey_to_stop = $(this).attr("data-id");
								//stop_survey(true);
								$("#span_resting_time_"+$(this).attr("data-id")).html("&nbsp;(Deteniendo...)");
							}else if(tiempo_restante.resting_time >= 3600*24*7){
								$("#span_resting_time_"+$(this).attr("data-id")).html("&nbsp(Pautado para terminar el "+(months[Number(__end.getMonth())]+" "+__end.getDate()+", "+__end.getFullYear()+" "+complete(__end.getHours())+":"+complete(__end.getMinutes())+":"+complete(__end.getSeconds()))+")").show();
							}else if(tiempo_restante.resting_time >= 0){
								tiempo_restante["type"] = "text_resting_time";
								var str = "&nbsp;<strong>(Tiempo restante para finalizar:</strong> "+formatTime(tiempo_restante)+")</strong>";
								$("#span_resting_time_"+$(this).attr("data-id")).html(str).show();
							}
						}break;
						case "start_date_end_null":{
							/******/
							$(this).find("button[data-type-button='navigate']").show();
							$(this).find("button[data-type-button='start']").hide();
							$(this).find("button[data-type-button='stop']").show();
							$(this).find("button[data-type-button='edit']").show();
							$(this).find("button[data-type-button='delete']").hide();
							/******/
							$("#span_resting_time_"+$(this).attr("data-id")).html("&nbsp;(A la espera de detención manual)").show();
						}break;
						case "start_date_end_time":{
							/******/
							$(this).find("button[data-type-button='navigate']").show();
							$(this).find("button[data-type-button='start']").hide();
							$(this).find("button[data-type-button='stop']").hide();
							$(this).find("button[data-type-button='edit']").show();
							$(this).find("button[data-type-button='delete']").hide();
							/******/
							var tiempo_restante = formatTime({
								type : "resting",
								start : new Date($(this).attr("data-started-at")),
								time_amount : Number($(this).attr("data-time-amount")),
								time_amount_type : $(this).attr("data-time-type"),
								now : new Date()
							});
							if(tiempo_restante == null){
								//__id_survey_to_stop = $(this).attr("data-id");
								//stop_survey(true);
								$("#span_resting_time_"+$(this).attr("data-id")).html("&nbsp;(Deteniendo...)");
							}else{
								tiempo_restante["type"] = "text_resting_time";
								var str = "&nbsp;<strong>(Tiempo restante para finalizar:</strong> "+formatTime(tiempo_restante)+")</strong>";
								$("#span_resting_time_"+$(this).attr("data-id")).html(str).show();
							}
						}break;
						case "start_date_end_date":{
							/******/
							$(this).find("button[data-type-button='navigate']").show();
							$(this).find("button[data-type-button='start']").hide();
							$(this).find("button[data-type-button='stop']").hide();
							$(this).find("button[data-type-button='edit']").show();
							$(this).find("button[data-type-button='delete']").hide();
							/******/
							start = new Date($(this).attr("data-started-at"));
							__end = new Date($(this).attr("data-end"));
							var tiempo_restante = formatTime({
								type : "resting_with_date",
								start : start,
								end : __end,
								now : now
							});
							
							if(tiempo_restante == null){
								//__id_survey_to_stop = $(this).attr("data-id");
								//stop_survey(true);
								$("#span_resting_time_"+$(this).attr("data-id")).html("&nbsp;(Deteniendo...)");
							}else if(tiempo_restante.resting_time >= 3600*24*7){
								$("#span_resting_time_"+$(this).attr("data-id")).html("&nbsp(Pautado para terminar el "+(months[Number(__end.getMonth())]+" "+__end.getDate()+", "+__end.getFullYear()+" "+complete(__end.getHours())+":"+complete(__end.getMinutes())+":"+complete(__end.getSeconds()))+")").show();
							}else if(tiempo_restante.resting_time >= 0){
								tiempo_restante["type"] = "text_resting_time";
								var str = "&nbsp;<strong>(Tiempo restante para finalizar:</strong> "+formatTime(tiempo_restante)+")</strong>";
								$("#span_resting_time_"+$(this).attr("data-id")).html(str).show();
							}
						}break;
					}
				}break;
				case "finished":{
					$(this).find(".do_survey").show();
					switch(($(this).attr("data-type-application"))){
						case "start_null_end_null":{
							/******/
							$(this).find("button[data-type-button='navigate']").show();
							$(this).find("button[data-type-button='start']").hide();
							$(this).find("button[data-type-button='stop']").hide();
							$(this).find("button[data-type-button='edit']").hide();
							$(this).find("button[data-type-button='delete']").show();
							/******/
						}break;
						case "start_null_end_time":{
							/******/
							$(this).find("button[data-type-button='navigate']").show();
							$(this).find("button[data-type-button='start']").hide();
							$(this).find("button[data-type-button='stop']").hide();
							$(this).find("button[data-type-button='edit']").hide();
							$(this).find("button[data-type-button='delete']").show();
							/******/
						}break;
						case "start_null_end_date":{
							/******/
							$(this).find("button[data-type-button='navigate']").show();
							$(this).find("button[data-type-button='start']").hide();
							$(this).find("button[data-type-button='stop']").hide();
							$(this).find("button[data-type-button='edit']").hide();
							$(this).find("button[data-type-button='delete']").show();
							/******/
						}break;
						case "start_date_end_null":{
							/******/
							$(this).find("button[data-type-button='navigate']").show();
							$(this).find("button[data-type-button='start']").hide();
							$(this).find("button[data-type-button='stop']").hide();
							$(this).find("button[data-type-button='edit']").hide();
							$(this).find("button[data-type-button='delete']").show();
							/******/
						}break;
						case "start_date_end_time":{
							/******/
							$(this).find("button[data-type-button='navigate']").show();
							$(this).find("button[data-type-button='start']").hide();
							$(this).find("button[data-type-button='stop']").hide();
							$(this).find("button[data-type-button='edit']").hide();
							$(this).find("button[data-type-button='delete']").show();
							/******/
						}break;
						case "start_date_end_date":{
							/******/
							$(this).find("button[data-type-button='navigate']").show();
							$(this).find("button[data-type-button='start']").hide();
							$(this).find("button[data-type-button='stop']").hide();
							$(this).find("button[data-type-button='edit']").hide();
							$(this).find("button[data-type-button='delete']").show();
							/******/
						}break;
					}
				}break;
			}
		});
	}, 1000);	
}