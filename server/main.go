package main

import (
	"encoding/json"
	"errors"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gorilla/csrf"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()

	csrfMiddleware := csrf.Protect(
		[]byte("conga-con-moi-no"),
		csrf.Path("/"),
		csrf.CookieName("_csrf"),
		csrf.MaxAge(0), // Session
	)
	api := r.PathPrefix("/api").Subrouter()
	api.Use(csrfMiddleware)
	api.HandleFunc("/csrf-token", func(rw http.ResponseWriter, r *http.Request) {
		response := &struct {
			CsrfToken string
		}{
			CsrfToken: csrf.Token(r),
		}
		json.NewEncoder(rw).Encode(response)
	}).Methods("GET")

	api.HandleFunc("/token", CreateAccessToken).Methods("POST")
	secureApi := api.PathPrefix("/secure").Subrouter()
	secureApi.HandleFunc("/user/{id}", GetUser).Methods("POST")

	secureApi.Use(jwtMiddleware)

	handler := handlers.CORS(
		handlers.AllowedOrigins([]string{"http://localhost:3000", "http://127.0.0.1:3000"}),
		handlers.AllowedMethods([]string{http.MethodPost, http.MethodGet, http.MethodPut, http.MethodDelete}),
		handlers.AllowedHeaders([]string{"Authorization", "Content-Type", "Accept-Encoding", "Accept"}),
	)(r)

	http.ListenAndServe(":8000", handler)
}

func jwtMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
		access_token := ""
		for _, cookie := range r.Cookies() {
			if cookie.Name == "token" {
				access_token = cookie.Value
				break
			}
		}

		if access_token == "" {
			http.Error(rw, "Forbidden", http.StatusForbidden)
			return
		}

		if err := VerifyToken(access_token); err != nil {
			http.Error(rw, "Forbidden", http.StatusForbidden)
		} else {
			next.ServeHTTP(rw, r)
		}

	})
}

var (
	secret = "access_token_secret"
)

type Credentials struct {
	Password string `json:"password"`
	Username string `json:"username"`
}

type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

func VerifyToken(access_token string) error {
	token, err := jwt.Parse(access_token, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("error")
		}
		return []byte(secret), nil
	})

	if err != nil {
		return err
	}

	if token.Valid {
		return nil
	}

	return errors.New("token invalid")

}
func CreateAccessToken(w http.ResponseWriter, r *http.Request) {
	var creds Credentials
	// Get the JSON body and decode into credentials
	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		// If the structure of the body is wrong, return an HTTP error
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	expirationTime := time.Now().Add(5 * time.Minute)
	claims := &Claims{
		Username: creds.Username,
		StandardClaims: jwt.StandardClaims{
			// In JWT, the expiry time is expressed as unix milliseconds
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString([]byte(secret))
	if err != nil {
		// If there is an error in creating the JWT return an internal server error
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    tokenString,
		Expires:  expirationTime,
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteNoneMode,
	})

	response := &struct {
		Token string
	}{
		Token: tokenString,
	}
	json.NewEncoder(w).Encode(response)
}

func GetUser(w http.ResponseWriter, r *http.Request) {
	// Authenticate the request, get the id from the route params,
	// and fetch the user from the DB, etc.

	// Get the token and pass it in the CSRF header. Our JSON-speaking client
	// or JavaScript framework can now read the header and return the token in
	// in its own "X-CSRF-Token" request header on the subsequent POST.

	// w.Header().Set("X-CSRF-Token", csrf.Token(r))

	user := &struct {
		Id   int
		Name string
	}{
		Id:   1,
		Name: "chauhm",
	}
	b, err := json.Marshal(user)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	w.Write(b)
}
