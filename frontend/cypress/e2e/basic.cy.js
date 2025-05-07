describe('Basic Navigation', () => {
  it('should load the homepage', () => {
    cy.visit('/');
    cy.contains('Fitnity').should('be.visible');
  });

  it('should navigate to the Premium page', () => {
    cy.visit('/');
    cy.get('a[href="/premium"]').click();
    cy.contains('Premium Membership').should('be.visible');
  });
});