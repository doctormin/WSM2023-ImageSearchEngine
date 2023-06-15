package model

import (
	"fmt"

	"github.com/cloudwego/hertz/pkg/common/hlog"
	setting "wsm/setting"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var db *gorm.DB

func SetUp() {
	// set up mysql
	var err error
	dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8&parseTime=True&loc=Local",
		setting.Database.User,
		setting.Database.Password,
		setting.Database.Host,
		setting.Database.Name)
	db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	
	// PRINT db sql queary
	db = db.Debug()

	if err != nil {
		hlog.Fatalf("models.Setup err: %v", err)
	}
}
