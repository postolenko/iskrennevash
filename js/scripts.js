$(document).ready(function() {
    

        var index = $('#toptenpresentsection').index("section");

        var sectionTopTenPresentBefore = document.getElementsByTagName ("section") [index - 1];
        var sectionTopTenPresentAfter = document.getElementsByTagName ("section") [index + 1];
        // document.getElementsByClass("presents-for-party")[0];

        var sectionTopTenPresentHeight = document.getElementById("toptenpresentsection").offsetHeight;

        var coorBefore;
        var coorAfter;

        var positionTop;        

        getPositionPresentSection();

        $(window).resize(function() {
            getPositionPresentSection();
        });

        setTimeout(function() {
            // $(".fadein-image").fadeIn(1000);
            // $(".opacity-img").animate({"opacity": 1},3000);
        }, 700);


        var milk = document.getElementsByClassName("date-milk-pack-box")[0];
        var milkWidth = milk.offsetWidth;
        var milkHeight = milk.offsetHeight;





// Подгрузка формы для входа на сайт

    $("#signin").click(function() {

        $(".content").append("<div class='form'></div>");

        $('.form').load('signin.html', function() {

            $(".form").fadeIn(300);

            $(function() {

                $(".registration-box").css({"top": ($(window).height() - $(".registration-box").outerHeight()) / 2 + "px",
                            "left": ($(window).width() - $(".registration-box").outerWidth()) / 2 + "px"});

                $(".btn-promo").click(function() {

                    if($(".promo-text-field").value == undefined) {

                        $(".promo-text-field").css({"border":"1px solid #ff0000"});


                    } else {

                        // $(".form").fadeOut(150);

                        // setTimeout(function() {

                            $(".form").remove();

                        // }, 1000);

                    }

                });

                $(".page-modal, .close-form").click(function() {

                    // $(".form").fadeOut(150);

                    // setTimeout(function() {

                        $(".form").remove();

                    // }, 1000);

                });
            
            });
           

        });

    });

// Подгрузка формы для вывода формы регистрации

    $("#signup").click(function() {

        $(".content").append("<div class='form'></div>");

        $('.form').load('registration.html', function() {

            $(".form").fadeIn(300);


           $(function() {

                $(".registration-box").css({"top": ($(window).height() - $(".registration-box").outerHeight()) / 2 + "px",
                            "left": ($(window).width() - $(".registration-box").outerWidth()) / 2 + "px"});

                $(".btn-promo").click(function() {

                    if($(".promo-text-field").value == undefined) {

                        $(".promo-text-field").css({"border":"1px solid #ff0000"});


                    } else {

                        // $(".form").fadeOut(150);

                        // setTimeout(function() {

                            $(".form").remove();

                        // }, 1000);

                    }

                });

                $(".page-modal, .close-form").click(function() {

                    // $(".form").fadeOut(150);

                    // setTimeout(function() {

                        $(".form").remove();

                    // }, 1000);

                });
            
            });

        });

    });


// Подгрузка формы для введения промокода

    
    $(".enter-promo-code").click(function() {

        $(".content").append("<div class='form'></div>");

        $('.form').load('promo.html', function() {

            // $(function() {

                $(".form").fadeIn(300);

            // });   
            
            $(function() {

                $(".promo-box").css({"top": ($(window).height() - $(".promo-box").outerHeight()) / 2 + "px",
                                     "left": ($(window).width() - $(".promo-box").outerWidth()) / 2 + "px"});

                $(".btn-promo").click(function() {

                    if($(".promo-text-field").value == undefined) {

                        $(".promo-text-field").css({"border":"1px solid #ff0000"});


                    } else {

                        // $(".form").fadeOut(150);

                        // setTimeout(function() {

                            $(".form").remove();

                        // }, 1000);

                    }

                });

                $(".page-modal").click(function() {

                    // $(".form").fadeOut(150);

                    // setTimeout(function() {

                        $(".form").remove();

                    // }, 1000);

                });
            
            });

        });

    });

// Запрет на выделение элементов на странице

// function disableSelection(target) {
    
//     if (typeof target.onselectstart != "undefined")
//         target.onselectstart=function() {return false;}
//     else if (typeof target.style.MozUserSelect != "undefined") {
//         target.style.MozUserSelect="none";
//     } else {
//         target.onmousedown=function() {
//             return false
//     }

//     target.style.cursor = "default";

// }

// if(document.getElementById("noselect")) {

//     disableSelection(document.getElementById("noselect"));

// }


// Высота молочного продукта

// var accountInfo = document.getElementsByClassName("header")[0];
// var tableHeight = document.getElementsByClassName("table-height")[0];

// var topCoorMilkPack = accountInfo.getBoundingClientRect().bottom;
// var bottomCoorMilkPack = tableHeight.getBoundingClientRect().top;
// var heightMilkPack = Math.round(bottomCoorMilkPack - topCoorMilkPack);

var heightMilkPack = $(document).height() - $(".header").height() - $(".table-height").height() - $(".footer").height();

// console.log(topCoorMilkPack + "   " + bottomCoorMilkPack+"  "+heightMilkPack +"  "+$(document).height());

  $(".milk-pack").css({"height": heightMilkPack + "px",
                       "width": Math.round(heightMilkPack * 0.641) + "px"});

    $(window).resize(function() {

    // topCoorMilkPack = accountInfo.getBoundingClientRect().bottom;
    // bottomCoorMilkPack = tableHeight.getBoundingClientRect().top;
    // heightMilkPack = Math.round(bottomCoorMilkPack - topCoorMilkPack);
    heightMilkPack = $(document).height() - $(".header").height() - $(".table-height").height() - $(".footer").height();

    $(".milk-pack").css({"height": heightMilkPack + "px",
                         "width": Math.round(heightMilkPack * 0.641) + "px"});

    // console.log(topCoorMilkPack + "   " + bottomCoorMilkPack+"  "+heightMilkPack+"  "+$(".date-milk-pack-box").css("height") +"  "+$(document).height());
});




// --------------------------------------


// $(".present-item").mouseover(function() {
//     var indexTooltip = $(this).index();
//     console.log(indexTooltip);

//     $(".tooltip:before:eq("+index+")").height( ($(".tooltip").height() - 22) );

// });


$( ".my-work-image" ).bind( "mouseenter mouseleave", function() {

    indexMasck = $(this).index();

    paddingTop = Math.round( ($(".masck-content:eq(" + indexMasck + ")").outerHeight() - $(".masck-hd:eq(" + indexMasck + ")").outerHeight(true) - $(".masck-description:eq(" + indexMasck + ")").outerHeight(true) ) / 2 );
    
    $(".masck-content:eq(" + indexMasck + ")").css({"padding-top": paddingTop + "px"});

    $( ".masck:eq(" + indexMasck + ")" ).toggleClass( "show-mask" );
    
});


// --------------------------------------

    function getPositionPresentSection() {

        // coorBefore = sectionTopTenPresentBefore.getBoundingClientRect().bottom;
        // coorAfter = sectionTopTenPresentAfter.getBoundingClientRect().top;

        // positionTop = (coorAfter - coorBefore - sectionTopTenPresentHeight)/2;

        // $("#toptenpresentsection").css({"top" : positionTop + "px"});
        
    }

});