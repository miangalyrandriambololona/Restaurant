document.addEventListener('DOMContentLoaded', function() {

    var elms = document.getElementsByClassName('tab_slider');
    for (var i = 0, len = elms.length; i < len; i++) {
        new Splide(elms[i], {
            type: "loop",
            autoplay: true,
            pauseOnHover: false,
            interval: 5000,
            arrows: false,
        }).mount();
    }
});
