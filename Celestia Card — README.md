# ✨ Celestia Card

> **Choose a card. Reveal your path.**

**Celestia Card** is a minimal and interactive Tarot reading web application designed to provide a simple and immersive Tarot experience.

Users do not need to enter a question, personal information, or complicated details. They simply choose the Tarot card that attracts them, reveal it, and receive an interpretation.

The project is designed to be accessible online through a **free web domain / free hosting platform**.

---

# 🌙 Project Concept

Celestia Card focuses on the idea that users do not always need to ask a specific question.

Sometimes, they simply want to:

- Discover what the cards have to say
- Get a general reading
- Receive a message for the day
- Explore Tarot cards
- Follow their intuition

The core interaction is:

```text
Visit Celestia Card
        ↓
Choose a Reading
        ↓
Choose Card(s)
        ↓
Reveal Card(s)
        ↓
Read Interpretation
```

> **No questions. No forms. Just choose a card.**

---

# 🎨 Design Philosophy

Celestia Card uses a **minimal, elegant, and calm visual style**.

### Design Keywords

**Minimal · Celestial · Elegant · Calm · Mysterious**

The interface should avoid excessive decorations and focus attention on the Tarot cards and their meanings.

### UI Principles

- Minimal navigation
- Generous whitespace
- Simple typography
- Subtle animations
- Clean card presentation
- Responsive design
- Dark/celestial visual atmosphere
- No unnecessary forms

---

# 🃏 Real Tarot Card Deck

Celestia Card uses a **traditional 78-card Tarot deck**.

The deck contains:

### Major Arcana — 22 Cards

From **The Fool (0)** to **The World (XXI)**.

### Minor Arcana — 56 Cards

Four suits:

- 🪄 Wands
- 🏆 Cups
- ⚔️ Swords
- 🪙 Pentacles

Each suit contains:

```text
Ace
2–10
Page
Knight
Queen
King
```

The application uses real Tarot card names and traditional Tarot meanings rather than creating fictional cards.

---

# 📖 Tarot Card Details

Every card contains detailed information.

Each card can include:

```text
Card Name
Card Number
Arcana
Suit
Keywords
Upright Meaning
Reversed Meaning
Love Meaning
Career Meaning
Finance Meaning
General Meaning
Advice
Element
Symbolism
```

This allows Celestia Card to function not only as a Tarot reading application but also as a **small Tarot card reference / encyclopedia**.

---

# 🔮 Reading Modes

## ☀️ Daily Card

A one-card reading designed to provide a general message for the day.

```text
Choose 1 Card
      ↓
Reveal
      ↓
Daily Reading
```

---

## 🔮 Three Card Reading

Users choose three cards.

```text
Past  →  Present  →  Future
```

Each card is interpreted individually and then combined into an overall reading.

---

## 🌙 Five Card Reading

A more detailed general reading.

Possible positions:

```text
Current Situation
Challenge
Main Energy
Advice
Possible Outcome
```

---

## ⭐ Lucky Draw

A completely open reading.

Users do not select a topic or enter a question.

They simply press:

> **Draw a Card**

The system randomly selects a Tarot card and presents its interpretation.

---

# 🎴 Card Selection

The card selection screen uses face-down Tarot cards.

Example:

```text
              Choose a card

       🂠     🂠     🂠     🂠

       🂠     🂠     🂠     🂠

          Trust your intuition.
```

The user selects the card they feel attracted to.

The selected card is then revealed with a subtle card-flip animation.

---

# 🔄 Upright & Reversed Cards

Cards can appear in two orientations.

### Upright

Uses the traditional upright interpretation.

### Reversed

Uses the reversed interpretation.

Example:

```text
The Star

Upright:
Hope, healing, renewal, inspiration

Reversed:
Doubt, discouragement, lack of faith
```

---

# 🧠 Reading System

The interpretation is determined by multiple factors:

```text
Selected Card
      +
Card Position
      +
Orientation
      +
Reading Type
      ↓
Final Interpretation
```

For example:

```text
The Star
+
Present
+
Upright
+
Three Card Reading
```

The system can provide an interpretation specifically suited to the card's position.

---

# 📱 Responsive Web Design

Celestia Card is designed as a responsive web application.

Supported devices:

- Desktop
- Laptop
- Tablet
- Mobile

The Tarot card layout automatically adapts to different screen sizes.

---

# 🌐 Free Web Deployment

Celestia Card is intended to be publicly accessible through a **free web deployment**.

The project should use a free hosting platform that provides a free web address/subdomain.

Example structure:

```text
https://celestia-card.<free-domain>
```

Possible free deployment platforms include:

- GitHub Pages
- Vercel
- Netlify
- Cloudflare Pages

The exact platform can be selected based on the project's frontend technology and deployment requirements.

### Deployment Goal

```text
Local Development
       ↓
Git Repository
       ↓
Free Hosting Platform
       ↓
Public Web Address
       ↓
🌙 Celestia Card
```

The goal is to allow anyone to access Celestia Card through the internet without requiring users to install an application.

---

# 🏗️ System Architecture

```text
                Celestia Card
                      │
          ┌───────────┴───────────┐
          │                       │
      Frontend                Tarot Data
          │                       │
          │                   78 Cards
          │                       │
          ↓                       ↓
   Card Selection  ←──────  Card Database
          │
          ↓
      Tarot Engine
          │
    ┌─────┴─────┐
    │           │
 Randomizer   Reading
    │           │
    └─────┬─────┘
          ↓
    Card Reveal
          ↓
    Interpretation
```

---

# 🗂️ Suggested Project Structure

```text
celestia-card/
│
├── public/
│   ├── cards/
│   │   ├── major-arcana/
│   │   └── minor-arcana/
│   │
│   └── assets/
│
├── src/
│   ├── components/
│   │   ├── TarotCard
│   │   ├── CardDeck
│   │   ├── CardReveal
│   │   └── ReadingResult
│   │
│   ├── data/
│   │   └── tarot.json
│   │
│   ├── pages/
│   │   ├── Home
│   │   ├── Reading
│   │   └── Result
│   │
│   └── utils/
│       ├── cardRandomizer
│       └── readingEngine
│
└── README.md
```

---

# 🛠️ Suggested Technology

The exact stack can be selected during implementation.

Recommended options:

```text
Frontend:
React / Vue

Styling:
CSS / Tailwind CSS

Tarot Data:
JSON

Deployment:
Vercel / Netlify / GitHub Pages / Cloudflare Pages
```

For the first prototype, a backend is not required.

The 78-card Tarot database can be stored locally as JSON.

---

# 🔐 Privacy

Celestia Card does not require personal information for a basic Tarot reading.

Users do not need to provide:

- Name
- Date of birth
- Phone number
- Email
- Personal question

The basic experience can therefore be used anonymously.

---

# ⚠️ Disclaimer

Celestia Card is intended for **entertainment, reflection, and personal exploration**.

Tarot readings should not be treated as guaranteed predictions or professional advice.

The application should not be used as the sole basis for medical, financial, legal, or other high-stakes decisions.

---

# 🚀 Future Features

- [x] Complete 78-card Tarot database
- [ ] Real Tarot card artwork
- [x] Card flip animation
- [x] Upright / reversed cards
- [x] Daily Card
- [x] Three Card Reading
- [x] Five Card Reading
- [x] Lucky Draw
- [x] Tarot Card Encyclopedia
- [ ] Reading History
- [ ] Favorite Cards
- [ ] Share Reading
- [ ] Switch Laguage Thai to English
- [ ] Dark / Light Theme
- [ ] AI-generated combined interpretation
- [ ] Multiple Tarot Decks
- [ ] PWA / Installable Web App

---

# 🎯 Project Goal

Celestia Card aims to make Tarot reading **simple, accessible, and visually engaging**.

Instead of asking users to fill out information or formulate a question, the application focuses on one intuitive interaction:

```text
        CHOOSE
           ↓
        REVEAL
           ↓
       DISCOVER
```

> **Celestia Card**  
> *A card may not answer a question you asked — it may reveal something you didn't think to ask.*