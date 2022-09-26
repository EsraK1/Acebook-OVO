import Post from './Post'

describe("Post", () => {
  it('renders a post with a message', () => {
    cy.mount(<Post navigate={Post}/>)
    cy.mount(<Post post={{_id: 1, message: "Hello, world", datePosted: '2022-09-26T13:33:36.855Z', postauthor: {username: 'Tim'}}}/>);
    cy.get('[data-cy="post"]').should('contain.text', "Hello, world")
  })

  it('renders a like to a post', () => {
    cy.mount(<Post post={{_id: 1, message: "Hello, world", datePosted: '$oid":"6331aa301b5fd65c138c04df', postauthor: {username: 'Tim'}}}/>);

    cy.intercept('PUT', '/posts', { message: "OK" }).as("addLikeReq")

    cy.get('[id="likeButton"]').click();
    cy.wait('@addLikeReq').then (interception => {
      expect(interception.response.body.message).to.eq("OK")
    })
  })

})



