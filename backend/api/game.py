#routing
from fastapi import APIRouter
from sqlalchemy.orm import Session
from database.database import SessionLocal
from database.models import GameState

router = APIRouter()


@router.get("/game-state")
def get_game_state():
    db: Session = SessionLocal()

    game_state = db.query(GameState).first()

    db.close()

    return {
        "current_room": game_state.current_room
    }

@router.put("/game-state/room")
def update_room(room: int):
    db: Session = SessionLocal()

    game_state = db.query(GameState).first()
    game_state.current_room = room

    db.commit()
    db.refresh(game_state)

    db.close()

    return {
        "current_room": game_state.current_room
    }