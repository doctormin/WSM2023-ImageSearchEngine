import clip
import torch
from os import path as osp
import os
import numpy as np
import torch.nn.functional as F
import sys

def text_embedding(text, device=None):
    text_path = osp.join('./data/final_text_encoder_4.pt')

    model_text = torch.jit.load(text_path, map_location=torch.device('cpu')).to(device).eval()
    text = clip.tokenize(text).to(device)
    em_text = model_text(text)
    return em_text

def search(em_text, list_em_image, list_image, threshold):
    expanded_text = em_text.expand_as(list_em_image)
    similarities = F.cosine_similarity(expanded_text, list_em_image, dim=1)
    sorted_indices = torch.argsort(similarities, descending=True)
    sorted_values = similarities[sorted_indices]

    selected_indices = sorted_indices[similarities[sorted_indices] > threshold]
    selected_values = sorted_values[similarities[sorted_indices] > threshold]

    img = []
    sim = []
    for similarity, index in zip(selected_values, selected_indices):
        img.append(list_image[index])
        sim.append(str(round(similarity.item() * 100, 3)) + "%")
        #print(f"Similarity: {similarity.item()}, Index: {index.item()}, Imag: {list_image[index]}")
    return img, sim

def load_em_image(path, device=None):
    list_em_image = []
    list_image = []
    for filename in os.listdir(path):
        if filename.endswith(".npy"):
            filename_path = osp.join(path, filename)
            array = np.load(filename_path) 
            list_em_image.append(array)
            list_image.append(os.path.splitext(filename)[0][3:])

    list_em_image = np.concatenate(list_em_image, axis=0)
    list_em_image = torch.from_numpy(list_em_image).to(device)
    return list_em_image, list_image

if __name__ == '__main__':
    input_data = sys.argv[1]
    device = torch.device("cpu")
    list_em_image, list_image = load_em_image("./data/em_image", device)
    em_text = text_embedding(input_data, device)
    img, sim = search(em_text, list_em_image, list_image, 0.30)
    out = []
    for i, j in zip(img, sim):
        out.append(f"{i}-{j}")
    print(out)