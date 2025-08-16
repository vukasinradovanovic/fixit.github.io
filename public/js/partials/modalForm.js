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

    // Helper za prikaz greške
    function showError(input, message) {
        let errorDiv = input.parentElement.querySelector('.invalid-feedback');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'invalid-feedback d-block';
            input.parentElement.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
        input.classList.add('is-invalid');
    }

    function clearErrors(form) {
        form.querySelectorAll('.invalid-feedback').forEach(el => el.remove());
        form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    }

    // Submit forme
    document.querySelector('.mainForm').addEventListener('submit', function (e) {
        e.preventDefault();
        clearErrors(this);

        const name = this.name;
        const email = this.email;
        const date = this.date;
        const desc = this.desc;

        const nameRegex = /^[A-Za-zČčĆćŠšĐđŽž\s\-]{2,30}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        const descRegex = /^.{10,250}$/;

        let valid = true;

        if (!nameRegex.test(name.value.trim())) {
            showError(name, "Ime nije validno.");
            valid = false;
        }
        if (!emailRegex.test(email.value.trim())) {
            showError(email, "Email nije validan.");
            valid = false;
        }
        if (!dateRegex.test(date.value.trim())) {
            showError(date, "Datum nije validan.");
            valid = false;
        }
        if (!descRegex.test(desc.value.trim())) {
            showError(desc, "Opis mora imati bar 10 karaktera.");
            valid = false;
        }

        if (!valid) return;

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