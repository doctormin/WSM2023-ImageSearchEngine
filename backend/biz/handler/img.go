package handler

import (
	"context"
	"os/exec"
	"strings"
	"wsm/biz/service"
	"wsm/utils"

	"github.com/cloudwego/hertz/pkg/app"
	"github.com/cloudwego/hertz/pkg/common/hlog"
	"github.com/cloudwego/hertz/pkg/protocol/consts"
)

func GetImgs(c context.Context, ctx *app.RequestContext) {
	a := service.Img{}
	imgMap, err := a.GetAll()

	if err != nil {
		ctx.JSON(consts.StatusOK, utils.Response{
			Code: consts.StatusInternalServerError,
			Msg:  "failed",
			Data: nil,
		})
		return
	}

	ctx.JSON(consts.StatusOK, utils.Response{
		Code: consts.StatusOK,
		Msg:  "succeed",
		Data: imgMap,
	})
}

func GetImgsById(c context.Context, ctx *app.RequestContext) {
	a := service.Imgs{}
	keyword := ctx.Param("keyword")
	out, err := exec.Command("./data/runner.sh", keyword).Output()
	if err != nil {
		hlog.Warnf("handler.GetIm err: %v", err)
		ctx.JSON(consts.StatusOK, utils.Response{
			Code: consts.StatusInternalServerError,
			Msg:  "text encode failed",
			Data: nil,
		})
		return
	}
	// byte to string
	s := string(out)
	// string to list
	items := strings.Split(s[1:len(s)-2], ",")
	if(len(items) < 2) {
		hlog.Infof("handler.GetImgsById len(items): %v, nothing returned", len(items))
		ctx.JSON(consts.StatusOK, utils.Response{
			Code: consts.StatusOK,
			Msg:  "succeed",
			Data: nil,
		})
		return
	}
	// log the length of items
	hlog.Infof("handler.GetImgsById len(items): %v", len(items))
	hlog.Infof("handler.GetImgsById items: %v", items)
	ids := make([]string, len(items))
	accs := make([]string, len(items))
	for i := 0; i < len(items); i++ {
		items[i] = strings.TrimSpace(items[i])
		items[i] = strings.Replace(items[i], "'", "", -1)
		bound := strings.SplitN(items[i], "-", 2)
		ids[i] = bound[0]
		accs[i] = bound[1]
	}
	imgMap, err := a.Get(ids, accs)
	if err != nil {
		ctx.JSON(consts.StatusOK, utils.Response{
			Code: consts.StatusInternalServerError,
			Msg:  "failed",
			Data: nil,
		})
		return
	}
	ctx.JSON(consts.StatusOK, utils.Response{
		Code: consts.StatusOK,
		Msg:  "succeed",
		Data: imgMap,
	})
}
