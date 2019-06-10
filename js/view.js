let view = {
	createTable: function(elem, i) {
	
		let tbody = document.getElementById("tbody"),
			numberItem =  view.createElement("th", {textContent: i}),
			itemTitle =  view.createElement("td", {className: "item_title", textContent: elem.itemTitle}),
	
			btnMinus =  view.createElement("button", {type: "button", className: "btn_control minus", datasetItem: "minus"}),
			inputControl =  view.createElement("input", {type: "text", value: elem.itemCount, className: "item_count", datasetItem: "input"}),
			btnPlus =  view.createElement("button", {type: "button", className: "btn_control plus", datasetItem: "plus"}),
			itemControl =  view.createElement("td", {className: "item_control"}, btnMinus, inputControl, btnPlus),
	
			itemUnit =  view.createElement("td", {className: "item_unit", innerHTML: elem.itemUnit}),
	
			itemPriceSpan =  view.createElement("span", {textContent: elem.itemPrice}),
			itemPrice =  view.createElement("td", {className: "item_price"}, itemPriceSpan),
	
			itemTotalAmountSpan =  view.createElement("span", {textContent: elem.itemTotalPrice}),
			itemTotalAmount =  view.createElement("td", {className: "item_total_amount"}, itemTotalAmountSpan),
			
	
			trItem =  view.createElement("tr", {dataset: elem.id}, numberItem, itemTitle, itemControl, itemUnit, itemPrice, itemTotalAmount);
			tbody.appendChild(trItem);
	},
	createElement: function(tag, props, ...children) {

		let element = document.createElement(tag);
	
		Object.keys(props).forEach(el => {
			element[el] = props[el];
	
			if(el === "dataset") {
				element[el].id = props[el];
			}
	
			if(el === "datasetItem") {
				element.dataset.item = props[el];
			}

			if(el === "datasetCart") {
				element.dataset.cart = props[el];
			}
		});
	
		if(children.length) {
			children.forEach(child => {
				element.appendChild(child);
			})
		}
	
		return element;
	},
	createHeaderCart: function(itemId, obj) {
	
		let cartList = document.querySelector(".header_cart .cart_list");
	
		if(cartList.firstChild){
			let cartItem = cartList.querySelector("[data-id='" + itemId + "']");
			/*if(!cartItem) {
				createCartItem(itemId);
			} */
		
			if(cartItem) {
				cartItem.querySelector(".item_count").value = obj.itemCount;
				cartItem.querySelector(".item_total_amount").textContent = obj.itemTotalPrice;
			} else {
				this.createCartItem(obj); 
			}
		} else {
			this.createCartItems();
			this.createCartItem(obj);
		} 
	},
	createCartItems: function() {

		/*let cartHeader = document.querySelector(".header_cart"),
			carItems = this.createElement("li", {className: "cart_items"}),
	
			linkBtnOrder = this.createElement("a", {href: "#", textContent: "Перейти к оформлению"}),
			cartBtnOrder = this.createElement("li", {className: "cart_btn_order"}, linkBtnOrder),
	
			cartList = this.createElement("ul", {className: "cart_list"}, carItems, cartBtnOrder);
		/*	cartList.addEventListener("click", cartItemCounter, false);*/
		/*	cartHeader.appendChild(cartList);*/
		let cartList = document.querySelector(".cart_list"),
			carItems = this.createElement("li", {className: "cart_items"}),
			linkBtnOrder = this.createElement("a", {href: "#", textContent: "Перейти к оформлению"}),
			cartBtnOrder = this.createElement("li", {className: "cart_btn_order"}, linkBtnOrder);
	
			cartList.appendChild(carItems);
			cartList.appendChild(cartBtnOrder);
	},
	createCartItem: function(obj) {

		let listCategory = {
			"building": "Демонтаж зданий",
			"partition": "Демонтаж перегородок",
			"ceiling": "Демонтаж потолка",
			"floor": "Демонтаж пола",
			"plumbing": "Демонтаж сантехнки",
			"electric": "Демонтаж электрики",
			"aperture": "Вырезка проемов",
			"garbage": "Вывоз мусора"
		}
	
		let cartItemPrice = view.createElement("div", {className: "item_price", textContent: obj.itemPrice}),

			btnMinus =  view.createElement("button", {type: "button", className: "btn_control minus", datasetItem: "minus"}),
			inputControl =  view.createElement("input", {type: "text", value: obj.itemCount, className: "item_count", datasetItem: "input"}),
			btnPlus =  view.createElement("button", {type: "button", className: "btn_control plus", datasetItem: "plus"}),
			cartItemControl = view.createElement("div", {className: "item_control"}, btnMinus, inputControl, btnPlus),

			cartItemTotalPrice = view.createElement("div", {className: "item_total_amount", textContent: obj.itemTotalPrice}),
			
			cartParams = view.createElement("div", {className: "cart_params"}, cartItemPrice, cartItemControl, cartItemTotalPrice),
			cartItemTitle = view.createElement("p", {innerHTML: obj.itemTitle + ", "+ obj.itemUnit}),
			cartItemRemove = view.createElement("div", {className: "item_remove", textContent: "x", datasetItem: "remove"}),
	
			cartItems = document.querySelector(".header_cart .cart_items"),
			carItem = view.createElement("div", {className: "cart_item", dataset: obj.id}, cartItemTitle, cartParams, cartItemRemove);

			isCartCategory = cartItems.querySelector("[data-cart="+ obj.category + "]");
			if(!isCartCategory) {
				cartCategory = view.createElement("div", {datasetCart: obj.category});
				cartCategory.innerHTML = "<p>" + listCategory[obj.category] + "</p>";
				cartItems.appendChild(cartCategory);
				cartCategory.appendChild(carItem);
			} else {
				isCartCategory.appendChild(carItem);
			}
			
			
	},
	removeCartItem: function(id) {

	/*	let cartList = document.querySelector(".header_cart .cart_list");
	
		if(cartList) {
			let cartItems = cartList.querySelector(".cart_items"),
				countCartItem = cartItems.querySelectorAll(".cart_item").length,
				cartItem = cartItems.querySelector("[data-id='" + id + "']");
	
			if(cartItem) {
				if(countCartItem === 1){
					cartList.classList.remove("active");
					cartList.innerHTML = "";
				} else if (countCartItem > 1 ) {
					cartItems.removeChild(cartItem);
				}
			}
		}*/
		let cartList = document.querySelector(".header_cart .cart_list");
		if(cartList) {
			let cartItems = cartList.querySelector(".cart_items"),
				cartItem = cartItems.querySelector("[data-id='" + id + "']");
				category = cartItem.parentElement,
				countCartItem = category.querySelectorAll(".cart_item").length;

			if(countCartItem === 1){
				cartItems.removeChild(category);
			} else if (countCartItem > 1 ) {
				category.removeChild(cartItem);
			}

			if(!cartItems.firstChild){
				cartList.classList.remove("active");
				cartList.innerHTML = "";
			}
		}

	},
	updateData: function(id, data) {
		let tbody = document.getElementById("tbody"),
			item = tbody.querySelector("[data-id='" + id + "']");
			if(item) {
				item.querySelector(".item_count").value = data.itemCount;
				item.querySelector(".item_total_amount span").textContent = data.itemTotalPrice;
			}	
	},
	counterPlus: function(counter, value) {
		/*e.target.previousSibling.value = +(e.target.previousSibling.value) + 1; 
		return e.target.previousSibling.value; */
		/*return counter.previousSibling.value = value;*/
	},
	counterMinus: function(e, itemId) {
	/*	
		let eln = e.target.nextSibling;
		return eln.value = Math.max(--eln.value, 0) || removeCartItem(itemId) || 0;
	*/},
	totalAmountTable: function(itemId, totalPrice) {
	/*	let tbody = document.getElementById("tbody"),
			item = tbody.querySelector("[data-id='" + itemId + "']"),
			itemPrice = item.querySelector(".item_price span").textContent,
			totalAmount = item.querySelector(".item_total_amount span");
			totalAmount.textContent = totalPrice;*/
	},
	countingServicesCart: function () {
		let countCartItem = document.querySelectorAll(".header_cart .cart_item").length,
			ItemTotalAmount = document.querySelectorAll(".header_cart .item_total_amount"),
			totalAmount = document.querySelector(".header_cart .total_amount"),
			quantityServices = document.querySelector(".header_cart .quantity_services");
		console.log(countCartItem);
		function declension(num, expressions) {
			var result;
			count = num % 100;
	
			if (count >= 5 && count <= 20) {
				result = expressions['2'];
			} else {
				count = count % 10;
				if (count == 1) {
					result = expressions['0'];
				} else if (count >= 2 && count <= 4) {
					result = expressions['1'];
				} else {
					result = expressions['2'];
				}
			}
			return result;
		}
	
		quantityServices.innerHTML = countCartItem + declension(countCartItem, [' услуга',' услуги',' услуг']) 
	
		let arr = [];
	
		ItemTotalAmount.forEach(elem => {
			arr.push(+elem.textContent) ;
		});

		if(arr.length > 0) {
			ItemTotalAmount = arr.reduce((one, two) => one + two);
			totalAmount.textContent = ItemTotalAmount + " ₽";
		} else {
			totalAmount.textContent = 0 + " ₽";
		}
	}
}







