import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent  } from "../login.component"; "../login.component";

describe('LoginComponent tests', () => {
    beforeEach(() => {
        cy.mount(LoginComponent, {
            imports: [BrowserAnimationsModule]
        });

        cy.get('input[formControlName="username"]').focus().as('username');
        cy.get('input[formControlName="password"]').focus().as('password');
    });

    it("Cypress mounts the component", () => {
        cy.get('input[formControlName="username"]').focus();
        cy.get('input[formControlName="password"]').focus();
        cy.get('mat-form-field').first().children().first().should("have.class", "mdc-text-field--invalid");
        cy.get('input[formControlName="username"]').focus();
        cy.get('mat-form-field').eq(1).children().first().should("have.class", "mdc-text-field--invalid");
    })

    it("Error message on the mandatory username field", () => {
        cy.get('mat-error').first().should("have.text", "Username is mandatory");
    })

    it("Error message on the email username field", () => {
        cy.get('@username').type('deepak');
        cy.get('@username').blur();
        cy.get('mat-error').first().should("have.text", "Email is required");
    })

    it("No error message found when field was valid", () => {
        cy.get('@username').type('deepak@gmail.com');
        cy.get('@username').blur();
        cy.get('mat-error').should("not.exist");
    })

    it("Login button gets enabled", () => {
        cy.get('@username').type('deepak@gmail.com');
        cy.get('@password').type("password");
        cy.get('.mdc-button__label').should("have.text", "Login");
    })

    it("Login button gets disabled", () => {
        cy.get('@username').type('sss');
        cy.get('@password').type("password");
        cy.get('.mdc-button__label').should("not.text");
    })
});