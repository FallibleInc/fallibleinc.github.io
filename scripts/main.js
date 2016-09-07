'use strict';

$(document).ready(function () {

    var opaqueHeaderPages = ['faq', 'contactus', 'refund', 'privacy', 'terms', 'pricing', 'cybersecurity-due-diligence', 'checksum-security-scanner', 'fallible-managed-security', 'portfolio-package', '404'];
    for (var i = 0; i < opaqueHeaderPages.length; i++) {
        if (window.location.pathname.indexOf(opaqueHeaderPages[i]) !== -1) {
            $('#top-nav').addClass('nav-scrolled navbar-dark');
            console.log(window.location.pathname.indexOf(opaqueHeaderPages[i]));
            return;
        }
    }

    var doneScrolling = false;

    $(document).scroll(function () {
        doneScrolling = true;
    });

    var topNav = $('#top-nav');
    var navBottom = $('#nav-bottom');

    setInterval(function () {
        if (doneScrolling) {
            doneScrolling = false;

            var scrollTop = $(document).scrollTop();

            if (scrollTop > 50) {
                topNav.addClass('nav-scrolled navbar-dark');
                navBottom.hide();
            } else {
                topNav.removeClass('nav-scrolled navbar-dark');
                navBottom.show();
            }

            var networkImage = $('.double-tile');

            if (scrollTop > networkImage.offset().top - networkImage.height()) {
                $('#network g path').addClass('path');
            }
        }
    }, 350);

    var text = ['Prevented <span class="changing-text"><span id="data">15</span> million+ credit cards</span> leaks', 'Prevented <span class="changing-text"><span id="data">40</span> million+ users</span> personal data leaks', 'Securing <span class="changing-text"><span id="data">60</span>% of online payments</span> in India'];

    var index = 0;
    var intervalId;

    function changeText() {

        window.clearInterval(intervalId);

        var number;

        if (index === 1) {
            number = 20;
            intervalId = window.setInterval(updateData, 50, 40);
        } else if (index === 0) {
            number = 10;
            intervalId = window.setInterval(updateData, 50, 15);
        } else {
            number = 30;
            intervalId = window.setInterval(updateData, 50, 60);
        }

        function updateData(max) {
            if (number < max) {
                number++;
                $('#data').text(number);
            }
        }

        $('#text')(text[index]);
        index = (index + 1) % 3;
    }

    var interval = window.setInterval(changeText, 3000);

    window.onunload = function () {
        window.clearInterval(interval);
    };
});

$(document).ready(function () {
    $('#switch').on('click touch', function () {

        $('#switch').toggleClass('hover');
        var standardAmount = $('#standard-card .amount').text();
        var monthYearToggle = $('#standard-card .month').text();

        if (standardAmount === '1400') {
            $('#standard-card .amount').text('14000');
        } else if (standardAmount === '14000') {
            $('#standard-card .amount').text('1400');
        }

        if (monthYearToggle === 'month') {
            $('#standard-card .month').text('year');
        } else if (monthYearToggle === 'year') {
            $('#standard-card .month').text('month');
        }
    });
});
//# sourceMappingURL=main.js.map
