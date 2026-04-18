class CheckoutCompletePage {
    getCompleteHeader() {
        return cy.get('.complete-header');
    }

    getCompleteImage() {
        return cy.get('.pony_express');
    }

    getBackHomeButton() {
        return cy.get('[data-test="back-to-products"]');
    }
}
export default new CheckoutCompletePage();