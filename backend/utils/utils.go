package utils

import (
	"strconv"

	"github.com/cloudwego/hertz/pkg/common/hlog"
)

func StrToInt(s string) int {
	u, err := strconv.Atoi(s)
	if err != nil {
		hlog.Warn(err)
		return -1
	}
	return u
}

type Response struct {
	Code int         `json:"code"`
	Msg  string      `json:"msg"`
	Data interface{} `json:"data"`
}
