import { initButtons } from "./partials/buttons.js";
import { initFAQSection } from "./partials/FAQSection.js";
import { initFooter } from "./partials/footer.js";
import { initHero } from "./partials/hero.js";
import { initInfoCards } from "./partials/infoCards.js";
import { initInfoCardsFull } from "./partials/infoCardsFull.js";
import { initMainLoader } from "./partials/mainLoader.js";
import { initModalForm } from "./partials/modalForm.js";
import { initNavigation } from "./partials/navigation.js";

// Loader - jQuery
$(document).ready(function () {
    initMainLoader();
});


// inicijalizacija navigacije
initNavigation();

// inicijalizacija hero sekcije
initHero();

//Liata/Kartice za prikaz usluga koji je ucitavaju pomocu liste
initInfoCards();

// Modal forma za naručivanje usluga
initModalForm();

// Inicijalizacija kartica sa svim uslugama i detaljima
initInfoCardsFull();

// Inicijalizacija FAQ sekcije
initFAQSection();

// Inicijalizacija interaktivnih dugmića - jQuery
initButtons();

// Inicijalizacija futera sa svim potrebnim ikonama i linkovima
initFooter();   