package server

import (
	"github.com/gofiber/fiber"
	"github.com/gofiber/session"
)

// Server is the global server object
type Server struct {
	App     *fiber.App
	Session *session.Session
}
