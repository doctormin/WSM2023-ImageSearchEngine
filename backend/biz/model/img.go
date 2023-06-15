package model

import (
	"github.com/cloudwego/hertz/pkg/common/hlog"
)

type Img struct {
	Id    string    `json:"id"`
	Image string 	`json:"image"`
	Acc   string    `json:"acc"`
}

func (Img) TableName() string {
	return "img" // overide table name for gorm
}

func GetImgs() ([]*Img, error) {
	var img []*Img
	err := db.Find(&img).Error
	if err != nil {
		hlog.Errorf("GetImgs err: %v", err)
		return nil, err
	}
	return img, nil
}

func GetImg(id string) ([]*Img, error) {
	var img []*Img
	err := db.Where("id = ?", id).Find(&img).Error
	if err != nil {
		hlog.Errorf("GetImg err: %v", err)
		return nil, err
	}
	return img, nil
}

func GetImgsById(ids []string, accs []string) ([]*Img, error) {
	dict := make(map[string]string)
	for i := 0; i < len(ids); i++ { 
		dict[ids[i]] = accs[i]
	}
	var imgs []*Img
	err := db.Where("id in (?)", ids).Find(&imgs).Error
	if err != nil {
		hlog.Errorf("GetImg err: %v", err)
		return nil, err
	}
	for i := 0; i < len(imgs); i++ { 
		// fill in acc according to ids
		imgs[i].Acc = dict[imgs[i].Id]
	}
	return imgs, nil
}