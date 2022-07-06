package main

import (
	"ecosia/flagosia/controllers"
	"ecosia/flagosia/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"data": "Yoi world"})
	})

	models.ConnectDatabase()

	r.GET("/flags", controllers.FindFlags)
	r.POST("/flags", controllers.CreateFlag)

	r.Run()
}
