class CheckoutStepOnePage {
    fillInformation(firstName, lastName, postalCode) {
        if (firstName) cy.get('[data-test="firstName"]').type(firstName);
        if (lastName) cy.get('[data-test="lastName"]').type(lastName);
        if (postalCode) cy.get('[data-test="postalCode"]').type(postalCode);
        cy.get('[data-test="continue"]').click();
    }

    getErrorMessage() {
        return cy.get('[data-test="error"]');
    }

    getCancelButton() {
        return cy.get('[data-test="cancel"]');
    }
}
export default new CheckoutStepOnePage();