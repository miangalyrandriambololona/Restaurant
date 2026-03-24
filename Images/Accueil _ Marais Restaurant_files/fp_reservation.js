/**
 * Flat pickr Calendrier
 */

$(document).ready(function() {
    let minTime = '09:00:00'; //Heure minimum de reservation du Jour J
    let currentDate = $('#currentDate').val();
    let tomorrowDate = $('#tomorrowDate').val();
    let currentTime = $('#currentTime').val();
    
    let minDate = 'today';
    let margeAvantReservation = 0;
    let debutHeureMinimum = 0;
    
    let h_ouverture = $('.h_ouverture').attr('h-ouverture'); //Recuperer l'heure eclater dans l'attribut 'h-ouverture'
    let h_commande = $('.h_commande').attr('h-commande');

    let h_ouverture_json = [];
    let h_commande_json = [];
    
    try {
        if (h_ouverture) {
            h_ouverture_json = jQuery.parseJSON(h_ouverture);
        }
    } catch(e) {
        // Erreur lors du parsing de h_ouverture
    }
    
    try {
        if (h_commande) {
            h_commande_json = jQuery.parseJSON(h_commande);
        }
    } catch(e) {
        // Erreur lors du parsing de h_commande
    }

    let currentHour = currentTime ? currentTime.substring(0, 2) : '00'; //Recuperer l'heure actuel
    let indexOfActualHour = h_ouverture_json.length > 0 ? h_ouverture_json.findIndex(hour => hour.includes(currentHour)) : -1;//Recuperer l'index d'heure actuel dans le tableau
    let h_array = null;

    //Si l'heure minimun de reservation du jour J est passer, desactiver la date d'aujourd'hui
    (minTime < currentTime) ? minDate = tomorrowDate : '';
    function eventDate(params) {
        let date = [];
        $(".grided_form .checkbox_event").each(function (index) {
            date.push($(this).data("date"));
        });
        return date.toString();
    }
    flatpickr(".flatpickr", {
    minDate: minDate,
    maxDate: new Date().fp_incr(182), // 6 mois à partir d'aujourd'hui
    altInput: true,
    altFormat: "l j F Y",
    dateFormat: "Y-m-d",
    locale: $('html').attr('lang'),
    disable: [
        function (date) {
            // Desactiver le samedi et dimanche
            return date.getDay() === 1 || date.getDay() === 0;
        },
        $(".checkbox_event").data("date"),
        "2023-12-09", "2023-12-15", "2023-12-16",  "2024-02-02", "2024-02-03", "2024-04-2", "2024-04-3","2024-04-4","2024-05-11", "2024-05-30", "2024-06-26", "2024-06-28", "2024-06-29", "2024-06-30", "2024-09-03",  "2024-09-13", "2024-09-19", "2024-10-09","2024-10-10","2024-10-25","2024-11-07", "2024-11-08", "2024-12-24","2025-01-29","2025-01-30", "2025-02-14", "2025-03-26", "2025-04-10", "2025-05-16",
        {
            from: "2025-12-25",
            to: "2026-01-05"
        },
    ],
    onChange: function () {
        // Si l'heure est deja affichée
        ($('.h_dispo .column').length) ? $('.h_dispo .column').remove() : '';
        $('#date_reservation').val($('.current .flatpickr-input').val());//Set date to input hidden #date_reservation
        
        if (h_ouverture) {
            try {
                h_ouverture_json = jQuery.parseJSON(h_ouverture);
            } catch(e) {
                // Erreur lors du parsing de h_ouverture
                return;
            }
        }
        
        let fermerMidi = ["2022-09-15", "2022-09-30", "2022-11-05", "2022-11-26", "2023-04-28","2023-05-13","2023-07-08","2023-10-14", "2024-04-05", "2024-04-20", "2025-04-11", "2025-05-17"]
        if (fermerMidi.includes($('#date_reservation').val())) {
            h_ouverture_json = h_ouverture_json.slice(4, h_ouverture_json.length);
        }
        let fermerSoir = ["2023-09-15", "2022-10-19", "2022-11-04", "2022-11-12", "2022-11-26", "2022-12-24", "2023-01-05", "2023-02-14", "2023-03-31", "2023-06-14", "2023-10-27", "2023-11-17", "2024-01-31", "2024-02-14", "2024-06-29", "2024-09-17", "2025-02-14", "2025-04-09","2025-10-07","2025-10-08","2025-10-09"]
        if (fermerSoir.includes($('#date_reservation').val())) {
            h_ouverture_json = h_ouverture_json.slice(0, 4);
        }
        // Si l'heure actuel est entre l'heure d'ouverture
        if (currentTime && h_ouverture_json.length > 0 && currentTime.substring(0, 5) > h_ouverture_json[0] && currentDate === $('.current .flatpickr-input').val()) {
            margeAvantReservation = 2; // 2 pour une heure car l'intervale d'heure est de 30 minutes
            debutHeureMinimum = indexOfActualHour + margeAvantReservation;
            //Si l'heure dépasse le 30 minute, ajouter 30 minutes de plus dans la marge
            (currentTime.substring(3, 5) > 30) ? debutHeureMinimum += 1 : '';
        } else {
            debutHeureMinimum = 0;
        }
        let h_command = 0;

        ($('#tab_commander').hasClass('current')) ? h_command = 2 : '';

        ($('.current .h_commande').length) ? h_array = h_commande_json : h_array = h_ouverture_json;
        if (h_array && h_array.length > 0) {
            for (let i = debutHeureMinimum; i < h_array.length - h_command; i++) {
                $('.current .h_dispo').append('<div class="column"><input type="button" class="heure_dispo input_res" value="' + h_array[i] + '" data-error="heure_error" required/></div>');
            }
        }
        $('.h_ouverture,.h_commande').replaceClass('hide_hour', 'show_hour');
        hide(['.current .flatpickr_error']);


        $('#date_reservation').val($('.current .flatpickr-input').val());//Set date to input hidden #date_reservation
    },
});
});
