$(function () {
    $('.showPopup').on('click' , function () {
        var $popup = $('.popup' + $(this).data('popup'));
        $popup.fadeIn(function () {
            var $cuisineSlider = $popup.find('.cuisine-slide');
            if ($cuisineSlider.length) {
                if (!$cuisineSlider.hasClass('slick-initialized')) {
                    $cuisineSlider.slick({
                        infinite: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: true,
                        dots: false,
                        responsive: [
                            {
                                breakpoint: 9999,
                                settings: {
                                    slidesToShow: 2
                                }
                            },
                            {
                                breakpoint: 1200,
                                settings: {
                                    slidesToShow: 1
                                }
                            }
                        ]
                    });
                } else {
                    $cuisineSlider.slick('setPosition');
                }
            }
        });
    });

    $('.popup').on('click' , function () {
        $(this).fadeOut()
    });

    $('.popup .closePopup').on('click' , function () {
        $(this).parents('.popup').fadeOut();
    });

    $('.contentPopup').on('click' , function (e) {
        e.stopPropagation();
    });

    $(document).on('keydown' , function (e) {
        if (e.keyCode === 27) {
            $('.popup').fadeOut();
        }
    });
});
