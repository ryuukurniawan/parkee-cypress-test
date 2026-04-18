class CartPage {
    visit() {
        cy.visit('https://www.saucedemo.com/cart.html');
    }

    getCartItemName() {
        return cy.get('.inventory_item_name');
    }

    getCheckoutButton() {
        return cy.get('[data-test="checkout"]');
    }

    getContinueShoppingButton() {
        return cy.get('[data-test="continue-shopping"]');
    }
}

export default new CartPage();