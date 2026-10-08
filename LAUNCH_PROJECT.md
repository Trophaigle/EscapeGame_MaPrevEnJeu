## 1. 🗄️ PostgreSQL

Open **pgAdmin** and make sure PostgreSQL is running.

Database:

```text
escape_game
```

---

## 2. 🐍 FastAPI Backend

### Terminal 1

From the project root:

```bash
cd backend
uvicorn main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

Swagger:

```text
http://127.0.0.1:8000/docs
```

---

## 3. ⚛️ Next.js Frontend

### Terminal 2

Go back to the project root:

```bash
cd ..
npm run dev
```

Frontend:

```text
http://localhost:3000
```

---

## ✅ Launch Order

```text
1. Open pgAdmin
        ↓
2. Terminal 1
   cd backend
   uvicorn main:app --reload
        ↓
3. Terminal 2
   cd ..
   npm run dev
        ↓
4. Open http://localhost:3000
```

---

## 🔎 Quick Backend Test

Open Swagger:

```text
http://127.0.0.1:8000/docs
```

Test:

```text
GET /game-state
```

Expected response:

```json
{
  "current_room": 1
}
```

---

## 🛑 Stop the Project

In each terminal:

```text
Ctrl + C
```
"""

## 🧪 Tests

The backend tests are located in:

```text
backend/tests/
```

# Run All Tests
Open a terminal from the project root and navigate to the backend directory:
```text
cd backend
```
Then run
```text
python -m pytest
```

To display the name and status of each test run:
```text
python -m pytest -v
```

