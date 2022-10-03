import { cy, expect } from 'local-cypress';

describe('feed', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should have a list of cards with correct src attributes', () => {
    //  when visiting the page the data-testid="feed-layout" should be visible
    cy.get('[data-testid="feed-layout"]').should('be.visible');

    //  the feed-layout should have a list of cards
    cy.get('[data-testid="feed-layout-main"] [data-testid="post-card"]').should('have.length', 25);
    //  each card should have an image with the data-testid="post-image"
    cy.get('[data-testid="feed-layout-main"] [data-testid="post-image"]').should('have.length', 25);
    //  each post-image should have a src attribute that has a base64 encoded image placeholder when waiting for the image to load
    cy.get('[data-testid="feed-layout-main"]').each((el, i) => {
      // each element should have a data-testid="post-image"
      cy.get('[data-testid="post-card"]').should('have.length', 25);
      cy.get('[data-testid="post-image"]').invoke('attr', 'src').should('include', 'cloudfront');
      //the first element should have a loading attr of "eager"
      if (i === 0) {
        cy.get('[data-testid="post-image"]').invoke('attr', 'loading').should('eq', 'eager');
      }
      if (i > 10 && i < 20) {
        cy.get('[data-testid="post-image"]').invoke('attr', 'loading').should('eq', 'lazy');
      }
    });
    // scrolling down on the page should load 25 more images after we roll down the page
    cy.scrollTo('bottom');
    cy.get('[data-testid="feed-layout-main"] [data-testid="post-image"]').should('have.length.at.least', 50);
    // scroll again
    cy.scrollTo('bottom');
    // make sure that all urls are unique
    let srcs = new Set();
    cy.get('[data-testid="feed-layout-main"] [data-testid="post-image"]')
      .each((el, i) => {
        const src = el.attr('src');
        srcs.add(src);
      })
      .then(() => {
        // check the length of all the posts against the src
        cy.get('[data-testid="feed-layout-main"] [data-testid="post-image"]').should('have.length', srcs.size);
      });
  });
});
