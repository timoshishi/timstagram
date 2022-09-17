/* eslint-disable */
import nanoid from 'nanoid';
import { createRandomUserCreds } from '../utils';
import { cy, expect } from 'local-cypress';

describe('a user can edit their profile', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('can update the text of a users profile', () => {
    const { username, email, password } = createRandomUserCreds();
    cy.createUser({ username, email, password });
    cy.loginUser({ email: 'test1@test.com', password: 'password' });
    cy.userIsLoggedIn();

    const updateText = nanoid();
    cy.get('[data-testid="profile-dropdown-button"]').click();
    cy.contains(/update profile/i).click();
    cy.get('h2')
      .invoke('text')
      .then((text1) => {
        cy.contains(/update bio/i).click();
        cy.get('textarea').clear().type(updateText);
        cy.get('button[type="submit"]').click();
        cy.contains(/update bio/i).should('be.visible');
        cy.get('h2')
          .invoke('text')
          .should((text2) => {
            expect(text1).not.to.eq(text2);
            expect(text2.includes(updateText)).to.be.true;
            expect(text2.includes(text1)).to.be.false;
          });
      });
  });

  it('can change a users avatar', () => {
    const { username, email, password } = createRandomUserCreds();
    cy.createUser({ username, email, password });
    cy.loginUser({ email, password });
    cy.userIsLoggedIn();

    cy.get('[data-testid="profile-dropdown-button"]').click();
    cy.contains(/update profile/i).click();

    let firstImage = '';
    let secondImage = '';
    cy.get('.chakra-avatar')
      .should('be.visible')
      .then((src) => {
        cy.get('[data-testid="edit-avatar"]').click();
        cy.get('input[type="file"]').attachFile('../fixtures/aspect-1-1.jpg');
        cy.get('[data-testid="cropper-next-button"]').click();
        cy.get('.chakra-avatar__img', { timeout: 15000 })
          .invoke('attr', 'src')
          .should((src2) => {
            expect(src).not.to.eq(src2);
            if (typeof src2 === 'string') {
              firstImage = src2;
            }
          })
          .then(() => {
            cy.get('[data-testid="edit-avatar"]').click();
            cy.get('input[type="file"]').attachFile('../fixtures/aspect-4-3.jpg');
            cy.get('[data-testid="cropper-next-button"]').click();
            cy.get('.chakra-avatar__img', { timeout: 15000 })
              .invoke('attr', 'src')
              .should((src3) => {
                cy.wait(4000);
                expect(src).not.to.eq(src3);
                if (typeof src3 === 'string') {
                  secondImage = src3;
                }
                expect(firstImage).not.to.eq(secondImage);
              });
          });
      });
  });

  it('can delete a user', () => {
    const { username, email, password } = createRandomUserCreds();
    cy.createUser({ username, email, password });
    cy.loginUser({ email, password });
    cy.wait(1000);
    cy.get('[data-testid="profile-dropdown-button"]').click();
    cy.contains(/update profile/i).click();
    cy.contains(/delete account/i).click();
    cy.get('input').type('permanently delete');
    cy.contains(/delete account/i).click();
    cy.contains(/sorry to see you go/i).should('be.visible');
    cy.contains(/sign up/i).should('be.visible');
    cy.loginUser({ email, password });
    cy.contains(/invalid login credentials/i).should('be.visible');
  });
});
