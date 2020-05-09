var app_interval;
$(
    function() {
        
        app_interval = setInterval(
            function(){
                if(App){
                    App.init();
                    clearInterval(app_interval);
                }
            },100
        );

        try{
            //Highlight.init();
        }catch(ex){}    
    
    }
);