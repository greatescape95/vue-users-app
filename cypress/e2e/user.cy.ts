import { type IUser } from "../../src/models";

describe('User CRUD actions', () => {

  it('creates new user', function () {
    cy.visit('/users');
    cy.url().should('include', '/users');

    cy.get('.cy-new-button').click();
    cy.url().should('include', '/users/new');


    cy.fixture('user.fixture').then((user: IUser) => {
      cy.get('input[name=firstName]').type(user.profile.firstName);
      cy.get('input[name=lastName]').type(user.profile.lastName);
      cy.get('input[name=username]').type(user.username);

      cy.get('.cy-submit-user').click();
      cy.wait(2000);
      cy.url().should('include', '/users');
    });
  });

  it('views created user', function () {
    cy.fixture('user.fixture').then((user: IUser) => {
      cy.visit('/users');
      cy.wait(2000);

      cy.get('.cy-search').type(user.username);

      cy.get('button').contains('View Details').click();
      cy.url().should('include', '/users/view');

      cy.get('div').contains(user.profile.firstName).should('exist');
      cy.get('div').contains(user.profile.lastName).should('exist');

      cy.get('.cy-button-back').click();
      cy.wait(2000);
      cy.url().should('include', '/users');
    });
  });

  it('edits created user', function () {
    cy.fixture('user.fixture').then((user: IUser) => {
      cy.visit('/users');
      cy.wait(2000);

      cy.get('.cy-search').type(user.username);

      cy.get('button').contains('Edit').click();
      cy.url().should('include', '/users/edit');

      cy.get('input[name=firstName]').clear().type(user.profile.firstName.slice(0, 10));
      cy.get('input[name=firstName]').clear().type(user.profile.lastName.slice(0, 10));

      cy.get('.cy-submit-user').click();
      cy.wait(2000);
      cy.url().should('include', '/users');
    });
  });

  it('deletes created user', function () {
    cy.fixture('user.fixture').then((user: IUser) => {
      cy.visit('/users');
      cy.wait(2000);

      cy.get('.cy-search').type(user.username);

      cy.get('button').contains('Delete').click();
      cy.get('button').contains('Confirm').click();

      cy.wait(2000);
      cy.url().should('include', '/users');
      cy.get('button').contains('Delete').should('not.exist');
    });
  });
});