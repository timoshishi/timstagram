console.log(process.env);
const testUsername = 'testuser' + Math.floor(Math.random() * 10000);
const testEmail = Math.floor(Math.random() * 10000) + 'test12@test.com';
const testPassword = 'password';
describe('It creates and logs in a user', () => {
  it('visits the app root url', () => {
    cy.visit('http://localhost:3000/');
  });
  it('creates a new user', () => {
    cy.contains(/Sign up/i).click();
    cy.wait(400);
    cy.get('input[name="username"]').type(testUsername);
    cy.get('input[name="email"]').type(testEmail);
    cy.get('input[name="password"]').type(testPassword);
    cy.get('button[type="submit"]').click();
    cy.get('button[aria-label="Close"]').click();
    cy.wait(1000);
    cy.contains(/Sign In/i).click();
    cy.get('input[name="email"]').type(testEmail);
    cy.get('input[name="password"]').type(testPassword);
    cy.contains(/Sign in/).click();
    cy.contains(/welcome/i).should('be.visible');
    cy.wait(1000);
    cy.get('[data-testid="user-avatar"]').should('be.visible');
    cy.get('button[aria-role="profile-menu-button"]').click();
    // cy.contains(/Sign out/i).click();
  });
  // it('logs out', () => {
  // });
});
export {};
