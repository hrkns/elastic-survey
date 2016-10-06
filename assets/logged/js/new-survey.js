"use strict";

$("#new_survey_add_field").click(function(){
	add_field_on_survey_context("new_survey_fields");
});
document.getElementById("form_new_survey").onsubmit = function(e){
	e.preventDefault();
	//the function processSurveyForm is in the file my-surveys.js
	var data = processSurveyForm("new");
	HTTP.post({
		url : "survey",
		data: data,
		before : function(){
			lock_screen();
		},success:function(d, e, f){
			/*
			HTTP.post({
				url : "survey/"+d.data.item.id+"/files",
				data: data_files,
				success : function(){
			*/
					alert("survey created");
					$("#new_survey_configs").hide(200);
					$("#new_survey_title, #new_survey_survey_start_2, #new_survey_survey_end_2, #new_survey_survey_end_4, #new_survey_survey_start_5, #new_survey_survey_start_6").val("");
					tinyMCE.get("new_survey_description").setContent("");
					$("#new_survey_time_amount_6, #new_survey_time_amount_3").val("");
					$("#new_survey_time_type_6, #new_survey_time_type_3").val("seconds");
					$("#new_survey_data_group").empty();
					$("#new_survey_application_interval_1").trigger("click");
					last_div_app = "";
					$("#new_survey_tags, #new_survey_access_tokens").importTags("");
					$("#new_survey_privacy_all").trigger("click");
					$("#new_survey_privacy_access_tokens").prop("checked", false);
					$("#new_survey_div_access_tokens").hide(200);
					$("#new_survey_specific_contacts").select2("destroy");
					$("#new_survey_specific_contacts").children().attr("selected", false);
					$("#new_survey_specific_contacts").select2();
					$(".select2").css("width", "100%");
					$("#groups_development_choosen_by_user").trigger("click");
					$("#new_survey_groups_subset_amount").val("");
					$("#new_survey_groups_subset_no").trigger("click");
					$("#new_survey_files").empty();
					/**********************************************/
					add_preview_survey_to_dom(d.data.item);
			/*
				},error : function(){
					alert("there was an error uploading files...");
				},after : function(){
					unlock_screen();
				}
			});
			*/
		},errorfunction(x, y, z){
			alert("error creando survey");
		},after:function(v){
			unlock_screen();
		}
	});
}
var last_div_app = "";
$("#form_new_survey input[name='application_interval']").click(function(){
	if(last_div_app != "#new_survey_application_interval_"+$(this).val()){
		$(last_div_app).hide(200);
		last_div_app = "#new_survey_application_interval_"+$(this).val();
		$(last_div_app).show(200);
	}
});
$("	#new_survey_survey_start_2, #new_survey_survey_end_2,	#new_survey_survey_end_4, #new_survey_survey_start_5,	#new_survey_survey_start_6").bootstrapMaterialDatePicker({
	format : 'YYYY-MM-DD HH:mm',
	minDate : new Date()
});
$("#new_survey_tags, #new_survey_access_tokens").tagsInput();
$("#new_survey_specific_contacts").select2();
$(".select2").css("width", "100%");

$("#new_survey_add_data_group").click(function(e){
	e.preventDefault();
	add_data_group("new_survey_data_group");
});
$("#new_survey_add_file").click(function(){
	var row = document.createElement("div");
	row.className = "row";

	var inputname = document.createElement("input");
	inputname.type = "file";

	var remove = document.createElement("a");
	remove.href = "javascript:;";
	remove.onclick = function(){
		$(row).remove();
	}
	remove.innerHTML = "X";

	var cell1 = document.createElement("div");
	cell1.className = "col span5";

	var cell2 = document.createElement("div");
	cell2.className = "col span5";
	cell2.style.marginTop = "4px";

	cell1.appendChild(inputname);
	cell2.appendChild(remove);

	row.appendChild(cell1);
	row.appendChild(cell2);

	$("#new_survey_files").append(row);
});