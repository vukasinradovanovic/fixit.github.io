/**
 * Prikazuje loader animaciju pri učitavanju stranice i nakon kratkog vremena je sakriva,
 * a zatim prikazuje glavni sadržaj sajta koristeći jQuery animacije.
 */
export function initMainLoader() {
    setTimeout(function () {
        $("#loader").fadeOut(500, function () {
            $("#mainContent").fadeIn(500);
        });
    }, 1500);
}