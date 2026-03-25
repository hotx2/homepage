$(".dark-btn").click(
    function(){
        $(".box").toggleClass("dark");
        $(".container").toggleClass("dark");
    }
);
/* $ = signifies jQuery */

$(".spin-btn").click(
    function(){
        $(".box").toggleClass("spin");

    }
);

$(".reveal-btn").click(
    function(){
        $(".animegirl").addClass("show");

        $(".reveal-btn").hide();
    }
);

$(".animegirl").draggable();
/* OR */
$(".draggable").draggable({containment:".container",
    scroll: false
});
