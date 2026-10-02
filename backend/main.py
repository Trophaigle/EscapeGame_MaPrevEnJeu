from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.database import Base, engine
from database.models import GameState
from api.game import router as game_router

from pydantic import BaseModel

app = FastAPI()
app.include_router(game_router)# Register the game router

Base.metadata.create_all(bind=engine)  # Create tables in the database  



@app.get("/")
def root():
    return {"message": "Backend is running"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

progress = {
    1: [True, False, False, False, False]
}


class ProgressData(BaseModel):
    unlocked: list[bool]


@app.get("/progress/{player_id}")
def get_progress(player_id: int):
    return {
        "unlocked": progress.get(
            player_id,
            [True, False, False, False, False]
        )
    }


@app.post("/progress/{player_id}")
def save_progress(player_id: int, data: ProgressData):
    progress[player_id] = data.unlocked

    return {
        "success": True,
        "unlocked": data.unlocked
    }