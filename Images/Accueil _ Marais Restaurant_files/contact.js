$(document).ready(function ($) {
    $('#envoyer').click(function () {
        swal({
            title: lang.get('alertContact.patienter'),
            allowOutsideClick: false,
            allowEscapeKey: false,
            onOpen: () => {
                swal.showLoading();
            }
        });
    });

    if ($('#contact_status').val() == 'success') {
        swal({
            title : '<span class="text_gold">' + lang.get('alertContact.merci') + '</span>',
            text : lang.get('alertContact.repondrons'),
            type : 'success',
            allowOutsideClick: false,
            confirmButtonColor: '#555453',
        });
    }else if ($('#contact_status').val() == 'failed') {
        swal({
            title: '<span class="orange_title">' + lang.get('alertContact.echec') + '</span>',
            text: lang.get('alertContact.persiste'),
            type: 'warning',
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonColor: '#555453',
        });
    }
});
