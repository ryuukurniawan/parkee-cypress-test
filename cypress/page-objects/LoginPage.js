class LoginPage {
    visit() {
        cy.visit('https://www.saucedemo.com/');
    }

    login(username, password) {
        if (username) {
            cy.get('[data-test="username"]').type(username);
        }
        if (password) {
            cy.get('[data-test="password"]').type(password);
        }
        cy.get('[data-test="login-button"]').click();
    }

    getErrorMessage() {
        return cy.get('[data-test="error"]');
    }
}

export default new LoginPage();