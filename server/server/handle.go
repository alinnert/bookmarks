package server

import (
	"github.com/gofiber/fiber"
)

// HandleResult represents a result struct returned from route handlers.
type HandleResult struct {
	Status int
	Body   interface{}
}

// Handler is the actual handler function
type Handler func(*fiber.Ctx, *Server) HandleResult

// Handle is a wrapper for actual handlers
func (s *Server) Handle(handler Handler) func(*fiber.Ctx) {
	return func(c *fiber.Ctx) {
		var result = handler(c, s)
		if result.Status == 0 {
			result.Status = 200
		}
		c.Status(result.Status).Send(result.Body)
	}
}
