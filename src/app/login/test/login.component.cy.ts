import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent  } from "../login.component"; "../login.component";

describe('LoginComponent tests', () => {
    beforeEach(() => {
        // cy.visit('/login');
    });

    it("Cypress mounts the component", () => {
        cy.mount(LoginComponent, {
            imports: [BrowserAnimationsModule]
        });
        cy.get('input[formControlName="username"]').focus();
        cy.get('input[formControlName="password"]').focus();
        cy.get('mat-form-field').first().children().first().should("have.class", "mdc-text-field--invalid");
        cy.get('input[formControlName="username"]').focus();
        cy.get('mat-form-field').eq(1).children().first().should("have.class", "mdc-text-field--invalid");
    })
});