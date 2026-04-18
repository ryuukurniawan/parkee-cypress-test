class CheckoutStepTwoPage {
    getInventoryItemName() {
        return cy.get('.inventory_item_name');
    }

    getSubtotalLabel() {
        return cy.get('.summary_subtotal_label');
    }

    getTotalLabel() {
        return cy.get('.summary_total_label');
    }

    getFinishButton() {
        return cy.get('[data-test="finish"]');
    }
}
export default new CheckoutStepTwoPage();