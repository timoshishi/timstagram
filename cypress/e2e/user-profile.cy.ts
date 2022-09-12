import { nanoid } from 'nanoid';
import { createRandomUserCreds } from '../utils';
import { cy, expect } from 'local-cypress';

describe('a user can edit their profile', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('can update the text of a users profile', () => {
    cy.loginUser({ email: 'test1@test.com', password: 'password' });
    const updateText = nanoid();

    cy.wait(1000);
    cy.get('[data-testid="profile-dropdown-button"]').click();
    cy.contains(/update profile/i).click();
    cy.get('h2')
      .invoke('text')
      .then((text1) => {
        // do more work here
        cy.contains(/update bio/i).click();
        // click the button which changes the div's text
        // cy.get('button').click()
        cy.get('textarea').clear().type(updateText);
        cy.get('button[type="submit"]').click();
        // grab the div again and compare its previous text
        // to the current text
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
    cy.loginUser({ email: 'test1@test.com', password: 'password' });

    cy.wait(1000);
    cy.get('[data-testid="profile-dropdown-button"]').click();
    cy.contains(/update profile/i).click();

    cy.wait(400);
    cy.get('div span img')
      .invoke('attr', 'src')
      .then((src) => {
        cy.get('[data-testid="edit-avatar"]').click();
        cy.get('input[type="file"]').attachFile('../fixtures/aspect-1-1.jpg');
        cy.contains(/submit/i).click();
        cy.wait(3000);
        cy.get('div span img')
          .invoke('attr', 'src')
          .should((src2) => {
            expect(src).not.to.eq(src2);
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
