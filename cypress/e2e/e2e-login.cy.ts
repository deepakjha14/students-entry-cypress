
describe(
    'Login in the app and move to the dashboard',
    () => {
        beforeEach(
            () => {
                cy.visit('/login');
            }
        );

        it(
            'Should login in the app',
            () => {
                cy.fixture('username').then(
                    (data) => {
                        cy.get('input[formControlName="username"]').focus().as('username').type(Cypress.env('userName'));
                        cy.get('input[formControlName="password"]').focus().as('password').type(data.password);
                        cy.get('.mdc-button__label').click();
                        cy.url().should('include', '/dashboard');
                    }
                )
            }
        )

        it(
            'Should login in the app',
            () => {
                cy.fixture('error-username').then(
                    (data) => {
                        cy.get('input[formControlName="username"]').focus().as('username').type(data.username);
                        cy.get('input[formControlName="password"]').focus().as('password').type(data.password);
                        cy.get('mat-error').first().should("have.text", "Email is required");
                    }
                )
            }
        )

        it(
            'Should login in the app using csv file data',
            () => {
                cy.readFile('cypress/downloads/test.csv', 'base64').then(
                    (data) => {
                        cy.task('csvToJson', data).then(
                            (jsonData: any) => {
                                console.log(jsonData);
                                cy.get('input[formControlName="username"]').focus().as('username').type(jsonData[0].email);
                                cy.get('input[formControlName="password"]').focus().as('password').type(jsonData[0].password);
                                cy.get('.mdc-button__label').click();
                                cy.url().should('include', '/dashboard');
                            }
                        );
                        // cy.get('input[formControlName="username"]').focus().as('username').type(data.username);
                        // cy.get('input[formControlName="password"]').focus().as('password').type(data.password);
                        // cy.get('.mdc-button__label').click();
                        // cy.url().should('include', '/dashboard');
                    }
                )
            }
        )
    }
);