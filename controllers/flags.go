package controllers

import (
	"ecosia/flagosia/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GET /flags
// Get all flags
func FindFlags(c *gin.Context) {
	var flags []models.Flag
	models.DB.Find(&flags)

	c.JSON(http.StatusOK, gin.H{"data": flags})
}

type CreateFlagInput struct {
	Name string `json:"name" binding:"required"`
}

func CreateFlag(c *gin.Context) {
	var input CreateFlagInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	flag := models.Flag{Name: input.Name}

	models.DB.Create(&flag)

	c.JSON(http.StatusOK, gin.H{"data": flag})
}
