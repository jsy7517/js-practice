Cypress.Commands.add('submitPurchasePrice', (purchasePrice) => {
  cy.get('#input-purchase-price')
    .clear()
    .type(purchasePrice)
    .parent()
    .parent()
    .submit();
});

Cypress.Commands.add('inputWinningNumbers', (n1, n2, n3, n4, n5, n6, bonus) => {
  cy.get('[data-lotto-idx]')
    .clear()
    .first()
    .type(n1)
    .next()
    .type(n2)
    .next()
    .type(n3)
    .next()
    .type(n4)
    .next()
    .type(n5)
    .next()
    .type(n6);
});

Cypress.Commands.add('inputBonusNumber', (bonusNumber) => {
  cy.get('.bonus-number').type(bonusNumber);
});
