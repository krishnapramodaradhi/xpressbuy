package main

import (
	"github.com/krishnapramodaradhi/xpressbuy/internal/config"
)

func main() {
	server := config.NewServer(":8443", nil)
	server.Run()
}
