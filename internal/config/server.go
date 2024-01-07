package config

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/krishnapramodaradhi/xpressbuy/internal/handler"
	"github.com/krishnapramodaradhi/xpressbuy/internal/util"
)

type Server struct {
	listenAddr string
	db         *sql.DB
}

func (s Server) Run() {
	cwd, _ := os.Getwd()
	r := mux.NewRouter()
	r.HandleFunc("/", util.WithError(handler.IndexPage))
	r.HandleFunc("/products", util.WithError(handler.ProductsPage))
	r.HandleFunc("/products/{id}", util.WithError(handler.ProductDetailPage))
	r.HandleFunc("/wishlist", util.WithError(handler.WishlistPage))
	r.HandleFunc("/cart", util.WithError(handler.CartPage))
	r.PathPrefix("/").Handler(http.FileServer(http.Dir(cwd + "/assets/")))

	log.Println("Server started on port", s.listenAddr)
	log.Fatal(http.ListenAndServe(s.listenAddr, r))
}

func NewServer(listenAddr string, db *sql.DB) *Server {
	return &Server{
		listenAddr: listenAddr,
		db:         db,
	}
}
