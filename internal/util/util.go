package util

import (
	"net/http"
	"os"
	"text/template"
)

type HandlerFunc func(w http.ResponseWriter, r *http.Request) error

func ExecuteTemplate(w http.ResponseWriter, templateName string, data any) error {
	cwd, _ := os.Getwd()
	tmpl := template.Must(template.ParseFiles(cwd+"/internal/views/"+templateName, cwd+"/internal/views/common.html"))
	return tmpl.Execute(w, data)
}

func WithError(f HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		f(w, r)
	}
}
