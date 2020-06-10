package handlers

import (
	"bookmarks/server"
	"log"

	"github.com/gofiber/fiber"
	"golang.org/x/crypto/bcrypt"
)

type user struct {
	id                 int
	username, password string
}

var dummyUsers = []user{
	{
		id: 1, username: "alinnert",
		// 123
		password: "$2y$13$OK.jjBUEnPPzqCQtnZeODe6E3tYUzJcaWZKYmAh5BTdxx15mfzcna",
	},
	{
		id: 2, username: "foobar",
		// baz
		password: "$2y$12$CF5rFBk/iBIIC37gBeQVfOqxUM8O6nQVfBeLNiicstwSQhkRxdNgy",
	},
}

func getDummyUserByUsername(username string) *user {
	for i := range dummyUsers {
		if dummyUsers[i].username == username {
			return &dummyUsers[i]
		}
	}
	return nil
}

// PostAuthLogin POST /auth/login
func PostAuthLogin(c *fiber.Ctx, s *server.Server) server.HandleResult {
	type requestBody struct {
		Username string
		Password string
	}

	var body = requestBody{}
	if err := c.BodyParser(&body); err != nil {
		log.Fatal(err)
	}

	var fetchedUser = getDummyUserByUsername(body.Username)
	if fetchedUser == nil {
		return server.HandleResult{Status: 401, Body: "user not found"}
	}

	// Passwort generieren:
	// var bytes, err = bcrypt.GenerateFromPassword([]byte(password), 14)

	if err := bcrypt.CompareHashAndPassword(
		[]byte(fetchedUser.password), []byte(body.Password),
	); err != nil {
		return server.HandleResult{Status: 401, Body: err.Error()}
	}

	return server.HandleResult{Body: "Username: " + fetchedUser.username}
}
