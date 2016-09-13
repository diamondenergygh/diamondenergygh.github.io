
//display specific product
app.get('#/details/:id', function() {

  id = this.params['id'];

  if(sessionStorage.getItem('products') !== null){


    products = JSON.parse(sessionStorage.getItem('products'));
  }
  else{


   Devless.queryData("products","products",function(response){
    data = response.payload;
    delete data['related'];

    sessionStorage.setItem('products',JSON.stringify(data));
    products = JSON.parse(sessionStorage.getItem('products'));

  });

 }

 partial = $( "<div></div>" ).load( "products/products-partials/product-details.html" ,function(){

  categories = JSON.parse(sessionStorage.getItem('category'));


  productCategoryId = products[id]['category'];

  for (let key in categories) {
          if (!categories.hasOwnProperty(key)) { /**/ }

          if(categories[key].id == productCategoryId){
              products[id]['category'] = categories[key]['name'];
              products[id]['sku'] = categories[key]['sku'];
              products[id]['tags'] = categories[key]['tags'];
          }

      }



  data = products[id];
  var source = partial.html();
  var template = Handlebars.compile(source);
  var html = template(data);
  $('#main').html(html);

});



});


//display all products

app.get('#/', function() {

  var data = null;

  var xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    var info = JSON.parse(this.responseText).payload.results;
    partial = $( "<div></div>" ).load( "products/products-partials/products.html" ,function(){
      console.log(info);
      sessionStorage.setItem('products',JSON.stringify(info));
      var source = partial.html();
      var template = Handlebars.compile(source);
      var html = template(info);
      if(info[0] == undefined){html = "<br><br><br><br><br><br><br><br><br><br><center><h1>No products available </h1></center><br><br><br><br><br><br><br><br><br>";}
      $('#main').html(html);
    });
  }
  });

  xhr.open("GET", "https://instance2.devless.io:443/api/v1/service/products/db?table=inventory");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.setRequestHeader("devless-token", "399800b2a3edc342a9136700f8c22d3d");
  xhr.setRequestHeader("devless-key", "TEMPORAL-APP-KEY");

  xhr.send(data);

    // Devless.queryData("products","inventory",function(response){

      // partial = $( "<div></div>" ).load( "products/products-partials/products.html" ,function(){
        // data = response.payload.results;
        // console.log(data);

        // sessionStorage.setItem('products',JSON.stringify(data));
        // var source = partial.html();
        // var template = Handlebars.compile(source);
        // var html = template(data);

        // if(data[0] == undefined){html = "<br><br><br><br><br><br><br><br><br><br><center><h1>No products available :(</h1></center><br><br><br><br><br><br><br><br><br>";}
        // $('#main').html(html);


      // });


    // });


    if(sessionStorage.getItem('category') == null){
          Devless.queryData("products","category",function(response){

            data = response.payload;
            sessionStorage.setItem('category',JSON.stringify(data));
          });
  }

  });



app.post('#/orders', function(data){
  //data = this.params;
  console.log("i am params",this.params);
  Devless.addData("orders","orders", function(response){
    console.log("orders table",response);
    Cart.clearCart();
      alert("order has been placed successfully");
      window.location = "#/";

  }, data);
})
