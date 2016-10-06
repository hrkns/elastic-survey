"use strict";

$("#edit_survey_add_field").click(function(){
	add_field_on_survey_context("edit_survey_fields");
});
document.getElementById("form_edit_survey").onsubmit = function(e){
	e.preventDefault();
	//the function processSurveyForm is in the file my-surveys.js
	var data = processSurveyForm("edit");		
	HTTP.update({
		url : "survey/"+__id_edit_survey,
		data: data,
		before : function(){
			lock_screen();
		},success:function(d, e, f){
			alert("survey edited");
			$("#edit_survey_configs").hide(200);
			$("#edit_survey_title, #edit_survey_description, #edit_survey_survey_start_2, #edit_survey_survey_end_2, #edit_survey_survey_end_4, #edit_survey_survey_start_5, #edit_survey_survey_start_6").val("");
			$("#edit_survey_time_amount_6, #edit_survey_time_amount_3").val("");
			$("#edit_survey_time_type_6, #edit_survey_time_type_3").val("seconds");
			$("#edit_survey_fields").empty();
			$("#edit_survey_application_interval_1").trigger("click");
			last_div_app_edit = "";
			$("#edit_survey_tags").importTags("");
			/**********************************************/
			$("#div_survey_"+__id_edit_survey).attr("data-tags", JSON.stringify(data.tags));
			$("#div_survey_"+__id_edit_survey).attr("data-type-application", (data["type_time_apply"]));
			$("#div_survey_"+__id_edit_survey).attr("data-start", (data.start));
			$("#div_survey_"+__id_edit_survey).attr("data-end", (data.end));
			$("#div_survey_"+__id_edit_survey).attr("data-time-amount", (data["time_amount"]));
			$("#div_survey_"+__id_edit_survey).attr("data-time-type", (data["time_type"]));

			var tmp = (data.type_time_apply);
			if(tmp=="start_null_end_null" || tmp=="start_null_end_time" || tmp=="start_null_end_date"){
				$("#div_survey_"+__id_edit_survey).find("button[data-type-button='start']").show();
				$("#span_waiting_for_manual_starting_"+__id_edit_survey).show();
			}
			else{
				$("#div_survey_"+__id_edit_survey).find("button[data-type-button='start']").hide();
				$("#span_waiting_for_manual_starting_"+__id_edit_survey).hide();
			}

			$("#div_survey_"+__id_edit_survey).find("span[data-name='title']").html(data.title);
			$("#div_survey_"+__id_edit_survey).find("div[data-name='description']").empty().html(data.description);
			/**********************************************/
			$("#tab_edit_survey").hide();
			$("#clicktab1").trigger("click");
		},error:function(x, y, z){
			alert("error editando survey");
		},after:function(v){
			unlock_screen();
		}
	});
}
var last_div_app_edit = "";
$("#form_edit_survey input[name='application_interval']").click(function(){
	if(last_div_app_edit != "#edit_survey_application_interval_"+$(this).val()){
		$(last_div_app_edit).hide(200);
		last_div_app_edit = "#edit_survey_application_interval_"+$(this).val();
		$(last_div_app_edit).show(200);
	}
});
$("	#edit_survey_survey_start_2, #edit_survey_survey_end_2,	#edit_survey_survey_end_4, #edit_survey_survey_start_5,	#edit_survey_survey_start_6").bootstrapMaterialDatePicker({
	format : 'YYYY-MM-DD HH:mm',
	minDate : new Date()
});
$("#edit_survey_tags, #edit_survey_access_tokens").tagsInput();
$("#edit_survey_specific_contacts").select2();
$(".select2").css("width", "100%");
$("#edit_survey_add_data_group").click(function(e){
	e.preventDefault();
	add_data_group("edit_survey_data_group");
});