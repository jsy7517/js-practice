/* eslint-disable no-undef */
Cypress.Commands.add('saveVideos', (videoCount) => {
  for (let i = 0; i < videoCount; i++) {
    cy.get('.video-item')[i].find('.video-item__watch_button').click();
  }
});
