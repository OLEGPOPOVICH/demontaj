/*
let model = {
	tableItems: [],
	cartItems: [],
	dataUpload: function(category) {
		return fetch("/db.json").then(response => {
			if(response.status !== 200){
				model.ajaxRepeat(this.url);
			}
			let json = response.json();
			return json;
		}).then((json) => json)
		.catch( () => {
			console.log(arguments);
			model.ajaxRepeat('/db.json');
		});
	},
	ajax: function(url, category, interval) {
		let arr = [];
		let xhr = new XMLHttpRequest();
		xhr.open("GET", url , true);
		xhr.responseType = 'json';
		xhr.timeout = 500;
		xhr.send();
		xhr.onerror = function(){
			ajaxRepeat(url, interval);
		}
		xhr.onload  = function(){
			if(xhr.status != 200) {
				alert(xhr.status + ': ' + xhr.statusText);
			} else {
				let data = xhr.response;
			
				if(category) {
					data.forEach((elem,i) => {
						if(category === elem.category){
							this.tableItems.push(elem);

							arr[i] = elem;
						}
					});
				}
			}
		}.bind(this);
		return arr;
	},
	ajaxRepeat: function (url, interval){
		interval = interval || 100;
		interval += 50;
		interval = Math.min(500, interval);
	
		setTimeout(model.ajax.bind(null, url, interval), interval);
	}
}*/
/*
class Model {
	constructor(state = []) {
		this.state = state;
	}

	getItem(id) {
		return this.state.find(item => item.id == id);
	}

	addItem(item) {
		this.state.push(item);

		return item;
	}

	updateItem(id, data) {
		const item = this.getItem(id);

		Object.keys(data).array.forEach(prop => item[prop] = data[prop]);
	}

	removeItem(id) {
		const index = this.state.findIndex(item => item.id == id);

		if(index > -1) {
			this.state.splice(index, 1);
		}
	}
}

export default Model;*/

let model = {
	tableItems: [],
	cartItems: [],
	dataUploadLS: function() {
		let data = model.getLocalStorage("cart");
		model.cartItems.push(data);
		return data;
	},
	dataUpload: function(category) {
		 return model.ajax('/db.json').then(function(result) {
			model.tableItems = result;
			let cartItems = model.cartItems[0];
			if(cartItems){
				for(let id in cartItems) {
					model.tableItems.forEach(elem => {
						if(elem.id == id){
							elem.itemCount = cartItems[id];
							elem.itemTotalPrice = cartItems[id] * elem.itemPrice;
						}
					})
				}
			}
			let data = [];
			if(category) {
				let count = 0;
				model.tableItems.forEach((elem) => {
					if(category === elem.category){
						data[count] = elem;
						count++;
					}
					
				});
			}
			
			return data;
		},
		function(err) {
			console.log(err);
		});
	},
	ajax: function(url, interval) {
		return new Promise(function(resolve, reject) {

		let xhr = new XMLHttpRequest();
			xhr.open("GET", url , true);
			xhr.responseType = 'json';
			xhr.timeout = 500;

			xhr.onload  = function(){
				if(xhr.status != 200) {
					reject(Error(
						'Произошла ошибка. Код ошибки:' + xhr.statusText
					));
				} else {
					resolve(xhr.response);
				}
			};

			xhr.onerror = function(){
				ajaxRepeat(url, interval);
			}

			xhr.send();
		});
	},
	ajaxRepeat: function (url, interval){
		interval = interval || 100;
		interval += 50;
		interval = Math.min(500, interval);
	
		setTimeout(model.ajax.bind(null, url, interval), interval);
	},
	getLocalStorage: function(key){
		let q = localStorage[key];
		if(!key){
			return;
		}
		if(q){
			if(q.search(/^[{\[].+[}\]]$/g) !== -1){
				try {
					return JSON.parse(q);
				} catch (e) {
					return q;
				}
			} else {
				return {};
			}
		} else {
			return {};
		}
	},
	setLocalStorage: function(key, value){
	
		let y = typeof(value);
		if(y.search(/string|number|bollean/) !== -1){
			localStorage[key] = value;
		}else{
			localStorage[key] = JSON.stringify(value);
		}
		return value;
	},
	updateLocalStorage: function(id) {
		let dataLS = model.getLocalStorage("cart"),
			item = model.getItem(id),
			newData = {};
			
		dataLS[item.id] = item.itemCount;
		
		for(let key in dataLS) {
			if(dataLS[key]) {
				newData[key] = dataLS[key];
			}
		}
	
		model.setLocalStorage("cart", newData);
	},
	
	updateData: function(operation, id, value) {
		switch(operation){
			case "plus":
				return {
					"itemCount": model.counterPlus(id),
					"itemTotalPrice": model.itemTotalPrice(id)
				}
			case "minus":
				return {
					"itemCount": model.counterMinus(id),
					"itemTotalPrice": model.itemTotalPrice(id)
				}
			case "input":
				return {
					"itemCount": model.counterInput(id, value),
					"itemTotalPrice": model.itemTotalPrice(id)
				}
			case "remove":
				return {
					"itemCount": model.counterReset(id, "itemCount"),
					"itemTotalPrice": model.itemTotalPrice(id, "itemTotalPrice")
				}
		}
	},
	getItem: function(id) {
		return model.tableItems.find(item => item.id == id);
	},
	counterPlus: function(id) {
		let item = model.getItem(id);
		return item.itemCount += 1;
	},
	counterMinus: function(id) {
		let item = model.getItem(id);
		return item.itemCount = Math.max(--item.itemCount, 0) || 0;
	},
	counterInput: function(id, value) {
		let item = model.getItem(id);
		return item.itemCount = value;
	},
	itemTotalPrice: function(id) {
		let item = model.getItem(id);
		return item.itemTotalPrice = item.itemPrice * item.itemCount; 
	},
	counterReset: function(id, key) {
		let item = model.getItem(id);
		return item[key] = 0;
	}
}

/*
localStorage.__proto__.set = function(key, value){
	let y = typeof(value);
	if(y.search(/string|number|bollean/) !== -1){
		localStorage[key] = value;
	}else{
		localStorage[key] = JSON.stringify(value);
	}
	return value;
}

localStorage.__proto__.get = function(key){
	let q = localStorage[key];
	if(!key){
		return localStorage;
	}
	if(q.search(/^[{\[].+[}\]]$/g) !== -1){
		try {
			return JSON.parse(q);
		} catch (e) {
			return q;
		}
	}
}
*/
let unloadTable = function() {
	let arr = [];
	let	tbody = document.getElementById("tbody");

	if(tbody) {
		let tr = tbody.querySelectorAll("tr");

		
			tr.forEach(function(elem){
				let obj = {};
				obj.id = elem.getElementsByTagName("th")[0].textContent;
				obj.itemTitle = elem.querySelector(".item_title").textContent;
				obj.itemCount = 0;
				obj.itemUnit = elem.querySelector(".item_unit").innerHTML;
				obj.itemPrice = elem.querySelector(".item_price span").textContent;
			/*	obj.itemSumPrice = elem.querySelector(".cell_price_rez_span").textContent;*/
		
				arr.push(JSON.stringify(obj));
			});
		
		console.log(...arr);
	}
}

unloadTable();