package main

import (
	"ecosia/flagosia/controllers"
	"ecosia/flagosia/data"
	"ecosia/flagosia/middleware"

	"github.com/gin-gonic/gin"
)

func setupRouter() *gin.Engine {
	r := gin.Default()
	r.Use(middleware.CORSMiddleware())

	r.GET("/flags", controllers.FindFlags)
	r.POST("/flags", controllers.CreateFlag)
	r.DELETE("/flags", controllers.DeleteFlag)
	r.PUT("/flags", controllers.UpdateFlag)

	r.GET("/check-flags", controllers.CheckFlags)
	return r
}

func main() {
	r := setupRouter()

	data.ConnectDatabase()

	r.Run(":8080")
}
