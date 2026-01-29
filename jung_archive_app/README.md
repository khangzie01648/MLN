# 🏛️ PROJECT CODEX: THE JUNG ARCHIVE
> **"Wholeness is not achieved by cutting off a portion of one's being, but by integration of the contraries."** — C.G. Jung

![System Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge) ![Version](https://img.shields.io/badge/Version-3.5.0-blue?style=for-the-badge&color=0a0b10) ![Platform](https://img.shields.io/badge/Engine-Next.js_16_%7C_React_19-black?style=for-the-badge&logo=next.js) ![Visualization](https://img.shields.io/badge/Graphics-WebGL_%7C_R3F-orange?style=for-the-badge)

## 🌌 Project Vision: Digital Surrealism
**The Jung Archive** is a high-fidelity **Cinematic Web Experience** designed to digitize and visualize the complex psychological framework of Carl Gustav Jung. This is not a blog or a wiki; it is an **interactive grimoire**—a spatial interface where users explore the depths of the Collective Unconscious through reactive 3D artifacts, atmospheric soundscapes, and procedural storytelling.

---

## 🏗️ Core Architecture & Design Patterns

The project follows a **Modified Clean Architecture** pattern, optimized for high-performance 3D rendering and dynamic content delivery.

### 1. The Presentation Layer (Visual & Interaction)
- **WebGL Scenegraph**: Managed via `React Three Fiber`, providing a declarative approach to complex 3D scenes.
- **Shader Pipeline**: custom GLSL kernels for logic-defying materials (e.g., *Ink Reveal*, *Liquid Gold*, *Void Distortion*).
- **Orchestration**: `Framer Motion 12` manages the synchronization between the 2D UI and 3D spatial events.

### 2. The Domain Layer (Business Logic)
- **Metadata Scanner**: A robust server-side engine that catalogs over 130 archival records at build time.
- **Dynamic Routing**: Automatic slug generation and relationship mapping between articles and Jungian "Pillars".

### 3. The Data Layer (Archival Content)
- **Headless CMS**: File-based content management using structured Markdown and YAML frontmatter.
- **Master Compendium**: Integration of the 113-file `JUNG_ARCHIVE_FINAL` library.

---

## 📂 System Topology (v3.5)

```bash
/
├── 📂 jung_archive_app/        # Core Application
│   ├── 📂 app/                 # Next.js App Router (Controllers)
│   │   ├── (system)/           # Playground, Testing & Maintenance
│   │   ├── select/             # High-Level Navigation (Mandala Hub)
│   │   │   ├── library/        # 📚 Module: Digital Library
│   │   │   └── pillar/         # 🏛️ Module: Interactive Pillars
│   │   └── page.tsx            # The Threshold (Immersive Intro)
│   │
│   ├── 📂 components/          # View Layer (Atomic Design)
│   │   ├── 🧊 3d/              # 3D Components (Scenes, Objects, Backgrounds)
│   │   ├── 🎨 ui/              # 2D Interface (Effects, Features, Modules)
│   │   ├── 📐 templates/       # Structural Layouts
│   │   └── 🎬 transitions/     # VFX Orchestration
│   │
│   ├── 📂 content/             # Primary Record Store (130+ .md files)
│   └── 📂 lib/                 # Core Utilities, Types & Constants
│
├── 📂 JUNG_ARCHIVE_FINAL/      # Official Source Repository (113 records)
└── 📂 scripts/                 # Maintenance & Data Sanitization Tools
```

---

## 🏛️ The 10 Archetypal Pillars
The experience is anchored by 10 immersive paths, each with a unique visual language and shader signature:

| Pillar | Symbol | Theme | VFX Signature |
| :--- | :--- | :--- | :--- |
| **Alchemy** | ⚗️ | Transmutation | Liquid Gold Fusion |
| **Red Book** | 📕 | Confrontation | Psychic Ink Leak |
| **Concepts** | 🌀 | Mapping | Neural Mesh Network |
| **Practice** | 🧘 | Integration | Floating Mandalas |
| **Spirit** | ✨ | Gnosis | Volumetric Aura |
| **Symbols** | 👁️ | Language | Runic Stream |
| **Legacy** | 🌳 | Evolution | Procedural Growth |
| **Cosmos** | 🌌 | Synchronicity | Wormhole Warp |
| **Biography** | ⌛ | Time | Memory Rewind |
| **Encounters** | 🤝 | Connection | Web of Fate |

---

## ⚡ Technical Specifications

### Immersive Graphics Pipeline
- **R3F Scenegraph**: Using `three-custom-shader-material` to inject custom logic into standard materials for superior artistic control.
- **Post-Processing Stack**: A cinematic chain including **Bloom** (luminescence), **Chromatic Aberration** (psychic instability), and **Vignette** (visual focus).
- **Physics**: Particle systems driven by `maath` for organic, life-like movement of the Collective Unconscious.

### Performance & Quality
- **RSC Optimization**: Using Next.js Server Components to offload heavy metadata processing to the server, keeping the client bundle lean for 3D rendering.
- **TypeScript Strict Mode**: Ensures type-safety across the complex interaction between React state and the WebGL loop.
- **Hydration Resilience**: Custom hooks to handle client-side random generation, ensuring 0 errors during static generation.

---

## 🚀 Deployment & Installation

### Development Environment
```bash
# Clone the repository
git clone [repository-url]
cd jung_archive_app

# Install dependencies (Enterprise Grade)
npm install --legacy-peer-deps

# Start the dev server (Custom Port 8080)
npm run dev
```

### Build & Production
```bash
# Production optimization pipeline
npm run build
npm start
```

---

## 📚 Contribution Protocol
Content is managed via a strict **Frontmatter Signature** to ensure system compatibility:

```yaml
---
title: "The Self and the Shadow"
description: "Exploring the dark mirror of the psyche."
pillarId: "concepts"
order: 1
published: true
---
```

---

## 🛡️ License & Acknowledgments
- **License**: MIT
- **Design & Engineering**: Antigravity AI & The Lead User.
- **Spiritual Inspiration**: The collected works of Carl Gustav Jung.

> *“Until you make the unconscious conscious, it will direct your life and you will call it fate.”*
