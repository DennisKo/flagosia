package controllers

import (
	"ecosia/flagosia/data"
	"ecosia/flagosia/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GET /flags
// Get all flags
func FindFlags(c *gin.Context) {
	var flags []models.Flag
	data.DB.Find(&flags)

	c.JSON(http.StatusOK, gin.H{"data": flags})
}

type CreateFlagInput struct {
	Name    string `json:"name" binding:"required"`
	Enabled bool   `json:"enabled"`
	Value   string `json:"value"`
}

// POST /flags
// Create a flag
func CreateFlag(c *gin.Context) {
	var input CreateFlagInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	flag := models.Flag{Name: input.Name, Enabled: input.Enabled, Value: input.Value}

	result := data.DB.Create(&flag)
	if err := result.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": flag})
}

type DeleteFlagInput struct {
	ID int `json:"id" binding:"required"`
}

func DeleteFlag(c *gin.Context) {
	var input DeleteFlagInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	flag := models.Flag{ID: uint(input.ID)}

	result := data.DB.Delete(&flag)

	if err := result.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": result.Error.Error()})
		return
	}

	c.Status(204)

}

type UpdateFlagInput struct {
	ID      int    `json:"id" binding:"required"`
	Name    string `json:"name" binding:"required"`
	Enabled bool   `json:"enabled"`
	Value   string `json:"value"`
}

func UpdateFlag(c *gin.Context) {
	var input UpdateFlagInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	flag := models.Flag{ID: uint(input.ID)}

	flag.Name = input.Name
	flag.Enabled = input.Enabled
	flag.Value = input.Value

	result := data.DB.Save(&flag)

	if err := result.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": flag})

}
