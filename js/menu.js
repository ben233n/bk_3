var menu_bang=false;
$(".ham").click(function () { 
    if(menu_bang)
    {
        menu_bang=false;
        $(".nav_ul").css({
            left:"100%"
        })
        
    }
    else
    {
        menu_bang=true;
        $(".nav_ul").css({
            left:"0%"
        })
    }

}


);