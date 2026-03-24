$(document).ready(function () {
    $("#hamburger").on("click", function () {
        $(this).toggleClass("close");
        $("#nav").toggleClass("visible");
    });

    $("#reservation").on("click", function () {
        //$(this).toggleClass("close_form");
        $(this).next().toggleClass("visible_form");
        $("#filter").toggleClass("filter");
        ($(this).next().hasClass('visible_form')) ? $(this).val(lang.get('btnReservation.fermer')): $(this).val(lang.get('btnReservation.reservation'));
    });

    $("#select_speciale").select2({
        placeholder: "Menus speciales",
        allowRepetitionForMultipleSelect: true
    });
    $("#select_emporter").select2({
        placeholder: "Menus à emporter",
        allowRepetitionForMultipleSelect: true
    });
    $("#select_menu").select2({
        placeholder: "Cartes",
        allowRepetitionForMultipleSelect: true
    });
    $("#select_vin").select2({
        placeholder: "Vins",
        allowRepetitionForMultipleSelect: true
    });
    $("#select_cocktail").select2({
        placeholder: "Cocktails",
        allowRepetitionForMultipleSelect: true
    });
    $("#select_boisson").select2({
        placeholder: "Boissons",
        allowRepetitionForMultipleSelect: true
    });
    $(".select_brunch").select2({
        allowRepetitionForMultipleSelect: true
    });
});
