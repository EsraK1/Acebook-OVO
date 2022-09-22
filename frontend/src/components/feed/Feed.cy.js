import Feed from './Feed'
const navigate = () => {}

describe("Feed", () => {
  it("Calls the /posts endpoint and lists all the posts", () => {
    window.localStorage.setItem("token", "fakeToken")
    cy.mount(<Feed navigate={navigate}/>)
    
    cy.intercept('GET', '/posts', (req) => {
        req.reply({
          statusCode: 200,
          body: { posts: [
            {_id: 1, message: "Hello, world"},
            {_id: 2, message: "Hello again, world"}
          ] }
        })
      }
    ).as("getPosts")
    
    cy.wait("@getPosts").then(() =>{
      cy.get('[data-cy="post"]')
      .should('contain.text', "Hello, world")
      .and('contain.text', "Hello again, world")
    })
  })
  
  it("Adding a post buton test", () => {
    window.localStorage.setItem("token", "fakeToken")
    cy.mount(<Feed navigate={navigate}/>)

    cy.intercept('POST', '/posts', { message: "OK" }).as("addedPostReq")
    
    cy.get("#postarea").type("fake post text 123");
    cy.get("#submit").click();
    cy.wait('@addedPostReq').then( interception => {
      expect(interception.response.body.message).to.eq("OK")
    })
  })
})
