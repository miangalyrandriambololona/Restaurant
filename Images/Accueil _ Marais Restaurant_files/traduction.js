/**
 * Initiation de traduction des texts dans les script
 */
var lang = new Lang({
    messages: {
        'fr.alertReservation':{
            'patienter': 'Veuillez patienter',
            'succes': 'Votre réservation a bien été enregistrée avec succès !',
            'merci': 'Merci pour votre confiance.<br>Vous recevrez dans quelques instants<br>un email de confirmation',
            'echec': "Votre réservation n'a pas pu aboutir",
            'verifier': "Veuillez vérifier que les champs soient remplis correctement",
            'persiste': "Veuillez vérifier votre connexion internet<br>Si le problème persiste, contacter directement<br>Le Marais Restaurant au : +261 34 50 674 97",
        },
        'fr.alertContact':{
            'patienter': 'Veuillez patienter',
            'merci': 'Merci! Nous avons bien reçu votre message.',
            'repondrons': 'Nous vous répondrons au plus vite',
            'echec': "Votre message n'a pas pu être envoyé",
            'persiste': "Veuillez verifier que les champs soient remplis correctement<br>Si le problème persiste, contacter directement Le Marais Restaurant au : +261 34 50 674 97",
        },
        'fr.btnReservation':{
            'reservation': 'Réservation',
            'fermer': 'Fermer',
        },
        'en.alertReservation':{
            'patienter': 'Please wait',
            'succes': 'Your reservation has been successfully registered!',
            'merci': 'Thank you for your trust.<br>You will receive a confirmation email shortly',
            'echec': "Your reservation could not be completed",
            'verifier': "Please check that the fields are filled in correctly",
            'persiste': "Please check your internet connection.<br>If the problem persists, contact Le Marais Restaurant<br>directly at: +261 34 50 674 97",
        },
        'en.alertContact':{
            'patienter': 'Please wait',
            'merci': 'Thank you! We have received your message.',
            'repondrons': 'We will get back to you as soon as possible',
            'echec': "Your message could not be sent",
            'persiste': "Please check that the fields are filled in correctly.<br>If the problem persists, contact Le Marais Restaurant<br>directly at: +261 34 50 674 97",
        },
        'en.btnReservation':{
            'reservation': 'Booking',
            'fermer': 'Close',
        },
        'mg.alertReservation':{
            'patienter': 'Mahandrasa kely azafady',
            'succes': 'Voaray soa aman-tsara ny famandrihan-toeranao',
            'merci': "Misaotra amin'ny fahatokisana.<br>Mahazo mailaka fanamafisana ianao afaka fotoana fohy",
            'echec': "Tsy tontosa ny famandrihan-toeranao",
            'verifier': "Hamarino tsara sao misy diso ireo banga nofenoinao",
            'persiste': "Hamarino ny fifandraisana aterinetinao.<br>Raha mbola miverina ny olana, dia antsoy amin'ny laharana <br>+261 34 50 674 97 ny Marais Restaurant",
        },
        'mg.alertContact':{
            'patienter': 'Mahandrasa kely azafady',
            'merci': 'Misaotra tompoko fa voaray ny hafatrao.',
            'repondrons': 'Hovalianay haingana izany',
            'echec': "Tsy lasa ny hafatrao",
            'persiste': "Hamarino tsara sao misy diso ireo banga.<br>Raha mbola miverina ny olana, dia antsoy amin'ny laharana <br>+261 34 50 674 97 ny Marais Restaurant",
        },
        'mg.btnReservation':{
            'reservation': 'Famandrihan-toerana',
            'fermer': 'Akatona',
        },
    },
    locale: $('html').attr('lang'),
    fallback: 'fr'
});
