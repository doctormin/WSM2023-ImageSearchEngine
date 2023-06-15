conda create -n CLIP python=3.8
conda install --yes -c pytorch pytorch=1.7.1 torchvision
pip install ftfy regex tqdm
pip install git+https://github.com/openai/CLIP.git
