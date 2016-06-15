
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

    
    

    Devless.queryData("products","inventory",function(response){


      partial = $( "<div></div>" ).load( "products/products-partials/products.html" ,function(){
        data = response.payload;
        console.log(data);
        delete data['related'];
        delete data['count'];

        sessionStorage.setItem('products',JSON.stringify(data));
        var source = partial.html();
        var template = Handlebars.compile(source);
        var html = template(data);
        
        if(data[0] == undefined){html = "<br><br><br><br><br><br><br><br><br><br><center><h1>No products available :(</h1></center><br><br><br><br><br><br><br><br><br>";}
        $('#main').html(html);


      });


    });


    if(sessionStorage.getItem('category') == null){
          Devless.queryData("products","category",function(response){

            data = response.payload;
            sessionStorage.setItem('category',JSON.stringify(data));
          });
  }

  });

