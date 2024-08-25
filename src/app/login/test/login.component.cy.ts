import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent  } from "../login.component";
import { HttpClientModule } from "@angular/common/http";

describe('LoginComponent tests', () => {
    beforeEach(() => {
        cy.mount(LoginComponent, {
            imports: [BrowserAnimationsModule, HttpClientModule]
        });

        cy.get('input[formControlName="username"]').focus().as('username');
        cy.get('input[formControlName="password"]').focus().as('password');
        cy.get('.mdc-button__label').as('loginButton');
    });

    describe("Login component behavior test", () => {
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

    describe("Login functionality test", () => {
        // Stubs, intercept, spy, mock, etc. can be used to test the login functionality
        it("Login button click", () => {
            cy.intercept('POST', '/api/login', { statusCode: 200, body: { token: '123' } });
    
            cy.spy(LoginComponent.prototype, 'onClickLogin').as('onClickLogin');
    
            cy.stub(LoginComponent.prototype, 'isLoggedInFunction').returns(false);
    
            cy.get('@username').type('deepak@jha.com');
            cy.get('@password').type("password");
            cy.get('@loginButton').should("have.text", "Login");
            cy.get('@loginButton').click();
            cy.screenshot();
            cy.get('@onClickLogin').should("have.been.calledOnce");
        });
    });
});