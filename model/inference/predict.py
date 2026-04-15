import torch

from model.inference.preprocess import preprocess_image
from model.inference.model_loader import model, processor, device


def predict_image(pil_img, blocky_save_path=None, forensic_save_path=None):
    if not hasattr(pil_img, "convert"):
        return {"label": "ERROR", "confidence": 0.0}

    try:
        processed_img = preprocess_image(
            pil_img,
            blocky_save_path=blocky_save_path,
            forensic_save_path=forensic_save_path,
        )

        inputs = processor(images=processed_img, return_tensors="pt")
        inputs = {k: v.to(device) for k, v in inputs.items()}

        model.eval()
        with torch.no_grad():
            outputs = model(**inputs)
            logits = outputs.logits
            predicted_class_idx = logits.argmax(-1).item()

            probs = torch.softmax(logits, dim=1)
            confidence = probs[0][predicted_class_idx].item() * 100

        print("id2label =", model.config.id2label)
        print("label2id =", model.config.label2id)
        print("predicted_class_idx =", predicted_class_idx)
        print("probs =", probs.cpu().numpy().tolist())

        label = model.config.id2label[predicted_class_idx]

        return {
            "label": label,
            "confidence": round(float(confidence), 2),
        }

    except Exception as e:
        print("Prediction error:", str(e))
        return {
            "label": "ERROR",
            "confidence": 0.0,
        }