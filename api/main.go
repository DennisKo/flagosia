package main

import (
	"ecosia/flagosia/controllers"
	"ecosia/flagosia/data"

	"github.com/gin-gonic/gin"
)

func setupRouter() *gin.Engine {
	r := gin.Default()

	r.GET("/flags", controllers.FindFlags)
	r.POST("/flags", controllers.CreateFlag)
	r.DELETE("/flags", controllers.DeleteFlag)
	r.PUT("/flags", controllers.UpdateFlag)

	return r
}

func main() {
	r := setupRouter()

	data.ConnectDatabase()

	r.Run(":8080")
}
