package controllers

import (
	"ecosia/flagosia/data"
	"ecosia/flagosia/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// GET /flags
// Get all flags
func FindFlags(c *gin.Context) {
	var flags []models.Flag
	data.DB.Preload("Segments").Find(&flags)

	c.JSON(http.StatusOK, gin.H{"data": flags})
}

type CreateFlagInput struct {
	Name     string           `json:"name" binding:"required"`
	Enabled  bool             `json:"enabled"`
	Value    string           `json:"value"`
	Segments []models.Segment `json:"segments"`
}

// POST /flags
// Create a flag
func CreateFlag(c *gin.Context) {
	var input CreateFlagInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	flag := models.Flag{Name: input.Name, Enabled: input.Enabled, Value: input.Value, Segments: input.Segments}

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
	ID       int              `json:"id" binding:"required"`
	Name     string           `json:"name" binding:"required"`
	Enabled  bool             `json:"enabled"`
	Value    string           `json:"value"`
	Segments []models.Segment `json:"segments"`
}

func UpdateFlag(c *gin.Context) {
	var input UpdateFlagInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	flag := models.Flag{ID: uint(input.ID)}
	data.DB.Preload("Segments").First(&flag, input.ID)

	flag.Name = input.Name
	flag.Enabled = input.Enabled
	flag.Value = input.Value
	for idx := range flag.Segments {
		flag.Segments[idx].Value = input.Segments[idx].Value
		flag.Segments[idx].Trait = input.Segments[idx].Trait
	}
	result := data.DB.Session(&gorm.Session{FullSaveAssociations: true}).Save(&flag)

	if err := result.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": flag})

}

// GET /check-flags
// Check flags (client)
func CheckFlags(c *gin.Context) {
	country := c.Query("country")
	var flags []models.Flag
	data.DB.Preload("Segments").Find(&flags)
	for i := 0; i < len(flags); i++ {
		segments := flags[i].Segments
		for j := 0; j < len(segments); j++ {
			if segments[j].Value != country {
				flags[i].Enabled = false
			}
		}
	}
	fmt.Println(flags)
	c.JSON(http.StatusOK, gin.H{"data": flags})
}
