var Helper = {

    view: {
        render: function(service=null, view, data) {

            //check if stored view is available
            if(Helper.cache.read('views',view) == undefined) {

                
                //find path to partial 
                if(service == null)  {

                pathToPartial = view+".html";

                }else{

                    pathToPartial = service+"/templates/"+view+".html";
                }

                //get partial over the wire
                $( "<span></span>" ).load(pathToPartial ,function(partial, status, xhr){

                    //cache view
                    if(xhr.status != 0){

                        Helper.cache.write('views',view, partial);

                        r(partial);

                    }else{

                       
                        r('<div class="error_notif" style="margin-top:20%;margin-left:20%">connection was lost ):</div>');
                    }
                   

                });

            }else {

               //get cached view 
               partial = Helper.cache.read('views', view);

               

               r(partial);
                             
            }
            
            function r(partial, type="full"){

            //mix data with view and render
                var template = Handlebars.compile(partial);
                var html = template(data);
                 
                (type == "partial")? $('#main').append(html): $('#main').html(html);
                
                return true;
            }
           
        },
        
},

request:  function(request) {

    url = "http://devless.io/?"+request;
    var queryStart = url.indexOf("?") + 1,
    queryEnd   = url.indexOf("#") + 1 || url.length + 1,
    query = url.slice(queryStart, queryEnd - 1),
    pairs = query.replace(/\+/g, " ").split("&"),
    parms = {}, i, n, v, nv;
    results = {}
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

        parms[n] = nv.length === 2 ? v : null
        
        
    }
    return parms;
},

//cache 
cache: {

   write: function(segment=null, key=null, data) {

        dataStore = JSON.parse(sessionStorage.getItem('dataStore'));

        if(segment == null) {

            dataStore = data;

        }else if(key == null){

            dataStore[segment] = data;

        }else {

            dataStore[segment][key] = data;
        } 

        dataStore = JSON.stringify(dataStore);

        sessionStorage.setItem('dataStore',dataStore);

        return true;

},

   read: function(segment=null, key=null) {

        data = JSON.parse(sessionStorage.getItem('dataStore'));

        if(segment == null) {

            return data;

        }else if(key==null){

             return  data[segment];

        }else{

            return data[segment][key]
        }

   },

   clear: function(segment=null, key=null) {
        if(JSON.parse(sessionStorage.getItem('dataStore')) == null){

            sessionStorage.setItem('dataStore','{"model":{},"views":{}}'); 

        }
        if(segment == null) {

            data = {"model":{},"views":{}}

            


        }else if(key == null) {


            data = JSON.parse(sessionStorage.getItem('dataStore'));

            data[segment] = {};

            
        }else{

            data = JSON.parse(sessionStorage.getItem('dataStore'));
            data[segment][key] = {};
        }

        cache = JSON.stringify(data);

        sessionStorage.setItem('dataStore',cache);

        return true;

    
    },
},

init: function() {

        this.cache.clear("views");
        
},

loading: function(loader='<div id="loader" style="margin-top:20%"><center><h1> processing... </center></div>') {

         $('#main').html(loader);     
    
     },

login: function(successfulFunction, failedFunction) { 

},   

}

Helper.init();  






