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

Users must complete each stage to unlock the next, simulating a **guided escape game experience focused on learning and engagement**.

---

## 🛠️ Tech Stack

- **Framework:** Next.js  
- **Styling:** Tailwind CSS  
- **Authentication:** NextAuth.js (restricted access via invitation codes)  
- **Drag & Drop System:** dnd-kit
- **Animation System:** three.js
- **State & Gameplay Logic:** Custom GameManager architecture  
- **Architecture:** Component-based modular design  

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

### 🎯 Game Manager
A centralized **GameManager system** handles:
- Game state progression
- Stage unlocking logic
- User progress tracking
- Validation of completed tasks

---

## 🧩 Interactive Mechanics

### 🖱️ Drag & Drop Challenges
Built with **dnd-kit**, enabling:
- Interactive sorting / matching exercises
- Intuitive UX for training interactions
- Responsive drag-and-drop gameplay

---

### 📊 Dashboard System
Each user has access to a dashboard displaying:
- Current progression
- Completed stages
- Remaining challenges
- Training status overview

---

## 🎨 UX / UI Design

The platform is designed with a strong focus on:

- 🎮 Gamified learning experience
- 🧭 Clear progression feedback
- 🧠 Cognitive engagement through interaction
- 📱 Responsive design (desktop-first but adaptable)
- 🎨 Clean and immersive interface inspired by escape game mechanics

The goal is to maintain a **serious training purpose wrapped in an engaging experience**.

---

## 🧱 Architecture

```bash
/components     → UI components (game, dashboard, UI elements)
/app or /pages  → Next.js routing
/lib            → GameManager logic & core systems
/auth           → NextAuth configuration
/data           → Game content & stage definitions
/styles         → Tailwind configuration
