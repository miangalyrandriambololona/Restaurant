let current_fs, next_fs, previous_fs; //fieldsets
let left, opacity, scale; //fieldset properties which we will animate
let animating; //flag to prevent quick multi-click glitches
let progressbar = $("#progressbar li");

function nextFieldset(current_fieldset, target_step) {
    if (animating) return false;
    animating = true;
    current_fs = $(current_fieldset).parent();
    next_fs = $('.reservation-form fieldset').eq(target_step);
    //show the next fieldset
    next_fs.show();

    // Ajouter un class active a la progressbar suivante
    progressbar.eq(target_step - 1).addClass('active');

    if (target_step > 2) {
        $(progressbar).each(function() {
           $(this).addClass('active');
        });
    }

    //hide the current fieldset with style
    current_fs.animate({
        opacity: 0
    }, {
        step: function (now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale current_fs down to 80%
            scale = 1 - (1 - now) * 0.2;
            //2. bring next_fs from the right(50%)
            left = (now * 50) + "%";
            //3. increase opacity of next_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({
                'transform': 'scale(' + scale + ')',
                'position': 'absolute'
            });
            next_fs.css({
                'left': left,
                'opacity': opacity
            });
        },
        duration: 800,
        complete: function () {
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
}

function previousFieldset(current_fieldset, target_step) {
    if (animating) return false;
    animating = true;
    current_fs = $(current_fieldset).parent();
    previous_fs = $('.reservation-form fieldset').eq(target_step).prev();
    // console.log(current_fs);

    //show the previous fieldset
    previous_fs.show();

    // Enlever la class active de la progressbar du fieldset courant
    progressbar.eq(target_step - 1).removeClass('active');

    (target_step >= 2)? progressbar.last().removeClass('active'): '';
    //hide the current fieldset with style
    current_fs.animate({
        opacity: 0
    }, {
        step: function (now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale previous_fs from 80% to 100%
            scale = 0.8 + (1 - now) * 0.2;
            //2. take current_fs to the right(50%) - from 0%
            left = ((1 - now) * 50) + "%";
            //3. increase opacity of previous_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({
                'left': left
            });
            previous_fs.css({
                'transform': 'scale(' + scale + ')',
                'opacity': opacity
            });
        },
        duration: 800,
        complete: function () {
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
}
