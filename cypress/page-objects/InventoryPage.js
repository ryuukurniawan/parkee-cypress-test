class InventoryPage {
    getSortDropdown() {
        return cy.get('[data-test="product-sort-container"]');
    }

    getAllPrices() {
        return cy.get('.inventory_item_price');
    }

    addItemToCart(itemName) {
        const productXpath = itemName.toLowerCase().replace(/ /g, '-');
        cy.get(`[data-test="add-to-cart-${productXpath}"]`).click();
    }

    getCartBadge() {
        return cy.get('.shopping_cart_badge');
    }
}

export default new InventoryPage();