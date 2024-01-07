package handler

import (
	"net/http"

	"github.com/krishnapramodaradhi/xpressbuy/internal/util"
)

func IndexPage(w http.ResponseWriter, _ *http.Request) error {
	return util.ExecuteTemplate(w, "index.html", nil)
}

func ProductsPage(w http.ResponseWriter, _ *http.Request) error {
	return util.ExecuteTemplate(w, "products.html", nil)
}

func ProductDetailPage(w http.ResponseWriter, _ *http.Request) error {
	return util.ExecuteTemplate(w, "productDetail.html", nil)
}

func WishlistPage(w http.ResponseWriter, _ *http.Request) error {
	return util.ExecuteTemplate(w, "wishlist.html", nil)
}

func CartPage(w http.ResponseWriter, _ *http.Request) error {
	return util.ExecuteTemplate(w, "cart.html", nil)
}
