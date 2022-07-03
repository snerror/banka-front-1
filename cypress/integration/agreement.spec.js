import { URLS } from "../../src/routes";

describe("Agreement Page", () => {
    beforeEach(() => {
        cy.login()
        cy.visit("http://localhost:3000/" + URLS.DASHBOARD.AGREEMENT.LIST)
    })

    it("agreement page => render blocks", () => {
        cy.get('[data-testid="common-block"]').should('have.length', 1)
    })

    it("agreement page => add new agreement", () => {
        //pretpostavlja se da je pokrenut company.spec.js pre ovog testa
        //da bi smo u selection box-u imali bar jednu kompaniju
        cy.get('[data-testid="common-button"]')
            .should('have.length', 1)
            .click()
        cy.get('[data-testid="common-select"]')
            .select(1)
        cy.get('[data-testid="common-text-field"]')
            .click()
            .focus()
            .type("100")
        cy.get('[data-testid="common-textarea"]')
            .click()
            .focus()
            .type("test test test")
        cy.get('[data-testid="common-button"]')
            .eq(2)
            .click()
        cy.get('.rnc__notification-content').should("have.length.at.least", 1).should('have.text', 'Uspesno ste kreirali ugovor')
    })

    it("agreement page => table click => redirect to the agreement", () => {
        cy.wait(500)
        cy.get('[data-testid="common-table-row"]')
            .should('have.length.at.least', 1)
            .eq(0)
            .click()
        cy.url().should("include", `http://localhost:3000/${URLS.DASHBOARD.AGREEMENT.LIST}`);
    })

    it("agreement page => table click => change the description", () => {
        cy.wait(500)
        cy.get('[data-testid="common-table-row"]')
            .find('.listing')
            .then(listing => {
                const listingCount = Cypress.$(listing).length;
                expect(listing).to.have.length(listingCount);
            });
        const tableLength = cy.get('[data-testid="common-table-row"]').its("length")
        console.log(tableLength)
        cy.get('[data-testid="common-table-row"]')
            .should('have.length.at.least', 1)
            .eq(0)
            .click()
        cy.get('[data-testid="common-textarea"]')
            .eq(0)
            .click()
            .focus()
            .clear()
            .type("test test test")
        cy.get('[data-testid="common-button"]')
            .should('have.length.at.least', 4)
            .eq(1)
            .click()
        cy.get('.rnc__notification-content').should("have.length.at.least", 1).should('have.text', 'Uspesno ste izmenili ugovor.')
    })

    it("agreement page => table click => add new agreement point", () => {
        cy.wait(500)
        cy.get('[data-testid="common-table-row"]')
            .should('have.length.at.least', 1)
            .eq(0)
            .click()
        cy.get('[data-testid="common-button"]')
            .eq(3)
            .click()
        cy.get('[data-testid="common-select"]')
            .eq(1)
            .select('USD')
        cy.get('[data-testid="common-text-field"]')
            .eq(4)
            .click()
            .focus()
            .type("1000")
        cy.get('[data-testid="common-select"]')
            .eq(2)
            .select(1)
        cy.get('#headlessui-combobox-input-1')
            .click()
            .focus()
            .type("AAPL")
        cy.get('[data-testid="common-text-field"]')
            .eq(5)
            .click()
            .focus()
            .type("10")
        cy.get('[data-testid="common-button"]')
            .eq(5)
            .click()
        //cy.get('.rnc__notification-content').should("have.length.at.least", 1).should('have.text', 'Uspesno ste dodali stavku.')
        cy.get('.rnc__notification-content').should("have.length.at.least", 1)
    })

    it("agreement page => table click => delete agreement", () => {
        cy.wait(500)
        cy.get('[data-testid="common-table-row"]')
            .should('have.length.at.least', 1)
            .eq(0)
            .click()
        cy.get('[data-testid="common-button"]')
            .eq(0)
            .click()
        cy.get('.rnc__notification-content').should("have.length.at.least", 1)
    })
})