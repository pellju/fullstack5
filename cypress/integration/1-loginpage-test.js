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

    it('Login fails with wrong information', function() {
        cy.visit('http://localhost:3000')
        cy.contains('Login').click()
        cy.get('#Username').type('testuser')
        cy.get('#Password').type('12345')
        cy.contains('Log me in').click()
        cy.contains('Error: wrong username or password!')
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


describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.visit('http://localhost:3000')

        const newUser = {
            username: "testuser",
            name: "testuser",
            password: "123456"
        }

        cy.request('POST', 'http://localhost:3003/api/users', newUser)
        cy.visit('http://localhost:3000')
    })
    it('A user who has logged in can create blogs', function() {       

        cy.contains('Login').click()
        cy.get('#Username').type('testuser')
        cy.get('#Password').type('123456')
        cy.contains('Log me in').click()

        cy.get('#title').type('my blog 1')
        cy.get('#author').type('testuser')
        cy.get('#url').type('domain.fi')
        cy.contains('Create new blog').click()
        //cy.contains('Blog my blog 1 has been added.')
    })
})