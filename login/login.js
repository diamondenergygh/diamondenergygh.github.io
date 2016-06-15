    app.get('#/login', function() {

    	 partial = $( "<span></span>" ).load( "login/login-partials/login.html" ,function(){
            
            data = "";

            var source = partial.html();
            var template = Handlebars.compile(source);
            var html = template(data);
            	
            	

            $('#main').html(html);
            

          });
    });




    app.post('#/login', function(appObj) {
      form_fields = this.params;

        data = parseURLParams("http://localhost:3030/?"+$.param(form_fields.toHash()));

        console.log("details", data.email[0],data.password[0]);

        Devless.logIn("email",data.email[0],data.password[0], function(response) {

            console.log(response);

            if(response.status_code == 1000){

                
                appObj.redirect('#/checkout');

            }else{

                console.log("could not login");    
                app.redirect('#/login');
            }
            

        });
      
    });



    function parseURLParams(url) {
        var queryStart = url.indexOf("?") + 1,
            queryEnd   = url.indexOf("#") + 1 || url.length + 1,
            query = url.slice(queryStart, queryEnd - 1),
            pairs = query.replace(/\+/g, " ").split("&"),
            parms = {}, i, n, v, nv;

        if (query === url || query === "") {
            return;
        }

        for (i = 0; i < pairs.length; i++) {
            nv = pairs[i].split("=");
            n = decodeURIComponent(nv[0]);
            v = decodeURIComponent(nv[1]);

            if (!parms.hasOwnProperty(n)) {
                parms[n] = [];
            }

            parms[n].push(nv.length === 2 ? v : null);
        }
        return parms;
    }