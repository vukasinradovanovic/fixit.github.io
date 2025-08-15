import { servicesList } from "./servicesList.js";

/**
 * Dinamički generiše i prikazuje kartice sa informacijama o uslugama na stranici,
 * koristeći podatke iz servicesList i prikazuje ih u odgovarajućem HTML kontejneru.
 * Kartice su responsive: 1 u redu na xs, 2 na md, 3 na lg+ ekranima.
 */
export function initInfoCards() {
    let html = '';
    let tempRow = [];

    servicesList.slice(0, 6).forEach((card, idx) => {
        tempRow.push(`
        <div class="col-12 col-md-6 col-lg-4 d-flex align-items-stretch mb-4">
            <div class="jobCards_card w-100 p-3 d-flex flex-column justify-content-center align-items-center" style="background-image: url('${card.bgi || "public/img/default.png"}');">
                <h3>${card.label}</h3>
                <p>${card.desc || "Detaljan opis usluge."}</p>
                <button class="btn secondaryButton" data-bs-toggle="modal" data-bs-target="#questionModal" data-service-value="${card.value}">Zakaži uslugu</button>
            </div>
        </div>
        `);

        // Kada su tri kartice ili poslednja, zatvori row
        if (tempRow.length === 3 || idx === servicesList.length - 1) {
            html += `<div class="row justify-content-center mb-4">${tempRow.join('')}</div>`;
            tempRow = [];
        }
    });

    let jobCardHolder = document.querySelector(".jobCards");

    if (jobCardHolder) {
        jobCardHolder.innerHTML = html;
    }
}