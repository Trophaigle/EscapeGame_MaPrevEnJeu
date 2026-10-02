# 🧩 Digital Escape Game Platform – Risk Prevention Training

A web-based prototype designed to **digitize an in-person escape game experience** for corporate risk prevention training.

This platform transforms traditional safety training into an **interactive, gamified learning experience**, where users progress step-by-step through challenges in a controlled digital environment.

Built for a French corporate client, this project is designed as a **scalable prototype**, intended to evolve based on user feedback and business requirements.

🌐 Try it here: [Escape Game](https://escapegamemaprevenjeu.vercel.app/login)

---

## 🚀 Project Overview

The goal of this application is to modernize workplace risk prevention training by introducing:

- 🎮 Gamification of learning content
- 🧠 Progressive challenge-based learning (escape game logic)
- 🧩 Interactive problem-solving mechanics
- 📊 Structured user progression tracking via dashboard
- 🌐 REST API for communication between frontend and backend
- 💾 Persistent game progression and mission results

Users must complete each stage to unlock the next, simulating a **guided escape game experience focused on learning and engagement**.

---

## 🛠️ Tech Stack

### Frontend

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth.js (restricted access via invitation codes)
- **Drag & Drop System:** dnd-kit
- **Animation System:** three.js
- **State & Gameplay Logic:** Custom GameManager architecture
- **Architecture:** Component-based modular design

### Backend

- **Language:** Python
- **Framework:** FastAPI
- **API:** REST API
- **ORM:** SQLAlchemy

### Databases

- **PostgreSQL:** Game progression and structured data
- **MongoDB:** Mission results and flexible game data

---

## 🔐 Authentication System

Access to the platform is restricted:

- Users must authenticate via **secure access codes**
- Only authorized participants can access the training environment
- Built using **NextAuth.js**

This ensures controlled deployment for corporate training sessions.

---

## 🎮 Core Gameplay System

### 🧠 Escape Game Logic

- Users progress through **structured stages**
- Each stage must be completed to unlock the next
- Challenges simulate real-world risk prevention scenarios
- Game progression is persisted through the backend

### 🎯 Game Manager

A centralized **GameManager system** handles:

- Game state progression
- Stage unlocking logic
- User progress tracking
- Validation of completed tasks
- Interaction between different game mechanics

---

## 🧩 Interactive Mechanics

### 🖱️ Drag & Drop Challenges

Built with **dnd-kit**, enabling:

- Interactive sorting / matching exercises
- Intuitive UX for training interactions
- Responsive drag-and-drop gameplay

### 🧩 Puzzles & Interactive Challenges

The game includes different types of educational challenges, such as:

- Risk identification
- Matching actors with their roles
- Riddles and problem-solving activities
- Workplace risk analysis
- Prevention measure identification

Each challenge has its own validation logic.

---

## 🌐 Backend & REST API

The backend is developed with **FastAPI** and provides a REST API used by the Next.js frontend.

The API is responsible for:

- Retrieving the current game progression
- Updating the current stage
- Saving game-related data
- Connecting the application to the databases

Main endpoints currently include:
```
GET  /game-state
PUT  /game-state/room
```
```
Next.js / React
       │
       │ HTTP requests
       ▼
    FastAPI
       │
       ├──────────────► PostgreSQL
       │
       └──────────────► MongoDB
```

## 🗄️ Database System

### PostgreSQL

PostgreSQL is used to store the main game progression.
The current game state is stored in a simple structure containing:
```
game_state
├── id
└── current_room
```

This allows the player's progression to persist when the page is refreshed.

### MongoDB

MongoDB is used for mission results and flexible game data.
It can store information such as:
- Completed missions
- Number of attempts
- Mistakes
- Scores
- Mission-specific results
MongoDB is particularly useful for storing data that can vary depending on the type of challenge.

## 📊 Dashboard System

Each user has access to a dashboard displaying:
- Current progression
- Completed stages
- Remaining challenges
- Training status overview
The dashboard can later be extended with statistics based on the mission results stored in MongoDB.

## 🎨 UX / UI Design

The platform is designed with a strong focus on:
- 🎮 Gamified learning experience
- 🧭 Clear progression feedback
- 🧠 Cognitive engagement through interaction
- 📱 Responsive design (desktop-first but adaptable)
- 🎨 Clean and immersive interface inspired by escape game mechanics
- ✨ Visual feedback through animations and notifications
The goal is to maintain a serious training purpose wrapped in an engaging experience.

## 🧱 Architecture
```
/app or /pages     → Next.js routing and pages
/components        → UI components (game, dashboard, UI elements)
/components/games  → Individual interactive game mechanics
/lib               → GameManager logic & core systems
/auth              → NextAuth configuration
/data              → Game content & stage definitions
/styles             → Tailwind configuration

/backend
├── api            → FastAPI REST API endpoints
├── database       → Database configuration & models
└── main.py        → FastAPI application entry point
```
