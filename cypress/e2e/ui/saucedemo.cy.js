import LoginPage from '../../page-objects/LoginPage';
import InventoryPage from '../../page-objects/InventoryPage';
import CartPage from '../../page-objects/CartPage';
import CheckoutStepOnePage from '../../page-objects/CheckoutStepOnePage';
import CheckoutStepTwoPage from '../../page-objects/CheckoutStepTwoPage';
import CheckoutCompletePage from '../../page-objects/CheckoutCompletePage';

describe('Parkee Technical Test - UI Validation', () => {
    
   describe('Login Page Tests', () => { // Perhatikan: Tidak ada kurung tutup setelah 'Tests'

        beforeEach(() => {
            LoginPage.visit();
        });

        it('Should login successfully with valid credentials', () => {
            LoginPage.login('standard_user', 'secret_sauce');
            cy.url().should('include', '/inventory.html');
            cy.get('.title').should('have.text', 'Products');
        });

        it('Should display error message for invalid credentials', () => {
            LoginPage.login('invalid_user', 'invalid_password');
            LoginPage.getErrorMessage()
                .should('be.visible')
                .and('contain', 'Username and password do not match');
        });
    });

    describe('Inventory Page Tests', () => {

        beforeEach(() => {
            LoginPage.visit();
            LoginPage.login('standard_user', 'secret_sauce');
        });

        it('Should sort products by price (High to Low)', () => {
            InventoryPage.getSortDropdown().select('hilo');

            InventoryPage.getAllPrices().then(($prices) => {
                const priceList = [...$prices].map(el => parseFloat(el.innerText.replace('$', '')));

                expect(priceList[0]).to.be.at.least(priceList[1]);
                expect(priceList[0]).to.eq(Math.max(...priceList));
            });
        });

        it('Cart badge should disappear when all items are removed', () => {
            InventoryPage.addItemToCart('Sauce Labs Backpack');
            InventoryPage.getCartBadge().should('have.text', '1');

            cy.get('[data-test="remove-sauce-labs-backpack"]').click();

            InventoryPage.getCartBadge().should('not.exist');
        });
    });

    describe('Cart Page Tests', () => { 

        beforeEach(() => {
            LoginPage.visit();
            LoginPage.login('standard_user', 'secret_sauce');
        });

        it('Should display the correct item in the cart', () => {
            const itemName = 'Sauce Labs Backpack';
            InventoryPage.addItemToCart(itemName);
        
            cy.get('.shopping_cart_link').click();

            CartPage.getCartItemName().should('have.text', itemName);
        });

        it('Should observe behavior when checking out with an empty cart', () => {
            cy.get('.shopping_cart_link').click(); 
            
            CartPage.getCartItemName().should('not.exist');
            CartPage.getCheckoutButton().click();

            cy.url().should('include', '/checkout-step-one.html');
            cy.log('BUG LOGIK: User bisa checkout meskipun keranjang kosong');
        });
    });

    describe('Checkout Step One Page Tests', () => { 

        beforeEach(() => {
            LoginPage.visit();
            LoginPage.login('standard_user', 'secret_sauce');
            InventoryPage.addItemToCart('Sauce Labs Backpack');
            
            cy.get('.shopping_cart_link').click();
            CartPage.getCheckoutButton().click();
        });

        it('Should proceed to Step Two when all information is valid', () => {
            CheckoutStepOnePage.fillInformation('Muhammad', 'Ryuu', '17141');
            
            cy.url().should('include', '/checkout-step-two.html');
            cy.get('.title').should('have.text', 'Checkout: Overview');
        });

        it('Should show error message when Last Name is empty', () => {
            CheckoutStepOnePage.fillInformation('Muhammad', '', '17141');

            CheckoutStepOnePage.getErrorMessage()
                .should('be.visible')
                .and('contain', 'Last Name is required');
        });
    });

    describe('Checkout Step Two Page Tests', () => { 

        beforeEach(() => {
            LoginPage.visit();
            LoginPage.login('standard_user', 'secret_sauce');
            InventoryPage.addItemToCart('Sauce Labs Backpack');
            
            cy.get('.shopping_cart_link').click();
            CartPage.getCheckoutButton().click();
            
            CheckoutStepOnePage.fillInformation('Muhammad', 'Ryuu', '17141');
        });

        it('Should display correct price calculation', () => {
            CheckoutStepTwoPage.getInventoryItemName().should('have.text', 'Sauce Labs Backpack');
            CheckoutStepTwoPage.getSubtotalLabel().should('contain', '29.99');
            CheckoutStepTwoPage.getTotalLabel().should('contain', '32.39');
        });

        it('Should return to Inventory page when user clicks Cancel', () => {
            cy.get('[data-test="cancel"]').click();
            
            cy.url().should('include', '/inventory.html');
        });
    });

    describe('Checkout Complete Page Tests', () => {

        describe('Positive Scenarios', () => {
            beforeEach(() => {
                LoginPage.visit();
                LoginPage.login('standard_user', 'secret_sauce');
                InventoryPage.addItemToCart('Sauce Labs Backpack');
                cy.get('.shopping_cart_link').click();
                CartPage.getCheckoutButton().click();
                CheckoutStepOnePage.fillInformation('Muhammad', 'Ryuu', '17141');
                CheckoutStepTwoPage.getFinishButton().click();
            });

            it('Should display success message and clear the cart', () => {
                CheckoutCompletePage.getCompleteHeader().should('have.text', 'Thank you for your order!');
                CheckoutCompletePage.getCompleteImage().should('be.visible');
                InventoryPage.getCartBadge().should('not.exist');
            });

            it('Should return to inventory page when clicking Back Home', () => {
                CheckoutCompletePage.getBackHomeButton().click();
                cy.url().should('include', '/inventory.html');
            });
        });

        describe('Negative & Security Scenarios', () => {
            beforeEach(() => {
                LoginPage.visit();
                LoginPage.login('standard_user', 'secret_sauce');
            });

            it('Should not be able to access Complete page directly via URL', () => {
                cy.visit('https://www.saucedemo.com/checkout-complete.html', { failOnStatusCode: false });
                
                cy.get('.complete-header').should('not.exist'); 
                
                cy.contains('404').should('be.visible'); 
            });
        });
    });

});