
let controller = {
	handlerDataUpload: function() {

		let dataLS = model.dataUploadLS();
		/*let data = model.getLocalStorage("cart");
		let cartData = model.setCartItem(data);*/

		let category = document.querySelector(".menu_section .active");
		if(category) {
			category = category.dataset.category
			model.dataUpload(category).then(function() {
				console.log(arguments[0]);
				arguments[0].forEach((elem,i) => {
					view.createTable(elem, i+1);
				});
				if(dataLS){
					for(let id in dataLS) {
						view.createHeaderCart(id, model.getItem(id));
					}
					view.countingServicesCart();
				}
			});
		}
	
	},

	handlerHeaderCart: function() {
		let cartList = document.querySelector(".header_cart .cart_list");
	
		if(cartList.firstChild) {
			cartList.classList.toggle("active");
		}
	},
	findElem: function(counter) {
		let item = counter.parentElement;
		if(item.dataset.id) {
			return item.dataset.id;
		} else {
			return controller.findElem(item);
		}
	},
	handlerDataChanges: function(e) {
		let counter = e.target,
			dataItem = counter.dataset.item,
			itemId = null,
			newData = {};

		if(dataItem) {
			itemId = controller.findElem(counter)
		}

		switch(dataItem) {
			case "plus":
				newData = model.updateData("plus", itemId);
				view.updateData(itemId, newData);
				model.updateLocalStorage(itemId);
				view.createHeaderCart(itemId, model.getItem(itemId));
				view.countingServicesCart();
			break;
			case "minus":
				newData = model.updateData("minus", itemId);
				view.updateData(itemId, newData);
				model.updateLocalStorage(itemId);
				view.createHeaderCart(itemId, model.getItem(itemId));
				if(newData.itemCount == 0) {
					view.removeCartItem(itemId);
				}
				view.countingServicesCart();
			break;
			case "input":	
				controller.checkCounterInput(counter, itemId);
				controller.inputUpdateData(counter, itemId);
			break;
			case "remove":
				newData = model.updateData("remove", itemId);
				view.updateData(itemId, newData);
				model.updateLocalStorage(itemId);
				view.removeCartItem(itemId);
				view.countingServicesCart();
			break;
		}
	},
	handlerTableItemCounter: function(e) {
		let counter = e.target,
			dataItem = counter.dataset.item,
			itemId = null,
			newData = {};

		if(dataItem) {
			itemId = controller.findElem(counter)
		}

		switch(dataItem) {
			case "plus":
				newData = model.updateData("plus", itemId);
				view.updateData(itemId, newData);
				model.updateLocalStorage(itemId);
				view.createHeaderCart(itemId, model.getItem(itemId));
				view.countingServicesCart();
			break;
			case "minus":
				newData = model.updateData("minus", itemId);
				view.updateData(itemId, newData);
				model.updateLocalStorage(itemId);
				view.createHeaderCart(itemId, model.getItem(itemId));
				if(newData.itemCount == 0) {
					view.removeCartItem(itemId);
				}
				view.countingServicesCart();
			break;
			case "input":	
				controller.checkCounterInput(counter, itemId);
				controller.inputUpdateData(counter, itemId);
			break;
		}
	},
	counterInputTable: function(counter, itemId) {	
	
		counter.addEventListener("keyup", function() {
			let value = this.value,
				totalAmount = view.totalAmountTable(itemId, value);
	
			if(value > 0) {
				view.createHeaderCart(itemId);
				changeInputTable(itemId, value, totalAmount);
				countingServicesCart();
				
			} else if (value === "0"){
				removeCartItem(itemId);
				changeInputTable(itemId, value, totalAmount);
				countingServicesCart();
			}
		});
	},
	checkCounterInput: function(counter, itemId) {
		let value = counter.value;
		counter.addEventListener("input", function() {
			/*let value = e.target.value; 
			let rep = /[^0-9,]/; 
		
			while(rep.test(value)) {
				value = value.substring(0, value.length -1); 
			}
			*/
			counter.value = this.value.replace(/[^0-9]+/g, '');
		});
	
		counter.addEventListener("blur", function() {
			if(counter.value == "") {
				counter.value = value;
			} /*else if(counter.value == 0) {
				removeCartItem(itemId);
				countingServicesCart();
				changeInputCart(itemId, 0, 0);
			}*/
		});
	},
	inputUpdateData: function(counter, itemId) {	
		counter.addEventListener("keyup", function(e) {
			let value = e.target.value,
				newData = {};
			/*	totalAmount = totalAmountCart(itemId, value);*/
				
		
			if(value > 0) {
				newData = model.updateData("input", itemId, +value);
				view.updateData(itemId, newData);
				model.updateLocalStorage(itemId);
				view.createHeaderCart(itemId, model.getItem(itemId));
				view.countingServicesCart();


			/*	changeInputCart(itemId, value, totalAmount);
				countingServicesCart();*/
			} else if (value === "0"){
				newData = model.updateData("input", itemId, +value);
				view.updateData(itemId, newData);
				model.updateLocalStorage(itemId);
				view.removeCartItem(itemId);
				view.countingServicesCart();
			}
		});
	}
};

(function(){
	let start = {
		init: function() {
			this.main();
			this.control();
			this.event();
		},
		main: function() {

		},
		control: function() {
			controller.handlerDataUpload();
		},
		event: function() {
			let cartBtn = document.querySelector(".header_cart .cart_btn");
			if(cartBtn) {
				cartBtn.addEventListener("click", controller.handlerHeaderCart, false);	
			}

			let tbody = document.getElementById("tbody");
			if(tbody) {
				/*table.addEventListener("click", controller.handlerTableItemCounter, false);*/
				tbody.addEventListener("click", controller.handlerDataChanges, false);
			}

			let cartList  = document.querySelector(".header_cart .cart_list");
			if(cartList) {
			/*	cartList.addEventListener("click", controller.handlerCartItemCounter, false);*/
				cartList.addEventListener("click", controller.handlerDataChanges, false);
			}
		}
	};

	start.init();
}());







/*

function changeInputCart(itemId, value, totalAmount) {
	let tbody = document.getElementById("table"),
		item = tbody.querySelector("[data-id='" + itemId + "']");
	if(item) {
		item.querySelector(".item_count").value = value;
		item.querySelector(".item_total_amount span").textContent = totalAmount;
	}
}*/



