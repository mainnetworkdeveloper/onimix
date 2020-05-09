$(
    function () {
        "use strict";

        $(window).scroll(function () {
            if ($(this).scrollTop() > 0) {
                try{
                    waypoint.enable();
                }catch(ex){}
                
            }
        });
        try {
            /* ================ ANIMATED CONTENT ================ */

            var waypoint = new Waypoint({
                element: document.getElementById('statistic'),
                enabled: false,
                handler: function (direction) {
                    if (direction === 'down') {
                        $(this.element).addClass("animate-number");
                        $(this).counterSite();
                    }


                },
                offset: '35%'
            })
        } catch (err) {

        }

    }
);
