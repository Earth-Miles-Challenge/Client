describe('Login page', () => {
	it('displays Strava connect button and login form', () => {
	  cy.visit('/login');

	  cy.get('.form-container h1')
      .contains('Get Started');

    cy.get('.login-container h2')
      .contains('Log in');

    cy.get('.login-container p:first-of-type')
      .contains('If you have connected your account previously, sign in below.')

    cy.get('.login-container')
      .contains('.form-field', 'Email')
      .get('input[name=email]');

    cy.get('.login-container')
      .contains('.form-field', 'Password')
      .get('input[name=password]');

    cy.get('.connect-container h2')
      .contains('Connect Strava');

    cy.get('.connect-container p:first-of-type')
      .contains('First time here? Connect Strava to get started.')

    cy.get('.connect-container .strava-connect a')
      .should('have.attr', 'href')
      .and((href) => {
        Cypress.minimatch(href, 'https://www.strava.com/oauth/authorize?client_id=*response_type=code&redirect_uri=*&approval_prompt=auto&scope=profile:read_all,activity:read_all,activity:write&state=*')
      });

    cy.get('.connect-container .strava-connect svg')
		  .should('have.attr', 'aria-label', 'Strava Connect button');
  });
});