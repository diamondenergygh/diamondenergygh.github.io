

      var app = $.sammy('#main', function() {
        this.debug = true;
        var form_fields = null;

        // this.get('#/', function() {
        //   this.app.swap('Click form!');
        // });

        this.get('#/redirect', function() {
          this.redirect('#/');
        });

        
        this.post('#/pretend/post/url', function() {
          form_fields = this.params;
          this.log($.param(form_fields.toHash()));
          this.redirect('#/display');
        });

        this.get('#/display', function() {
          if (form_fields) {
            this.app.swap(form_fields.toHTML());
          } else {
            this.redirect('#/form')
          }
        });



      });

      $(function() {
        app.run('#/');

      });


var Cart = {
	addProduct: function(productId) {

		//instantiate cart if empty
		if(sessionStorage.getItem('cart') == null){

			cart =[]
			sessionStorage.setItem('cart',"[]");

		}else{

			cart = JSON.parse(sessionStorage.getItem('cart'));
			
		}


		products = JSON.parse(sessionStorage.getItem('products'));
		order = {}
		var quantity = $(".qty").val();
		
    	for (let key in products) {
          			if (!categories.hasOwnProperty(key)) { /**/ }

			          if(products[key].id == productId){
			            order.name = products[key]['name'];
			            order.category = products[key]['category'];
			          	order.price = parseInt(products[key]['price']) * quantity;
			          	order.quantity = quantity;
			            order.description = products[key]['description'];
			            order.productId = products[key].id

			            cart.push(order);
						
			            break;  
         			 } 
            
      			}
    	
		
		cart = JSON.stringify(cart);
		Cart.updateBucket(cart);
		
		
		
		
		
		//each product gets a slot
	//content pair product includes product name , total price , product description, category user_token 

	//submit to orders  
	},

	removeProduct: function() {

	},

	updateViews: function(sign) {
		if(sign == "plus"){

			var num = +$(".qty").val() + 1;
			$(".qty").val(num);

		}else if(sign == "minus" && ($(".qty").val())-1 > 0) {

			var num = +$(".qty").val() - 1;
			$(".qty").val(num);
		}
		
		

	},

	updateBucket: function(cart){
		cartobj =  JSON.parse(cart);
		
		totalCost = 0;
		$("#item-count").html(cartobj.length);

		for (let key in cartobj) {
			
			totalCost += parseInt(cartobj[key].price); 
		}

		sessionStorage.setItem('cart',cart);

	},
	bucket: function() {

		if(sessionStorage.getItem('cart') != null){
		cartStr = sessionStorage.getItem('cart');
		cartobj =  JSON.parse(cartStr);
		$("#item-count").html(cartobj.length);
		data  = cartobj;
		totalCost = 0;
		for (let key in cartobj) {
			
			totalCost += parseInt(cartobj[key].price); 
		}
		// console.log("total cost",totalCost);
		// partial = $( "<div></div>" ).load( "orders/orders-partials/side-cart.html" ,function(partial){

		// 		var template = Handlebars.compile(partial);
		//   		var html = template(data);
		//   		console.log(data);
		//   		$('.product-log').html(html);
		//   		$('#total-price').html("$"+totalCost);
  // 		});
	}	

	},
	clearCart: function() {

		sessionStorage.setItem('cart',null);

	},


	placeOrder: function() {

			window.orders = {};
	Devless.getProfile(function(profile){

		window.orders['customer'] = profile.payload[0].username;
		window.orders['city'] = "accra";
		window.orders['address'] = "p.o.box 3179 kn accra";

		products = sessionStorage.getItem('cart');
		products = JSON.parse(products);
	
		for(let key in products) {
					for(let key2 in products[key])	{
							if(key2 == "name"){
							window.orders['product'] = products[key]['name'];
						}
						else if(key2 == "category" || key2 == "description"  || key2 == "productId") {

						}
						else{
							
							window.orders[key2] = products[key][key2];
						}
					
							
					}

					
					//add from here
					Devless.addData("orders","orders",function(response){

						console.log(response)
						if(response.status_code == 609){

							Cart.clearCart();	
							alert("order has been placed successfully");
							window.location = "#/";
						}
						


					},window.orders);

					
		}
		

	});


	},


}

Cart.bucket();




   