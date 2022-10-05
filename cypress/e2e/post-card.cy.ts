import { cy } from 'local-cypress';
import { createRandomUserCreds } from '../utils';

describe('post-card', () => {
  const { password, email, username } = createRandomUserCreds();

  it('creates a fresh user', () => {
    cy.visit('http://localhost:3000/');

    cy.createUser({ password, email, username });
    cy.loginUser({ email, password });
    cy.userIsLoggedIn();
  });

  it('will show the auth modal if you try to like and are not logged in', () => {
    cy.visit('http://localhost:3000/');

    cy.get('button[name="post-card-like"]').first().click();
    cy.contains(/Sign up to/i).should('exist');
  });

  it('can like a post', () => {
    cy.visit('http://localhost:3000/');

    cy.loginUser({ email, password });
    cy.userIsLoggedIn();

    cy.get('button[name="post-card-like"]').first().click();
    // cy.get('[data-testid="likes-text"]').should('exist').invoke('text').should('contain', 'like');
  });

  it('can like and unlike posts and counts persist across users', () => {
    cy.loginUser({ email, password });
    cy.userIsLoggedIn();
    // get the first card in the post-feed
    cy.get('[data-testid="post-card"]').first().as('firstPostCard');
    // get the button with the name post-card-like from the first card
    cy.get('@firstPostCard').find('button[name="post-card-like"]').as('likeButton');
    // get the like count from the first card from the text element with likes-text
    //the button should not be disabled and it should not have an svg element with a background color
    // clicking the button should change the svg color to red
    cy.get('@likeButton').click();
    cy.get('@likeButton').should('be.disabled').and('have.descendants', 'svg');
    cy.get('@likeButton').should('not.be.disabled').and('have.descendants', 'svg');
    /* TODO: update these tests to work with new optimistic UI
      cy.get('@firstPostCard')
        .find('[data-testid="likes-text"]')
        .as('likeCount1')
        .invoke('text')
        .then((text) => {
          const likeCount1 = parseInt(text);
          cy.get('@likeButton').click();
          cy.get('@firstPostCard')
            .find('[data-testid="likes-text"]')
            .as('likeCount2')
            .invoke('text')
            .then((text) => {
              const likeCount2 = parseInt(text);
              expect(likeCount1).to.equal(likeCount2 + 1);
              // unlike the post
              cy.get('@likeButton').click();
              cy.get('@firstPostCard')
                .find('[data-testid="likes-text"]')
                .as('likeCount3')
                .invoke('text')
                .then((text) => {
                  const likeCount3 = parseInt(text);
                  expect(likeCount3).to.equal(likeCount1);
                });
            });
        });
        */
  });
});
