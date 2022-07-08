package models

import (
	"gorm.io/gorm"
)

type Flag struct {
	gorm.Model
	ID      uint
	Name    string `gorm:"unique"`
	Enabled bool   `gorm:"default: false"`
	Value   string
}
