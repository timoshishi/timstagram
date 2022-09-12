/// <reference types="cypress" />

import axios from 'axios';
import 'cypress-file-upload';
import { Cypress, cy, expect } from 'local-cypress';
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
// Cypress.Commands.add('loginApi', (email, pw) => {})
// -- This is a parent command --

const supabasePublicUrl = 'http://localhost:54321/auth/v1/token?grant_type=password&redirect_to=%2Ffeed';
Cypress.Commands.addAll({
  createUser({ username, email, password }: Record<string, string>) {
    cy.contains(/Sign up/i).click();
    cy.wait(400);
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.get('.chakra-modal__close-btn').click();
  },
  loginUser({ email, password }: { email: string; password: string }) {
    cy.contains(/Sign In/i).click();
    cy.wait(400);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
  },
});

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      loginApi(email: string, password: string): Chainable<void>;
      drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;
      dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;
      visit(
        originalFn: CommandOriginalFn<keyof Chainable>,
        url: string,
        options: Partial<VisitOptions>
      ): Chainable<Element>;
      createUser({ username, email, password }: Record<string, string>): Chainable<void>;
      loginUser({ email, password }: { email: string; password: string }): Chainable<void>;
      attachFile(path: string): Chainable<void>;
    }
  }
}
export {};
