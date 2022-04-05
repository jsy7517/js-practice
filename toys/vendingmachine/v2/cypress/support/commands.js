let LOCAL_STORAGE_MEMORY = {};
Cypress.Commands.add('saveLocalStorage', () => {
	Object.keys(localStorage).forEach((key) => {
		LOCAL_STORAGE_MEMORY[key] = localStorage[key];
	});
});
Cypress.Commands.add('restoreLocalStorage', () => {
	Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
		localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
	});
});

Cypress.Commands.add('productInput', () => {
	return cy.get('#product-name-input');
});

Cypress.Commands.add('addNewProduct', (name, price, quantity) => {
	return cy
		.productInput()
		.eq(0)
		.clear()
		.type(name)
		.next()
		.clear()
		.type(price)
		.next()
		.clear()
		.type(quantity)
		.parent()
		.parent()
		.submit();
});

Cypress.Commands.add('productListShould', (idx, name, price, quantity) => {
	cy.productList()
		.eq(idx)
		.find('td')
		.eq(0)
		.should('have.text', name)
		.next()
		.should('have.text', price)
		.next()
		.should('have.text', quantity);
});

Cypress.Commands.add('productList', () => {
	return cy.get('#current-product-table tr');
});

Cypress.Commands.add('clickMenu', (selector) => {
	return cy.get(selector).click();
});

Cypress.Commands.add('coinList', () => {
	return cy.get('#current-charge-table tbody tr td');
});

Cypress.Commands.add('chargeMachine', (price) => {
	cy.get('#vending-machine-charge-input').clear().type(price).parent().parent().submit();
});

Cypress.Commands.add('machineChargeAmount', () => {
	return cy.get('#vending-machine-charge-amount');
});
