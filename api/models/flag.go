package models

import (
	"gorm.io/gorm"
)

type Segment struct {
	gorm.Model
	FlagID uint
	Trait  string
	Value  string
}

type Flag struct {
	gorm.Model
	ID       uint
	Name     string `gorm:"unique"`
	Enabled  bool   `gorm:"default: false"`
	Value    string
	Segments []Segment
}
