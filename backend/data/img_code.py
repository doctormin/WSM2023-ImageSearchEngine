from torchvision.transforms import Compose, Resize, CenterCrop, ToTensor, Normalize
import torch
import os
import numpy as np
from os import path as osp
from PIL import Image
import torch

try:
    from torchvision.transforms import InterpolationMode
    BICUBIC = InterpolationMode.BICUBIC
except ImportError:
    BICUBIC = Image.BICUBIC

def _convert_image_to_rgb(image):
    return image.convert("RGB")

def load(path, device):
    preprocess = Compose([
            Resize((224,224), interpolation=BICUBIC),
            CenterCrop((224,224)),
            _convert_image_to_rgb,
            ToTensor(),
            Normalize((0.48145466, 0.4578275, 0.40821073), (0.26862954, 0.26130258, 0.27577711)),
        ])
    
    text_path = osp.join(path, 'final_text_encoder_4.pt')
    image_path = osp.join(path, 'final_visual.pt')

    model_text = torch.jit.load(text_path, map_location=torch.device('cpu')).to(device).eval()
    model_image = torch.jit.load(image_path, map_location=torch.device('cpu')).to(device).eval()
    return preprocess, model_text, model_image

def image_encode(model_image, preprocess, image_path, save_path):
    num = 0
    for filename in os.listdir(image_path):
        if filename.endswith(".png"):
            num += 1
            im_name = 'em_' + os.path.splitext(filename)[0]
            print(filename, im_name)
            filename_path = osp.join(image_path, filename)
            image = preprocess(Image.open(filename_path)).unsqueeze(0).to(device)
            em_image = model_image(image).numpy()
            text_path = osp.join(save_path, im_name)
            np.save(text_path, em_image)

if __name__ == '__main__':
    path = osp.abspath(osp.join(__file__, osp.pardir))
    device = torch.device("cpu" if torch.cuda.is_available() else "cpu")
    preprocess, model_text, model_image = load(path, device)
    image_encode(model_image, preprocess, 'testset1', 'em_image')