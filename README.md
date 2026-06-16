# Mechanical by Nature: Become

The **software layer** of Mechanical by Nature — and the opening mission in a revolutionary human calibration system.

Become is not a course. Not a workout library. Not generic fitness. It is the **first playable loop** of an interactive map of the body: scan → map → mission → map update → coach action.

---

## Product Vision

Mechanical by Nature is building a **mechanical and electrical reprogramming system** for the human body.

The human body is the most powerful biological computer we know — but it only functions correctly when aligned, activated, and consciously operated. Most people do not realize their body is a programmable system operating in a misaligned state, and they do not know how to bring it back online.

**Become introduces human calibration.**

### The body as territory

- **The body is the map.** Positions are coordinates. Fog is missing awareness and distorted signal.
- **Movement is exploration.** Reps, sets, and time under tension are tools — not the point. The goal is structured time in new positions until the nervous system stops treating them as foreign.
- **Awareness is the light.** As users breathe, map, move, reflect, and complete missions, they push back the fog and reveal more of their internal landscape.
- **The user navigates by signal.** Guidance takes you to the edge of the map — but you must learn to read restriction, space, force, compensation, and the direction that brings you toward center.

### The positional sphere

The body can be viewed as a three-dimensional **positional sphere** around center. Modern life pulls many people forward — seated hips, protracted shoulders, shallow breath, forward center of gravity. The back of the sphere fades into fog. Each mission helps reclaim another direction.

### The six pillars

| Pillar | Purpose |
|--------|---------|
| **Breathe** | Awareness, breath, nervous system calibration, body online |
| **Balance** | Tension map — stretch red zones, activate blue zones, restore access |
| **Burn** | Capacity and controlled discomfort without losing signal |
| **Build** | Strength and hypertrophy while maintaining alignment under load |
| **Boost** | Neural efficiency — front/back, on/off, speed and power |
| **Become** | Integration — coherence, flow, self-directed mastery |

Mission 01 begins in the **Breathe** pillar.

### Hardware layer

The **Better Bench** can become the hardware layer. Become is the software layer that guides the journey.

---

## Demo Flow

| Step | Route | What to show |
|------|-------|--------------|
| 1 | `/` | Landing — journey map, fog language, positional sphere thesis |
| 2 | `/assessment` | System Scan — 11 scan points mapping the internal landscape |
| 3 | `/profile` | Center Profile — signal map, positional sphere, position card, drift |
| 4 | `/module` | Mission 01 briefing — objective, territory, signal focus, criteria |
| 5 | `/reflection` | Map Update — territory changes, intuition, navigation |
| 6 | `/coach` | Mission Control — explorer data, map updates, next mission |

User progress persists in **localStorage**. No account, database, or AI required.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Opening Loop (This MVP)

This MVP proves only the **opening loop**:

```
System Scan → Center Profile → Mission 01 → Map Update → Mission Control
```

Future versions expand into:

- Interactive body maps with unlockable missions
- Adaptive pathways across all six pillars
- Positional sphere expansion and fog clearing progression
- Client progress tracking and coach tools
- Hardware integration (Better Bench)
- Deeper human calibration protocols

---

## Investor Framing

Become starts as a guided system scan and first mission. The larger platform expands into a full body map, unlockable missions, adaptive coaching, physical tools, program pathways, and human calibration protocols.

**The long-term product is not a workout library.** It is an interactive map of the body. Users explore positions, clear fog, unlock access, and learn to navigate by signal. The platform turns exercise into a game of embodiment: discover the map, reclaim forgotten coordinates, restore signal, and become the operator of your own system.

The end goal is not dependence on coaching — but **self-directed awareness**.

---

## Architecture

```
src/
├── app/
│   ├── page.tsx           # Landing + journey map
│   ├── assessment/        # System Scan
│   ├── profile/           # Center Profile + signal map + sphere
│   ├── module/            # Mission briefing
│   ├── reflection/        # Map Update
│   └── coach/             # Mission Control
├── components/
│   ├── JourneyMap.tsx     # Six pillar regions
│   ├── FogIndicator.tsx   # Fog of awareness metrics
│   ├── TensionMap.tsx     # Red/blue signal map
│   ├── PositionalSphere.tsx
│   └── PositionCard.tsx
└── lib/
    ├── types.ts
    ├── pillars.ts
    ├── assessment.ts      # Profile + mission engine
    ├── mock-coach-data.ts
    └── storage.ts
```

**Stack:** Next.js 15 · React 19 · TypeScript · Tailwind CSS

---

## License

Private — Mechanical by Nature prototype. Not for public distribution.
