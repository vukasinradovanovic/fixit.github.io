import { servicesList } from "./servicesList.js";

/**
 * Dinamički generiše i prikazuje kartice sa detaljnijim opisima građevinskih usluga na stranici usluge.html,
 * prikazuje po 2 kartice u redu (Bootstrap row/col sistem), koristi podatke iz servicesList.
 */
export function initInfoCardsFull() {
    let html = '';
    let tempRow = [];

    servicesList.forEach((card, idx) => {
        tempRow.push(`
            <div class="col-12 col-md-5 m-2">
                <div class="jobCards_card p-4 d-flex flex-column justify-content-center align-items-center" style="background-image: url('${card.bgi || "public/img/default.png"}'); min-height: 320px;">
                    <h3>${card.label}</h3>
                    <p>${card.desc || "Detaljan opis usluge."}</p>
                    <button class="btn secondaryButton" data-bs-toggle="modal" data-bs-target="#questionModal" data-service-value="${card.value}">Zakaži uslugu</button>
                </div>
            </div>
        `);

        // Kada su dve kartice ili poslednja, zatvori row
        if (tempRow.length === 2 || idx === servicesList.length - 1) {
            html += `<div class="row justify-content-center mb-4">${tempRow.join('')}</div>`;
            tempRow = [];
        }
    });

    const jobCardHolder = document.querySelector(".jobCards--full");
    if (jobCardHolder) {
        jobCardHolder.innerHTML = html;
    }
}