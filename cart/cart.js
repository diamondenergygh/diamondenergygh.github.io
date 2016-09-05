app.get('#/cart', function() {

	 partial = $( "<span></span>" ).load( "cart/cart-partials/cart.html" ,function(){

        data = JSON.parse(sessionStorage.getItem('cart'));

        price = 0;

        for(let key in data )	{
        	price += data[key]['price'];
        	if (!data.hasOwnProperty(key)) { /**/ }

        }
        var source = partial.html();
        var template = Handlebars.compile(source);
        var html = template(data);



        $('#main').html(html);
        $('#cart-total-cost').html("$"+price);


      });
});



app.get('#/checkout', function(appObject) {

		// if(sessionStorage.getItem('devless_user_token'+window.devless_domain_name+window.devless_token) == null ){
		//
		// 		appObject.redirect('#/login');
		// }
		//
		// else{

					partial = $( "<span></span>" ).load( "cart/cart-partials/checkout.html" ,function(){

					data = "";
					var source = partial.html();
			        var template = Handlebars.compile(source);
			        var html = template(data);


			        $('#main').html(html);

					});
		// }




});
