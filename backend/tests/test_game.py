from fastapi.testclient import TestClient

from main import app #FastAPI app instance

client = TestClient(app) # Create a TestClient instance for testing the FastAPI app

def test_get_game_state():
    response = client.get("/game-state") # Send a GET request to the /game-state endpoint, call backend
    assert response.status_code == 200 # Check that the response status code is 200 (OK)
    assert "current_room" in response.json() # Check that the response JSON contains the key "current_room"


