package handlers

import (
	"bookmarks/server"

	"github.com/gofiber/fiber"
)

// GetIndex GET /
func GetIndex(c *fiber.Ctx, s *server.Server) server.HandleResult {
	return server.HandleResult{
		Body: "Hello, World!",
	}
}

// GetMessage GET /:message
func GetMessage(c *fiber.Ctx, s *server.Server) server.HandleResult {
	var message = c.Params("message")

	if message == "nope" {
		return server.HandleResult{Status: 400, Body: "nopedy nope"}
	}

	return server.HandleResult{Body: "You said: " + message}
}
