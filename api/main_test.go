package main

import (
	"ecosia/flagosia/data"
	"ecosia/flagosia/models"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGetFlags(t *testing.T) {
	router := setupRouter()
	data.ConnectDatabase()

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/flags", nil)
	router.ServeHTTP(w, req)
	assert.Equal(t, 200, w.Code)

	exp := struct{ data []models.Flag }{
		data: nil,
	}
	fmt.Println("Employee 3", exp)
	assert.Equal(t, "{\"data\":[]}", w.Body.String())
}

func TestGetFlagsNonEmpty(t *testing.T) {
	router := setupRouter()
	data.ConnectDatabase()
	flag := models.Flag{Name: "testName", Enabled: false, Value: ""}

	data.DB.Create(&flag)
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/flags", nil)
	router.ServeHTTP(w, req)
	assert.Equal(t, 200, w.Code)

	exp := struct{ data []models.Flag }{
		data: nil,
	}
	fmt.Println("Employee 3", exp)
	assert.Equal(t, "{\"data\":[{\"ID\":1,\"CreatedAt\":\"2022-07-07T09:31:32.298076+02:00\",\"UpdatedAt\":\"2022-07-07T09:31:32.298076+02:00\",\"DeletedAt\":null,\"Name\":\"testName\",\"Enabled\":false,\"Value\":\"\"}]}", w.Body.String())

}
