from sqlalchemy import Column, Integer

from database.database import Base


class GameState(Base):
    __tablename__ = "game_state"

    id = Column(Integer, primary_key=True)
    current_room = Column(Integer, nullable=False)