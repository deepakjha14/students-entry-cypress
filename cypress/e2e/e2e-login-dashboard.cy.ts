
describe(
    'Login in the app and move to the dashboard',
    () => {
        beforeEach(
            () => {
                cy.visit('/login');
            }
        );

        it(
            'Dshboard should be visible in the app',
            () => {
                cy.login(Cypress.env('userName'), 'password');
                cy.get('tbody.mdc-data-table__content').should('be.visible');
                cy.get('tbody.mdc-data-table__content').children().should('have.length', 13);
            }
        );

        it(
            'Table should be filtered and display one record',
            () => {
                cy.login(Cypress.env('userName'), 'password');
                cy.get('tbody.mdc-data-table__content').should('be.visible');
                cy.get('input[placeholder="Filter Students"]').focus().type('1');
                cy.get('tbody.mdc-data-table__content').children().should('have.length', 1);
            }
        );

        it(
            'Should have three tabs in the dashboard',
            () => {
                cy.login(Cypress.env('userName'), 'password');
                cy.get("div[class='mat-mdc-tab-label-container']").should('be.visible');
            }
        );

    }
);