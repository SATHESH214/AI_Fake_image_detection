from pathlib import Path
import torch
from transformers import ViTForImageClassification, ViTImageProcessor

MODEL_PATH = Path(__file__).resolve().parents[1] / "saved_model"

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

processor = ViTImageProcessor.from_pretrained(str(MODEL_PATH), local_files_only=True)
model = ViTForImageClassification.from_pretrained(str(MODEL_PATH), local_files_only=True)

model.to(device)
model.eval()