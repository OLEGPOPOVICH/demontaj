function openModalForm (captionForm, ...typeInputs) {
	createOverlayModal();

	var typeInput = [typeInputs.length];

	typeInputs.forEach(function (input, i) {
		typeInput[i] = input;
	});

	createWrapperModal(captionForm);
	createModalForm();
	createInput(typeInput);
	/*createRequiredFields();*/
	createCaptionForm(captionForm);
	createLinkPolicy();
	createBtnForm();
}

function createOverlayModal () {
	let body = document.querySelector("body");
	let overlayModal = document.createElement("div");
		overlayModal.className = "overlay_modal";

	let overlayClose = document.createElement("div");
		overlayClose.className = "overlay_close";

	let overlayCloseIn = document.createElement("div");
		overlayCloseIn.className = "overlay_close_in";

		overlayClose.appendChild(overlayCloseIn);
		overlayModal.appendChild(overlayClose);

		body.appendChild(overlayModal);

	document.querySelector(".overlay_close_in").addEventListener("click", closeModalForm, false);

	setTimeout(overlayModalActive, 200);
}

function overlayModalActive () {
	let overlayModal = document.querySelector(".overlay_modal");
	overlayModal.classList.add("active");
}

function closeModalForm () {
	let body = document.querySelector("body");
	let overlayModal = document.querySelector(".overlay_modal");

	overlayModal.classList.remove("active");

	setTimeout(function () {body.removeChild(overlayModal);}, 500);
}

function createWrapperModal (captionForm) {
	
	let overlayModal = document.querySelector(".overlay_modal");

	let wrModal = document.createElement("div");
		wrModal.className = "wrapper_modal";

	let caption = document.createElement("p");
		caption.textContent = captionForm;

		wrModal.appendChild(caption);
		overlayModal.appendChild(wrModal);
}

function createModalForm () {
	
	let wrModalForm = document.querySelector(".wrapper_modal");

	let form = document.createElement("form");
		form.id = "form_modal";
		form.method = "post";
		form.enctype = "multipart/form-data";
		form.action = "";

	wrModalForm.appendChild(form);
}

function createInput (typeInput) {

	let form = document.querySelector("#form_modal");
	let listInput = {
		name: "Ваше имя",
		phone: "Ваш телефон",
		email: "Ваш e-mail",
		text: "Ваш комментарий"
	}

	for(let i = 0; i < typeInput.length; i++) {

		let wrInput = document.createElement("div");
			wrInput.className = "wrapper_input";

		let titleInput = document.createElement("small");
			titleInput.textContent = listInput[typeInput[i]];

		let wrInputIn = document.createElement("div");
			wrInputIn.className = "wrapper_input_in";

		let input = document.createElement("input");
			input.id = typeInput[i];
			input.className = "input";
			input.type = "text";
			input.setAttribute("name", typeInput[i]);

		wrInput.appendChild(titleInput);
		wrInput.appendChild(wrInputIn);
		wrInputIn.appendChild(input);

		form.appendChild(wrInput);
	}
}

/*
function createRequiredFields () {

	let form = document.querySelector("#form_modal");

	let requiredFields = document.createElement("small");
		requiredFields.className = "required_field";
		requiredFields.textContent = " — обязательные поля";

	form.appendChild(requiredFields);
}
*/

function createCaptionForm (captionForm) {

	let form = document.querySelector("#form_modal");

	let inputHiddenCaption = document.createElement("input");
		inputHiddenCaption.type = "hidden";
		inputHiddenCaption.setAttribute("name", "caption");
		inputHiddenCaption.value = captionForm;

	
	form.appendChild(inputHiddenCaption);

	if(captionForm == "Узнать цену товара") {
		let inputHiddenName = document.createElement("input");
			inputHiddenName.type = "hidden";
			inputHiddenName.setAttribute("name", "subject");
			inputHiddenName.value = document.title;

		form.appendChild(inputHiddenName);
	}
}

function createLinkPolicy () {

	let form = document.querySelector("#form_modal");

	/*let wrapperPolicy = document.createElement("div");
		wrapperPolicy.className = "policy_checkbox";
		wrapperPolicy.textContent = "Оставляя заявку, вы принимаете ";*/

	let linkPolicy = document.createElement("a");
		linkPolicy.className = "polit";
		linkPolicy.href = "/politics/";
		linkPolicy.target = "_blank";
		linkPolicy.textContent = "Политика конфиденциальности и защиты информации";
	
	form.appendChild(linkPolicy);
}

function createBtnForm () {

	let form = document.querySelector("#form_modal");

	let wrBtnForm = document.createElement("div");
		wrBtnForm.className = "wrapper_btn_form";

	let btnShadow = document.createElement("div");
		btnShadow.className = "btn_shadow";

	wrBtnForm.appendChild(btnShadow);

	let btnForm = document.createElement("button");
		btnForm.className = "btn_form";
		btnForm.id = "btn_form";
		btnForm.textContent = "Оставить заявку";

	wrBtnForm.appendChild(btnForm);
	form.appendChild(wrBtnForm);

	scriptsForm();
	maskaInput();
}

$("body").on("submit", "#form_modal", function(event) {
    /*e.preventDefault();*/
    event.preventDefault();
	event.currentTarget.querySelector("button").disabled = 1;
	var btnName = event.currentTarget.querySelector("button").textContent;
	event.currentTarget.querySelector("button").textContent = "Проверка формы...";

    $.ajax({
        url: "/modal-form.php",
	    data: jQuery('#form_modal').serialize(),
        type: "POST",
        dataType: "html", //Тип данных
        beforeSend: function() {
			event.currentTarget.querySelector("button").disabled = 1;
			event.currentTarget.querySelector("button").textContent = "Проверка формы...";
		},
        success: function(data) {

			let param =  data.replace(/^\s+|\s+$/g, "");
		
			if (param == "errorForm") {
				errorForm();
			} else if(param != ""){ 
				spasibo(param);
			} else if(param == ""){ 
				alert("произошла ошибка 1");
			} else { 
				alert("произошла ошибка 2");
			}
        },
        complete: function () {
			event.currentTarget.querySelector("button").disabled = 0;
			event.currentTarget.querySelector("button").textContent = btnName;
		},
        error: function(data) 
		{ 
		    console.log(data);
			alert("произошла ошибка");
		}
    })
});

function scriptsForm() {

	function btnFormAction() {
		for(let i = 0; i < input.length; i++) {
			if (input[i].value == '') {	
				input[i].classList.add('invalid');
			} 
		}
	}

	function inputChaing(event) {

		var element = event.target;
	
	    if (element.id == 'name') {
	    	if (element.value.length > 1) {
	    		element.classList.remove('invalid');
		        element.classList.add('valid');
		    } else {
		    	element.classList.remove('valid');
		    	element.classList.add('invalid');
		    }
	    }
		if (element.id == 'phone') {
	    	if (element.value.length > 16) {
		        element.classList.remove('invalid');
		        element.classList.add('valid');
		    } else {
		    	element.classList.remove('valid');
		    	element.classList.add('invalid');
		    }
	    }
	    if (element.id == 'email') {
	    	if (element.value.length > 8) {
		        element.classList.remove('invalid');
		        element.classList.add('valid');
		    } else {
		    	element.classList.remove('valid');
		    	element.classList.add('invalid');
		    }
	    }
	}

	var btnForm = document.querySelector("#btn_form");
		btnForm.addEventListener("click", btnFormAction, false);

	var input = document.querySelectorAll(".wrapper_input input");

	for (let i = 0; i < input.length; i++) {
		input[i].addEventListener("keyup", inputChaing, false);
	}
}

function errorForm() {

	var input = document.querySelectorAll(".wrapper_input input");

	for(let i = 0; i < input.length; i++) {

		var element = input[i];
			
		if (element.id == 'name') {
			if (element.value == '') {
				errorMessage(i, "обязательное поле");
			}
			if (element.value != '') {
				if (element.value.length < 2) {
					errorMessage(i, "некорректное имя");
				} 
			}
		}

		if (element.id == 'phone') {
			if (element.value == '') {
				errorMessage(i, "обязательное поле");
			} 
			if (element.value != '') {
				if (element.value.length < 17) {
					errorMessage(i, "некорректный телефон");
				}
			}
		}
		
		if (element.id == 'email') {
			if (element.value == '') {
				errorMessage(i, "обязательное поле");
			}
			if (element.value != '') {
				if (!validateEmail(element.value)) {
					errorMessage(i, "некорректный email");
				} 
			}
	    }   
	}
}

function errorMessage(i, text) {

	let wrapperInputIn = document.querySelectorAll(".wrapper_input_in");
	
	let b = document.createElement("b");
		b.className = "error-message";
		b.textContent = text;

		if(!(wrapperInputIn[i].querySelector(".error-message"))) {
			wrapperInputIn[i].appendChild(b);
		}
		
	var input = document.querySelectorAll(".wrapper_input input");	

	input[i].addEventListener("focus", removeErrorMessage, false);
}

function removeErrorMessage(){

	let wrapperInputIn = document.querySelectorAll(".wrapper_input_in");
	var input = document.querySelectorAll(".wrapper_input input");

	for (let i = 0; i < input.length; i++) {
		
		var element = wrapperInputIn[i];
		var errorMessage = element.querySelector(".error-message");
		
		if(element.querySelector(".error-message")) {
			element.removeChild(errorMessage);
			input[i].removeEventListener("focus", removeErrorMessage, false);
		}
	}
}

function spasibo (data) {

	let overlayModal = document.querySelector(".overlay_modal");
	let wrModalForm = document.querySelector(".wrapper_modal");

	overlayModal.removeChild(wrModalForm);

	let wrSpasibo = document.createElement("div");
		wrSpasibo.className = "wrapper_spasibo";
		
		wrSpasibo.innerHTML = data;

	overlayModal.appendChild(wrSpasibo);
}

function validateEmail(email) {
	var pattern  = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})$/;
	return pattern.test(email);
}

var maskaInput = function () {
	var keyCode;
		
	function mask(event) {
		event.keyCode && (keyCode = event.keyCode);
		var pos = this.selectionStart;
		if (pos < 3) event.preventDefault();
		var matrix = "+7-(___)-___-____",
			i = 0,
			def = matrix.replace(/\D/g, ""),
			val = this.value.replace(/\D/g, ""),
			new_value = matrix.replace(/[_\d]/g, function(a) {
				return i < val.length ? val.charAt(i++) || def.charAt(i) : a
			});
		i = new_value.indexOf("_");
		if (i != -1) {
			i < 5 && (i = 3);
			new_value = new_value.slice(0, i)
		}
		var reg = matrix.substr(0, this.value.length).replace(/_+/g,
			function(a) {
				return "\\d{1," + a.length + "}"
			}).replace(/[+()]/g, "\\$&");
		reg = new RegExp("^" + reg + "$");
		if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
		if (event.type == "blur" && this.value.length < 5)  this.value = ""
	}	
	
	var input = document.querySelector(".wrapper_modal #phone");
	
	input.addEventListener("input", mask, false);
	input.addEventListener("focus", mask, false);
	input.addEventListener("blur", mask, false);
	input.addEventListener("keydown", mask, false);
}