// Code generated by hertz generator.

package main

import (
	"wsm/biz/model"
	"wsm/setting"

	"github.com/cloudwego/hertz/pkg/app/server"
	"github.com/hertz-contrib/cors"
)

func init() {
	setting.SetUp()
	model.SetUp()
}

func main() {
	h := server.Default(
		server.WithHostPorts("127.0.0.1:8888"),
	)
	h.Use(cors.New(cors.Config{
        AllowOrigins:	  []string{"*"},
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Content-Type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "Authorization", "accept", "origin", "Cache-Control", "X-Requested-With"},
        ExposeHeaders:    []string{"Content-Length", "Access-Control-Allow-Origin", "Access-Control-Allow-Headers", "Cache-Control", "Content-Language", "Content-Type", "Expires", "Last-Modified", "Pragma"},
		AllowCredentials: true,
    }))

	register(h)
	h.Spin()
}
