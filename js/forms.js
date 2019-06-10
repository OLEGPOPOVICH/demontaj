/* Получите расчет по смс */
function AjaxFormTop(result_id,form_id,url) {

	var phoneval  = $("#phone_"+form_id).val();
	var phonelen  = phoneval.length;
	
	if(phonelen <= 4 || phoneval == 'Введите номер телефона' || phoneval == '')
	{
		alert ( "Укажите Ваш номер телефона" );
	} else {
		jQuery.ajax({
			url: url,
			type: "POST",
			dataType: "html",
			data: jQuery("#"+form_id).serialize(),
			success: function(response) {
				document.getElementById(result_id).innerHTML = response;
			},
			error: function(response) { 
				document.getElementById(result_id).innerHTML = "<div class='error_form'><strong>Ошибка при отправке формы</strong></div>";
			}
		});
	}
	return false;
};

/* форма с футтера */
function AjaxFormRequest(result_id,form_id,url) {
	
	var nameval  = $("#name_"+form_id).val();
	var namelen  = nameval.length;
	var phoneval  = $("#contacts_"+form_id).val();
	var phonelen  = phoneval.length;
	
	if(namelen <= 2 || nameval == '' || nameval == 'Ваше имя')
	{
		alert ( "Укажите Ваше имя" );
	} else {
		if(phonelen <= 5 || phoneval == '' || phoneval == 'Ваш номер телефона')
		{
			alert ( "Укажите Ваш номер телефона" );
		} else {
			jQuery.ajax({
				url: url,
				type: "POST",
				dataType: "html",
				data: jQuery("#"+form_id).serialize(),
				success: function(response) {
					document.getElementById(result_id).innerHTML = response;
				},
				error: function(response) { 
					document.getElementById(result_id).innerHTML = "<div class='error_form'><strong>Ошибка при отправке формы</strong></div>";
				}
			});
		}
	
    }
	return false;
};


