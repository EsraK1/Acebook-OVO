describe("Make a post", () => {

  it("Makes a post", () => {
    cy.signup("someone@example.com", "password", "newuser")
    cy.visit("/login");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.intercept('POST', '/posts', { message: "OK" }).as("addedPostReq");
    
    cy.get("#postarea").type("fake post text 123");
    cy.get("#submit").click();
    cy.wait('@addedPostReq').then( interception => {
      expect(interception.response.body.message).to.eq("OK")
    });
  })
  });
