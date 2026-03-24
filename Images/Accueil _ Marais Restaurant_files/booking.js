/**
 * Fonction qui cache les éléments donnés en paramètre
 * @param {array} selector
 */
function hide(selector) {
    $.each(selector, function (index, value) {
        $(value).css('display', 'none');
    })
}
/**
 * Fonction qui montre les éléments donnés en paramètre
 * @param {array} selector
 */
function show(selector) {
    $.each(selector, function (index, value) {
        $(value).css('display', 'unset');
    })
}

/**
 * Fonction qui remplace une classe par une classe donnée
 */
$.fn.replaceClass = function (pFromClass, pToClass) {
    return this.removeClass(pFromClass).addClass(pToClass);
};
/**
 * Fonction qui affiche le popup alert de 'sweetallert'
 * @param {*Titre du message} titleMsg
 * @param {*Le contenu du message} textMsg
 */
function alertError(titleMsg, textMsg) {
    swal({
        title: '<span class="orange_title">' + titleMsg + '</span>',
        text: textMsg,
        type: 'warning',
        allowEscapeKey: false,
        allowOutsideClick: false,
        confirmButtonColor: '#555453',
    });
}

/**
 * Reinitialiser touts les champs
 */
function resetInput() {
    $('.data_res, .input_date_selected_event, .flatpickr.input_res').val('');
    //Clear all selected command
    $('.select2_menu').each(function () {
        $(this).val(null).trigger('change');
    });
    $('.h_dispo').replaceClass('show_hour', 'hide_hour');
    $('#a_recuperer').prop('checked', true);
    $('input[type="checkbox"]').prop('checked', false);
    hide(['#offre_livraison', '.date_selected_event', '#nbr_place_brunch']);
    show(['.flatpickr', '.nbr_place_simple_res']);
    nextStep = 0; prevStep = 1;
}

const checkOperator = (codeOperator, number, numberMaxLength, codeLength) => {
    if (codeOperator.includes(number.slice(0, codeLength)) && number.length == numberMaxLength) {
        return true;
    }
    return false;
}


let nextTarget, previousTarget;
let tab_id = 'tab-reserver';
let numberVerified = false;
const codeOperatorFR = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
const codeOperatorMG = ["020", "20", "032", "32", , "033", "33", "034", "34", "038", "38", "037", "37"]

$(document).ready(function () {
    // $('#reservation_form').addClass('visible_form');

    /**
     * Tabs "Réservez des places / Commander des plats" event.
     */
    $('ul.tabs_plats li').on('click', function () {
        let choix_livraison = $('.choix_livraison input:checked');
        tab_id = $(this).data('tab');
        if (tab_id === 'tab-commander') {
            choix_livraison.addClass('data_res');
        } else {
            choix_livraison.removeClass('data_res');
        }
        $('ul.tabs_plats li, .tab-content').removeClass('current');
        $('#' + tab_id).toggleClass('current');
        $(this).toggleClass('current');
    });
    /**
     * Radio button à livrer / à recuperer
     */
    $('#choix_livraison input[type="radio"]').click(function () {
        $('#choix_livraison input').not(this).removeClass('data_res');
        $(this).addClass('data_res');
        if ($(this).attr('id') === 'a_livrer') {
            show(['#offre_livraison', '#div_adresse']);
        } else {
            hide(['#offre_livraison', '#div_adresse']);
        }
    });
    /**
     * Choix heure
     * Selectionner seulement une heure
     */
    $(".h_evenement,.h_dispo").on('click', '.heure_dispo', function () {
        $('.heure_dispo').removeClass('selected_hours');
        hide(['.heure_error']);
        $(this).addClass('selected_hours');
        $('#heure_arrive').val($(this).val());
    });

    /**
     * Internationnal phone number
     */
    $("#phone_number").intlTelInput({
        allowDropdown: true,
        autoPlaceholder: "polite",
        formatOnDisplay: true,
        initialCountry: "mg",
        nationalMode: true,
        separateDialCode: true,
        onlyCountries: ["mg","fr"],
    });
    // Tester si le numeros de phone est valid
    $('#phone_number').on('keyup change', function () {
        let countryCode = $('.iti__selected-dial-code').html();
        let codeOperator = codeOperatorMG;
        let val = this.value;
        let newStr = '';
        let countryCodeSub = 0;

        if (countryCode === "+33") {
            codeOperator = codeOperatorFR;
            countryCodeSub = 1;
        }
        let codeLength = 2 - countryCodeSub;
        let numberMaxLength = 9;

        if (val[0] == 0) {
            codeLength = 3 - countryCodeSub;
            numberMaxLength = 10;
        }

        for (var i = 0; i < val.length; i++) {
            let character = val.charAt(i);
            let re = new RegExp('[\+0-9]', '');
            if (re.test(character) && newStr.length < numberMaxLength) {
                newStr += character;
            }
        }
        if (!checkOperator(codeOperator, newStr, numberMaxLength, codeLength)) {
            show(['.phone_invalid_error']); // Afficher le message d'erreur
            numberVerified = true;
        } else {
            hide(['.phone_invalid_error']); // Masquer le message d'erreur
            numberVerified = false;
        }
        $('#phone_number').val(newStr);
    });
    /**
     * Bouton suivant
     */
    let input_validated = false;
    $(".next").on('click', function () {
        let btn_next = this;
        let next = true;
        let validate = true; // 'false' pour passer les validations des formulaires
        let lastStep = $('#progressbar li').last().hasClass('active');

        // Cacher le text "Optionnel" sy le client clique la Tabs Commander des plats
        (tab_id === 'tab-commander') ? hide(['#optionnel']) : show(['#optionnel']);

        if (validate) {
            // Cacher les erreurs afficher
            hide(['.error_reservation', '.error_info']);
            /**
             * Cette boucle test les inputs visible qui a un attribut 'required'
             */
            $($(this).parent().find(':input[required]:visible')).each(function () {
                //console.log(this);
                if (!$(this).val() || $(this).val() <= 0 || // Si les inputs sont vide ou inferieur à 0
                    ($(this).is(':button') && !$('#heure_arrive').val()) || // Si le client ne selectionne pas une heure
                    ($(this).is(':checkbox') && !$(this).prop('checked'))) { // Si le client ne coche pas la condidion de vente
                    // Si l'input est le flatpickr
                    ($(this).hasClass('flatpickr')) ? show(['.flatpickr_error']) : '';
                    show(['.' + $(this).data('error')]); // Afficher le message d'erreur
                    next = false; // Ne pas passer à l'etape suivante
                    return false; // Arreter la boucle
                }
            });

            if (numberVerified) {
                show(['.phone_invalid_error']); // Afficher le message d'erreur
                next = false; // Ne pas passer à l'etape suivante
                return false; // Arreter l'evenement clic
            }

            /**
             * Test independant du nombre de place pour enfant ou adulte
             * Au moin un input est remplit
             */
            if ($('#nbr_place_brunch').is(':visible') && next) {
                if (!(($('#number_adult').val() > 0) || ($('#number_enfant').val() > 0))) {
                    show(['.nbrPlace_brunch_error']);
                    next = false; // Ne pas passer à l'etape suivante
                    return false; // Arreter l'evenement clic
                }
            }
            /**
             * Test independant pour la list des menus à commander
             * Si le client veux commander des plat, il doit selectionner au moins un menu
             */
            if (tab_id === 'tab-commander' && $(this).hasClass('next_commander') && !$('.select2-search-choice').length) {
                show(['.menu_error']);
                next = false;
                return false;
            }


        }
        /**
         * Si next = true et le formulaire n'est à la derniere étape, passer à l'étape suivante
         * Sinon, interrompre l'evenement click
         */
        if (next && !lastStep) {
            nextTarget = $(btn_next).parent().index() + nextStep;
            nextFieldset(btn_next, nextTarget);
        } else if (next == false) {
            return false;
        }
        /**
         * Si tout les etapes sont passé est la validation est Ok
         * Mettre input_validated en 'true' pour envoyer le requete en ajax
         */
        (lastStep) ? input_validated = true : '';
    });

    /**
     * Bouton retour
     */
    $(".previous").on('click', function () {
        if ($('.checkbox_event .special').prop('checked', true)) {
            prevStep = 2;
        }
        previousTarget = $(this).parent().index() - prevStep;
        previousFieldset(this, previousTarget);
    });

    /**
     * Reserver
     */
    $(".submit").on('click', function () {
        let formData = new FormData();
        let id_command = [];
        // Si les inputs sont valide
        if (input_validated) {
            /** Recuperez tous les valeurs et ajouter dans le formData */
            $('.reservation-form').find('.data_res').each(function () {
                formData.append($(this).attr('name'), $(this).val());
            });
            /** Ajouter le code pays avant le numeros du telephone */
            formData.set('phone', $('.iti__selected-dial-code').text() + ' ' + formData.get('phone'));
            /**
             * Recuperer les identifiant des menus selectionner par l'utilisateur
             * Ensuit stocker dans un tableau
             */
            $('.select2-search-choice').each(function () {
                id_command.push($(this).attr('id'));
            });

            /**
             * Encoder les identifiants des menus selectionner en JSON
             * Ensuit, ajouter dans l'objet res_data
             */
            formData.append('menus_id', JSON.stringify(id_command));
            // Livraison
            let choix_checked = $('.choix_livraison .data_res:checked');
            (choix_checked.length) ? formData.append('livraison', choix_checked.val()) : '';
            // csrf Token
            formData.append('_token', $('input[name="_token"]').val());

            $.ajax({
                url: '/' + $('html').attr('lang') + '/reserver',
                method: "POST",
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
                beforeSend: function () {
                    swal({
                        title: lang.get('alertReservation.patienter'),
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        onOpen: () => {
                            swal.showLoading();
                        }
                    });
                },
                success: function (data) {
                    // console.log(data);
                    swal({
                        title: '<span class="text_gold">' + lang.get('alertReservation.succes') + '</span>',
                        text: lang.get('alertReservation.merci'),
                        type: 'success',
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        confirmButtonColor: '#555453',
                    }).then(() => {//Clear all input after OK event
                        $('#reservation_form').toggleClass("visible_form");
                        $("#filter").toggleClass("filter");
                        $('#reservation').val(lang.get('btnReservation.reservation'));
                        previousFieldset($('.previous').last(), 2);
                        resetInput();
                    });
                },
                error: function (data) {
                    console.log(data);
                    $('.reservation-form').prepend(data.responseText);
                    /** S'il y a une erreur de validation. Afficher les messages d'erreur pour chaque input **/
                    if (data.responseJSON.errors) {
                        alertError(lang.get('alertReservation.echec'), lang.get('alertReservation.verifier'))
                        $.each(data.responseJSON.errors, function (key, value) {
                            $('.' + key + '_error').text(value);
                            show(['.' + key + '_error']);
                        });
                    } else {
                        alertError(lang.get('alertReservation.echec'), lang.get('alertReservation.persiste'))
                    }
                }
            });
        }
    });

});
