package data

import (
	"ecosia/flagosia/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	database, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})

	if err != nil {
		panic("Failed to connect to database!")
	}

	database.Migrator().DropTable(&models.Flag{})
	database.AutoMigrate(&models.Flag{})

	DB = database
}
