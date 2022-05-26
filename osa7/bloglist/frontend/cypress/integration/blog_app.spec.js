describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Jenni J',
      username: 'jennijii',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('jennijii')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('login succeeded')
      cy.contains('logged in as Jenni J')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('jennijii')
      cy.get('#password').type('arvoitus')
      cy.get('#login-button').click()
      cy.contains('Log in to application')
      cy.contains('wrong username or password')
    })
    it('fails with red notice color', function() {
      cy.contains('login').click()
      cy.get('#username').type('hakkeri')
      cy.get('#password').type('arvoitus')
      cy.get('#login-button').click()

      cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username:'jennijii', password:'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title-input').type('Blog title')
      cy.get('#author-input').type('Blog author')
      cy.get('#url-input').type('Blog url')
      cy.contains('create').click()
      cy.contains('Added new blog: Blog title by Blog author')
      cy.contains('Blog title')
      cy.contains('Blog author')
    })

    describe('new blog exists', function() {
      beforeEach(function() {
        cy.createBlog({ title:'Blog title', author:'Blog author', url:'Blog url' })
      })
      it('it can be liked', function() {
        cy.contains('view').click()
        cy.contains('likes: 0')
        cy.contains('like').click()
        cy.contains('likes: 1')
      })
      it('it can be deleted by the user who added it', function () {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.contains('Blog successfully removed')
      })
    })

    describe('several blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({ title:'Blog 1', author:'One', url:'Blog url' })
        cy.createBlog({ title:'Blog 2', author:'Two', url:'Blog url' })
        cy.createBlog({ title:'Blog 3', author:'Three', url:'Blog url' })
      })
      it('the arrangement of the blogs correlates to the number of likes', function() {
        cy.get('.toggleButton').eq(0).click()
        cy.get('.toggleButton').eq(1).click()
        cy.get('.toggleButton').eq(2).click()
        cy.get('.likeButton').eq(2).click()
        cy.get('.likeButton').eq(0).click()
        cy.get('.likeButton').eq(1).click()

        cy.get('.blog').eq(0).should('contain', 'Blog 3')
        cy.get('.blog').eq(1).should('contain', 'Blog 1')
        cy.get('.blog').eq(2).should('contain', 'Blog 2')

        cy.get('.likeButton').eq(1).click()
        cy.get('.likeButton').eq(1).click()

        cy.get('.blog').eq(0).should('contain', 'Blog 1')
        cy.get('.blog').eq(1).should('contain', 'Blog 3')
        cy.get('.blog').eq(2).should('contain', 'Blog 2')


      })


    })

  })
})