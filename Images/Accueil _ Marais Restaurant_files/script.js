$(document).ready(function () {


    /**
     * Utiliser docSlider si:
     * - L'hauteur du fenetre est superieur min_height
     * - Largeur du fenetre est superieur min_width
     * - Desactiver si le nom de la page est references
     */
    if ($(window).width() > min_width
        && current_page_name != 'references'
        && current_page_name != 'evenements') {
        docSlider.init({
            scrollReset: true,
            speed: 1000,
            easing: 'ease-in-out',
            pager: false,
        });
    }

    /**
     * Evenement click botton en forme de fleche
     * Aller à la section suivante
     */
    $('.arrow_btn').on('click', function (e) {
        e.preventDefault();
        // Utiliser la fonction jumpPage de docSlider pour aller à la section suivante
        docSlider.jumpPage($(this).closest('section').next().attr('id'));
    });

    $('.jumpPage').on('click', function () {
        docSlider.jumpPage($(this).data('target'));
        $('#hamburger').toggleClass('close');
        $("#nav").toggleClass("visible");
        window.location.hash = '';
    });

    $('.img_popup').on('click', function() {
        $(this).addClass('hide_img_popup');
        $(`.${$(this).data('popup')}`).removeClass('hide_img_popup');
    });
});
