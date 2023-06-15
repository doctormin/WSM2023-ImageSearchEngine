package service

import "wsm/biz/model"

type Img struct {
	Id    string    `json:"id"`
	Image string `json:"image"`
}

type Imgs struct {
	Ids   []string
}

func (a *Img) GetAll() (map[int]*model.Img, error) {
	imgs, err := model.GetImgs()
	if err != nil {
		return nil, err
	}
	imgsMap := make(map[int]*model.Img)
	for i, book := range imgs {
		imgsMap[i+1] = book
	}
	return imgsMap, nil
}

func (a *Img) Get(id string) (map[int]*model.Img, error) {
	img, err := model.GetImg(id)
	if err != nil {
		return nil, err
	}
	imgMap := make(map[int]*model.Img)
	for i, book := range img {
		imgMap[i+1] = book
	}
	return imgMap, nil
}

func (a *Imgs) Get(ids []string, accs []string) (map[int]*model.Img, error) {
	imgs, err := model.GetImgsById(ids, accs)
	if err != nil {
		return nil, err
	}
	imgsMap := make(map[int]*model.Img)
	for i, img := range imgs {
		imgsMap[i+1] = img
	}
	return imgsMap, nil
}