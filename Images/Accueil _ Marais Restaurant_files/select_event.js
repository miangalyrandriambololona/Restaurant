var  nextStep = 0;
var  prevStep = 1;

$(document).ready(function () {
    /**
     * Selectionner un evenement
     **/
    $('.checkbox_event').on('click', function () {
        // Selectionner seulement un checkbox
        $('.checkbox_event').not(this).prop('checked', false);
        // Si un checkbox est selectionner
        if ($(this).prop('checked')) {
            // Recuperer la date de l'evenement est la formater en date long
            let date_event = moment($(this).data('date'), "YYYY.MM.DD").locale($('html').attr('lang')).format("dddd Do MMMM YYYY");
            $('#heure_arrive').val('');
            // Assigner la date à l'input cacher et desactiver
            $('.date_selected_event input').val(date_event);
            show(['.date_selected_event']);
            hide(['.fp_reservation','.flatpickr_error','.fp_commande']);
            $('#date_reservation').val($(this).data('date'));//Set date to input hidden #date_reservation
            $('#event_selected').val($(this).attr('id').match(/\d+/)[0]); // Set event id to hidden #event_selected
            $('.h_evenement').replaceClass('hide_hour','show_hour');
            $('.h_ouverture,.h_commande').replaceClass('show_hour','hide_hour');

            //Recuperer l'heure eclater depuis la table evenement
            let h_event = $('.h_evenement').attr('h-event');
            let h_json = jQuery.parseJSON(h_event); // Convertir en JSON
            // Recuperer la clé correspondant à l'heure de l'evenement
            let h_table = h_json[$(this).attr('id').toString()];

            // heure de dedut de l'evenement
            let h_debut_index = h_table.indexOf($(this).data('heure').split('-')[0]);

            $('.h_evenement .column').remove();// Supprimer d"abord les heure deja afficher
            for (let i = h_debut_index; i < h_table.length; i++) {
                // Afficher l'heure qui correspond à l'evenement
                $('.current .h_evenement').append('<div class="column">'
                                                    +'<input type="button" class="heure_dispo input_res" value="' + h_table[i] + '" data-error="heure_error" required/>'
                                                    +'</div>');
            }


            if ($(this).hasClass('brunch')) {
                nextStep = 1;prevStep = 2;
                hide(['.nbr_place_simple_res']);
                show(['.nbr_place_brunch']);
            }else if ($(this).hasClass('special')){
                nextStep = 1;prevStep = 2;
                hide(['.nbr_place_brunch']);
                show(['.nbr_place_simple_res']);
            }else {
                nextStep = 0;prevStep = 1;
                hide(['.nbr_place_brunch']);
                show(['.nbr_place_simple_res']);
            }
        }else{
            nextStep = 0;prevStep = 1;
            $('.h_evenement').replaceClass('show_hour','hide_hour');
            show(['.nbr_place_simple_res','.fp_reservation','.fp_commande']);
            hide(['.nbr_place_brunch','.date_selected_event']);
            $('.flatpickr.input_res, #heure_arrive,#date_reservation').val('');
        }

        // if ($('#tab_commander').hasClass('current')) {
        //     if ($(this).prop('checked')) {//Si le client commande le menu special
        //         $('#menu_speciale,#choix_livraison').css('display', 'unset');//montrer le select menu speciale
        //         //alert('none');
        //     } else {
        //         $('#menu_speciale').css('display', 'none');
        //         //alert('ato za');
        //     }
        // }
    });

});
