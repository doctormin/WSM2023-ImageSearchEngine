package setting

import (
	"github.com/cloudwego/hertz/pkg/common/hlog"
	"github.com/go-ini/ini"
)

type DatabaseSetting struct {
	User     string
	Password string
	Host     string
	Name     string
}


var Database = &DatabaseSetting{}
var cfg *ini.File

func SetUp() {
	var err error
	cfg, err = ini.Load("conf/app.ini")
	if err != nil {
		hlog.Fatalf("setting.Init err: %v", err)
	}
	mapTo("database", Database)
}

func mapTo(section string, v interface{}) {
	err := cfg.Section(section).MapTo(v)
	if err != nil {
		hlog.Fatalf("setting.mapTo err: %v", err)
	}
}
