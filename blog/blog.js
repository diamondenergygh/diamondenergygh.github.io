//load blog page 
app.get('#/blog', function() {
		// Helper.loading();

		var data;
		
		Devless.queryData("blog","blog", function(response){
			data = response.payload.results;
			console.log(data);
      		Helper.view.render("blog","index", data);
    	});
});



     