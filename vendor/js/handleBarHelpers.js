Handlebars.registerHelper('trim', function(passedString) {
    
    if(passedString.length > 150){
    	var theString = passedString.substring(0,150);
    	 theString = theString+"...";

    }else{
    	theString = passedString;
    }
    
    return new Handlebars.SafeString(theString)
});
