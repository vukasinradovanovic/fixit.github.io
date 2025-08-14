import { questions } from "./questionsList.js";

/**
 * Inicijalizuje FAQ sekciju.
 */

export function initFAQSection() {

    questions.forEach(q => {
    const $question = $(`<div class="faq-question">${q.question}</div>`);
    const $answer = $(`<div class="faq-answer">${q.answer}</div>`);

    $('.faq-section').append($question).append($answer);

    $question.on('click', () => {
        $answer.toggleClass('open');
    });
});
}
