from bson import ObjectId
from bson.errors import InvalidId
from fastapi import APIRouter, Depends, HTTPException, status

from app.core.database import predictions_collection
from app.dependencies.auth_dependency import get_current_user

router = APIRouter(prefix="/api/history", tags=["History"])


def serialize_prediction(prediction: dict):
    return {
        "id": str(prediction["_id"]),
        "user_id": prediction.get("user_id"),
        "image_path": prediction.get("image_path", ""),
        "label": prediction.get("label", ""),
        "confidence": prediction.get("confidence", 0),
        "created_at": prediction.get("created_at"),
    }


def get_prediction_by_id_for_user(prediction_id: str, user_id: str):
    try:
        object_id = ObjectId(prediction_id)
    except (InvalidId, TypeError):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid prediction id",
        )

    prediction = predictions_collection.find_one(
        {
            "_id": object_id,
            "user_id": user_id,
        }
    )

    if not prediction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="History item not found",
        )

    return prediction, object_id


@router.get("/", status_code=status.HTTP_200_OK)
def get_history(current_user: dict = Depends(get_current_user)):
    try:
        predictions = list(
            predictions_collection.find(
                {"user_id": current_user["user_id"]}
            ).sort("created_at", -1)
        )

        return {
            "message": "History fetched successfully",
            "count": len(predictions),
            "history": [serialize_prediction(item) for item in predictions],
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )


@router.get("/{prediction_id}", status_code=status.HTTP_200_OK)
def get_history_item(
    prediction_id: str,
    current_user: dict = Depends(get_current_user),
):
    try:
        prediction, _ = get_prediction_by_id_for_user(
            prediction_id,
            current_user["user_id"],
        )

        return {
            "message": "History item fetched successfully",
            "history": serialize_prediction(prediction),
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )


@router.delete("/{prediction_id}", status_code=status.HTTP_200_OK)
def delete_history_item(
    prediction_id: str,
    current_user: dict = Depends(get_current_user),
):
    try:
        _, object_id = get_prediction_by_id_for_user(
            prediction_id,
            current_user["user_id"],
        )

        predictions_collection.delete_one(
            {
                "_id": object_id,
                "user_id": current_user["user_id"],
            }
        )

        return {
            "message": "History item deleted successfully",
            "deleted_id": prediction_id,
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )