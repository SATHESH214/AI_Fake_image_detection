from pydantic import BaseModel


class PredictionResultSchema(BaseModel):
    label: str
    confidence: float