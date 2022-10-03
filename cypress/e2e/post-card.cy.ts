import { cy, expect } from 'local-cypress';
import { createRandomUserCreds } from '../utils';

describe('post-card', () => {
  describe('liking posts', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/');
    });

    it('can like a post', () => {
      const user1 = createRandomUserCreds();
      cy.createUser(user1);
      cy.loginUser(user1);
      cy.userIsLoggedIn();

      cy.get('button[name="post-card-like"]').first().click();
      cy.get('[data-testid="likes-text"]').should('exist').invoke('text').should('contain', 'like');
    });

    it.only('can like a post', () => {
      const user1 = createRandomUserCreds();
      cy.createUser(user1);
      cy.loginUser(user1);
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
      // if there was no text in the like count, the likeCount should now contain 1
    });
  });
});
