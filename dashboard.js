function onPreActive() {
    $("#pre").toggleClass("active", true);
    $("#post").toggleClass("active", false);

     $("#ul-pre").animate({"left":"0"}, "slow");
     $("#ul-post").animate({"left":"100%"}, "slow"); 
};

function onPostActive() {
    $("#pre").toggleClass("active", false);
    $("#post").toggleClass("active", true);

    $("#ul-post").animate({"left":"0"}, "slow"); 
    $("#ul-pre").animate({"left":"-100%"}, "slow");
    
};