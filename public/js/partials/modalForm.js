import { servicesList } from "./servicesList.js";

/**
 * Dinamički generiše formu za zakazivanje usluge.
 * Može se koristiti u modalu ili unutar bilo kog elementa na stranici.
 * Ako korisnik pritisne na dugme unutar kartice, u formu se automatski popunjavaju podaci o usluzi.
 */
function getModalFormHtml() {
    const servicesOptionsHtml = servicesList.map(
        s => `<option value="${s.value}">${s.label}</option>`
    ).join("");

    return `
      <form class="mainForm">
        <div class="mb-3">
          <label for="modalName" class="form-label">Ime</label>
          <input type="text" class="form-control" id="modalName" name="name" required>
        </div>
        <div class="mb-3">
          <label for="modalEmail" class="form-label">Email</label>
          <input type="email" class="form-control" id="modalEmail" name="email" required>
        </div>
        <div class="mb-3">
          <label for="modalService" class="form-label">Usluga</label>
          <select class="form-select" id="modalService" name="service" required>
            <option value="">Izaberi uslugu...</option>
            ${servicesOptionsHtml}
          </select>
        </div>
        <div class="mb-3">
          <label for="modalDate" class="form-label">Datum početka radova</label>
          <input type="date" class="form-control" id="modalDate" name="date" required>
        </div>
        <div class="mb-3">
          <label for="modalDesc" class="form-label">Opis</label>
          <textarea class="form-control" id="modalDesc" name="desc" rows="3" required></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zatvori</button>
          <button type="submit" class="btn primaryButton">Zakaži</button>
        </div>
      </form>
    `;
}

/**
 * Dinamički generiše i prikazuje Bootstrap modal sa formom.
 */
export function initModalForm() {
    const modalHtml = `
    <div class="modal fade" id="questionModal" aria-labelledby="questionModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="questionModalLabel">Zakažite uslugu</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Zatvori"></button>
          </div>
          <div class="modal-body">
            ${getModalFormHtml()}
          </div>
        </div>
      </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Klik na dugme iz kartice -> postavi vrednost u select
    document.body.addEventListener('click', function (e) {
        const btn = e.target.closest('[data-bs-toggle="modal"][data-service-value]');
        if (btn) {
            const value = btn.getAttribute('data-service-value');
            const select = document.getElementById('modalService');
            if (select && value) {
                select.value = value;
            }
        }
    });

    // Submit forme
    document.querySelector('.mainForm').addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Pitanje je poslato!');
        const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('questionModal'));
        modal.hide();
        this.reset();
    });
}

function insertFormInBlock(blockSelector) {
    const block = document.querySelector(blockSelector);
    if (block) {
        block.innerHTML = getModalFormHtml();
        block.querySelector('.mainForm').addEventListener('submit', function (e) {
            e.preventDefault();
            this.reset();
        });
    }
}

let formBlock = document.querySelector('.form--block');
if (formBlock) {
    insertFormInBlock('.form--block');
}
