describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('Login').click()
    })
})

describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.visit('http://localhost:3000')
    })

    it('User is created and login works', function() {
        const newUser = {
            username: "testuser",
            name: "testuser",
            password: "123456"
        }

        cy.request('POST', 'http://localhost:3003/api/users', newUser)
        cy.visit('http://localhost:3000')
        cy.contains('Login').click()
        cy.get('#Username').type('testuser')
        cy.get('#Password').type('123456')
        cy.contains('Log me in').click()
        cy.contains('User testuser successfully logged in.')
    })
})