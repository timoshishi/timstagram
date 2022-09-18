import { createRandomUserCreds } from '../utils';
import { cy, expect } from 'local-cypress';

describe('a user can create a post', () => {
  const { username, email, password } = createRandomUserCreds();

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('can create a post', () => {
    cy.createUser({ username, email, password });
    cy.userIsLoggedOut();
    cy.loginUser({ email, password });
    cy.userIsLoggedIn();

    cy.get('[data-testid="Post-link"]').click();
    expect(cy.contains(/an image/i)).to.exist;
    cy.get('input[type="file"]').attachFile('../fixtures/aspect-1-1.jpg');
    cy.contains(/next/i).click();
    cy.get('textarea').type('this is a test post');
    cy.get('button[type="submit"]').click();
    cy.contains(/success/i, {
      timeout: 10000,
    }).should('be.visible');
    expect(cy.contains(/an image/i)).to.exist;
    cy.closeModal();
  });
});
