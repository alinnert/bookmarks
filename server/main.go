package main

import (
	"bookmarks/handlers"
	"bookmarks/server"

	"github.com/gofiber/fiber"
	"github.com/gofiber/session"
)

func main() {
	var srv = &server.Server{
		App:     fiber.New(),
		Session: session.New(),
	}

	srv.App.Get("/", srv.Handle(handlers.GetIndex))
	srv.App.Get("/:message", srv.Handle(handlers.GetMessage))
	srv.App.Post("/auth/login", srv.Handle(handlers.PostAuthLogin))

	srv.App.Listen(8000)
}
