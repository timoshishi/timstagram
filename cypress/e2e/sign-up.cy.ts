import { createRandomUserCreds } from 'cypress/utils';

describe('Logging in and out', () => {
  const { username, password, email } = createRandomUserCreds();
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('creates a user, signs in and out', () => {
    cy.createUser({ username, email, password });
    cy.contains(/welcome/i).should('be.visible');
    cy.wait(1000);
    cy.loginUser({ email, password });
    cy.wait(1000);
    cy.get('[data-testid="user-avatar"]').should('be.visible');
    cy.get('[data-testid="profile-dropdown-button"]').click();
    cy.contains(/Sign out/i).click();
    cy.get('button[name="signup"]').should('be.visible');
  });

  it('should be able to log back in after coming back to the page', () => {
    cy.loginUser({ email, password });
    cy.wait(1000);
    cy.get('[data-testid="user-avatar"]').should('be.visible');
  });
});

describe.only('failed logins', () => {
  const { username, email, password } = createRandomUserCreds();
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    console.log({ username, email, password });
  });

  it('creates a new user', () => {
    cy.createUser({ username, email, password });
    cy.wait(1000);
  });

  it('shows a warning if you try to create a user with a username that already exists', () => {
    cy.createUser({ username, email, password });
    cy.contains(/Sign up/i).click();
    cy.wait(1000);
    cy.contains(/sorry/i).should('be.visible');
  });

  it('shows an error if you try to log in with the wrong password', () => {
    cy.loginUser({ email, password: 'wrongPass' });
    cy.wait(300);
    cy.contains(/invalid/i).should('be.visible');
  });

  it('shows an error if you try to log in with an invalid email', () => {
    cy.loginUser({ email: 'testy@snuggleBus.com', password });
    cy.wait(1000);
    cy.contains(/invalid/i).should('be.visible');
  });

  it('should be able to log back in after failing logins previously', () => {
    cy.loginUser({ email, password });
    cy.wait(1000);
    cy.get('[data-testid="user-avatar"]').should('be.visible');
  });
});

describe('reset password', () => {
  const { email } = createRandomUserCreds();
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should show an info message if you attempt to change your password starting at the signin view', () => {
    cy.contains(/Sign in/i).click();
    cy.wait(400);
    cy.contains(/forgot your password/i).click();
    cy.get('input[type="email"]').type(email);
    cy.wait(2000);
    cy.get('button[type="submit"]').click();
    cy.contains(/sent you an email/i).should('be.visible');
    cy.contains(/your email for the password reset link/i).should('be.visible');
  });

  it('should be able to be viewed after clicking the link from signup to sign in', () => {
    cy.contains(/Sign up/i).click();
    cy.wait(400);
    cy.contains(/do you have an account/i).click();
    cy.contains(/forgot your password/i).click();
    cy.contains(/send reset password instructions/i).should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
  });
});

export {};
