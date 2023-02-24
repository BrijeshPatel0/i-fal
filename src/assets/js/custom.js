

// $(document).ready(function() {
//     $(".navbar-toggler").click(function() {
//         $('html').toggleClass('show-menu');
//     });
   
//     function scrolling(){
// 	    var sticky = $('header'),
// 	        scroll = $(window).scrollTop();

// 	    if (scroll >= 15) sticky.addClass('fixed');
// 	    else sticky.removeClass('fixed');
// 	};
// 	scrolling();
// 	$(window).scroll(scrolling);

    // hide #back-top first
    // $("#myBtn").hide();

    // fade in #back-top
    // $(function() {
    //     $(window).scroll(function() {
    //         if ($(this).scrollTop() > 100) {
    //             $('#myBtn').fadeIn();
    //         } else {
    //             $('#myBtn').fadeOut();
    //         }
    //     });

    //     // scroll body to 0px on click
    //     $('#myBtn').click(function() {
    //         $('body,html').animate({
    //             scrollTop: 0
    //         }, 1000);
    //         return false;
    //     });
    // });

// });


$('.menu').click (function(){
  $(this).toggleClass('open');
});


// login profile


 function previewFile() {
  var preview = document.querySelector('#profile-image1');
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.addEventListener("load", function () {
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}
                      $(function() {
            $('#profile-image1,#profile-image2').on('click', function() {
                $('#profile-image-upload').click();
            });
        });
        


$('.timeselect li').on('click', function(){
    $('.btnbook').toggleClass('active');
});
$('.timeselect li').on('click', function(){
    $('.firstlession').toggleClass('active');
});

$('.timeselect li').on('click', function(){
    $('.sesstiondetail').addClass('active').siblings().removeClass('active');
});




// $('.packagesec .row .col-lg-3').on('click', function(){
//     $(this).addClass('active').siblings().removeClass('active');
// });

$('.timeselect li').on('click', function(){
    $(this).addClass('active').siblings().removeClass('active');
});


$('#video').owlCarousel({
    loop: true,

    nav: true,
    dots: false,
    autoplay: false,
    autoplayHoverPause: false,
    smartSpeed: 1000,
    items: 3,

    navText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"],

    responsive: {
        0: {
            items: 1.5,
           margin:14,
        },
        576: {
            items: 2,
           margin:14,
        },
        1200: {
            items: 3,
           margin:24,
        },
        1440: {
            items: 3,
           margin:34,
        },
        1600: {
            items: 3,
           margin:44,
        }
    }
})


$('#slidertest').owlCarousel({
    loop: true,

    nav: true,
    dots: false,
    autoplay: false,
    autoplayHoverPause: false,
    smartSpeed: 1000,
    items: 4,

    navText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"],

    responsive: {
        0: {
            items: 1.5,
           margin:14,
        },
        576: {
            items: 3,
           margin:14,
        },
           992: {
            items: 3,
           margin:14,
        },
        1200: {
            items: 4,
           margin:14,
        },
        1440: {
            items: 4,
           margin:14,
        },
        1600: {
            items: 4,
           margin:24,
        }
    }
})


$('#profile').owlCarousel({
    loop: true,
margin:44,
    nav: true,
    dots: false,
    autoplay: false,
    autoplayHoverPause: false,
    smartSpeed: 1000,
    items: 1,
    navText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"],

});


$(function() {
  var list = $('.js-dropdown-list');
  var link = $('.js-link');
  link.click(function(e) {
    e.preventDefault();
    list.slideToggle(200);
  });
  list.find('li').click(function() {
    var text = $(this).html();
    var icon = '<i class="fa fa-chevron-down"></i>';
    link.html(text+icon);
    list.slideToggle(200);
    if (text === '* Reset') {
      link.html('Select one option'+icon);
    }
  });
});
$(function() {
  var list = $('.js-dropdown-list2');
  var link = $('.js-link2');
  link.click(function(e) {
    e.preventDefault();
    list.slideToggle(200);
  });
  list.find('li').click(function() {
    var text = $(this).html();
    var icon = '<i class="fa fa-chevron-down"></i>';
    link.html(text+icon);
    list.slideToggle(200);
    if (text === '* Reset') {
      link.html('Select one option'+icon);
    }
  });
});

// speak

var speak = function(phraseToSay) {
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[10]; // Note: some voices don't support altering params
    msg.voiceURI = 'native';
    msg.volume = 1; // 0 to 1
    msg.rate = .9; // 0.1 to 10
    msg.pitch = 0; //0 to 2
    msg.text = phraseToSay;
    msg.lang = 'en-US';
    speechSynthesis.speak(msg);
}

$('.speaker').on('click', function() {
  var phraseToSay = $('#say_these_words').val(); 
  speak(phraseToSay);
  return false;
});
$('.speaker2').on('click', function() {
  var phraseToSay = $('.say_these_words2').val(); 
  speak(phraseToSay);
  return false;
});
$('.speaker3').on('click', function() {
  var phraseToSay = $('.say_these_words3').val(); 
  speak(phraseToSay);
  return false;
});
$('.speaker4').on('click', function() {
  var phraseToSay = $('.say_these_words4').val(); 
  speak(phraseToSay);
  return false;
});
$('.speaker5').on('click', function() {
  var phraseToSay = $('.say_these_words5').val(); 
  speak(phraseToSay);
  return false;
});
$('.speaker6').on('click', function() {
  var phraseToSay = $('.say_these_words6').val(); 
  speak(phraseToSay);
  return false;
});
$('.speaker7').on('click', function() {
  var phraseToSay = $('.say_these_words7').val(); 
  speak(phraseToSay);
  return false;
});
$('.speaker8').on('click', function() {
  var phraseToSay = $('.say_these_words8').val(); 
  speak(phraseToSay);
  return false;
});
$('.speaker08').on('click', function() {
  var phraseToSay = $('.say_these_words08').val(); 
  speak(phraseToSay);
  return false;
});
$('.speaker008').on('click', function() {
  var phraseToSay = $('.say_these_words008').val(); 
  speak(phraseToSay);
  return false;
});
$(document).ready(function(){
  speak('');
})


// chart

var options = {
  chart: {
    width: "100%",
    height: 580,
    type: "bar"
  },
  plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: '50%',
                  endingShape: 'rounded'
                },
              },
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: 1,
    colors: ["#fff"]
  },
  series: [
    {
      data: [154, 166, 145, 153, 145, 156, 140, 155,144,134,145]
    }
  ],
  xaxis: {
    categories: ['1 month', '2 month', '3 month', '4 month', '5 month', '6 month', '7 month', '8 month', '9 month', '10 month', '11 month'],
  },
  tooltip: {
    
    custom: function({ series, seriesIndex, dataPointIndex, w }) {
      return (
        '<div class="arrow_box">' +
        "<span>" +
        w.globals.labels[dataPointIndex] +
        ": " +
        series[seriesIndex][dataPointIndex] +
        "</span>" +
        "</div>"
      );
    }
  }
};

// var chart = new ApexCharts(document.querySelector("#apex-chart"), options);

// chart.render();



// progress

// on page load...
    moveProgressBar();
    // on browser resize...
    $(window).resize(function() {
        moveProgressBar();
    });

    // SIGNATURE PROGRESS
    function moveProgressBar() {
      // console.log("moveProgressBar");
        var getPercent = ($('.progress-wrap').data('progress-percent') / 100);
        var getProgressWrapWidth = $('.progress-wrap').width();
        var progressTotal = getPercent * getProgressWrapWidth;
        var animationLength = 2500;
        
        // on page load, animate percentage bar to data percentage length
        // .stop() used to prevent animation queueing
        $('.progress-bar').stop().animate({
            left: progressTotal
        }, animationLength);
    }



    //paginaton

    // jQuery Plugin: http://flaviusmatis.github.io/simplePagination.js/

var items = $(".list-wrapper .list-item");
    var numItems = items.length;
    var perPage = 7;

    items.slice(perPage).hide();

    // $('#pagination-container').pagination({
    //     items: numItems,
    //     itemsOnPage: perPage,
    //     prevText: "&laquo; <span>Previous</span>",
    //     nextText: "<span> Next</span> &raquo;",
    //     onPageClick: function (pageNumber) {
    //         var showFrom = perPage * (pageNumber - 1);
    //         var showTo = showFrom + perPage;
    //         items.hide().slice(showFrom, showTo).show();
    //     }
    // });



    // video

    $(function() {
    $('.popup-youtube, .popup-vimeo').magnificPopup({
        // disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });
});



// $('.flip').on('click', function () {
//   $('.flipcards').toggleClass('flipped');
// });


$('.flipcards').on('click', function () {
    $(this).toggleClass('flipped');
});



document.cookie = "username=Max Brown";


$(function(){
    $('.selectpicker').selectpicker();
});




$('.toggle').on('click', function(){
    $('.teachertab').toggleClass('active');
});

$(document).ready(function(){
    $('#nav-icon1').click(function(){
        $(this).toggleClass('open');
    });
});


