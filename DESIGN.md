---
name: Global Smile
description: Integrated Patient Acquisition & Trust Engine for Specialist Prosthodontics
colors:
  primary: "#0d9488"
  primary-dark: "#0f766e"
  accent: "#f59e0b"
  neutral-bg: "#ffffff"
  neutral-fg: "#0a0a0a"
  muted: "#71717a"
  border: "#e4e4e7"
typography:
  display:
    fontFamily: "Geist, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.1
  body:
    fontFamily: "Geist, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  md: "8px"
  lg: "12px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "12px 24px"
---

# Design System: Global Smile

## 1. Overview

**Creative North Star: "The Surgical Clean"**

The Global Smile design system is built on principles of absolute precision and clinical transparency. It rejects the "perfect smile" clichés of consumer dentistry in favor of a high-contrast, expert environment. The aesthetic is defined by vast white space, razor-sharp teal accents, and a rigorous adherence to a technical grid.

**Key Characteristics:**
- High-contrast clinical palette.
- Generous white space (breathing room for complex data).
- Technical typography (Geist) for legibility and modern feel.
- Flat, structural hierarchy using thin borders rather than shadows.

## 2. Colors

The palette is anchored in a deep clinical teal that evokes sterile environments and expert precision.

### Primary
- **Precision Teal** (#0d9488): The core identity color. Used for primary actions and key navigation elements.
- **Sterile Deep Teal** (#0f766e): Used for hover states and secondary emphasis.

### Neutral
- **Paper White** (#ffffff): The primary background color. Represents sterility and clarity.
- **Clinical Ink** (#0a0a0a): Primary text color for maximum legibility.
- **Muted Steel** (#71717a): Used for secondary labels and metadata.

**The 10% Rule.** Precision Teal is used on ≤10% of any given screen. Its rarity is what signals "expert action" versus "marketing noise".

## 3. Typography

**Display Font:** Geist Sans
**Body Font:** Geist Sans

The typography system is monochromatic and weight-driven. It avoids decorative fonts to maintain a serious, clinical tone.

### Hierarchy
- **Display** (700, clamp(2rem, 5vw, 3.5rem), 1.1): Used for hero headlines and section titles.
- **Headline** (600, 1.5rem, 1.2): Used for card titles and sub-sections.
- **Body** (400, 1rem, 1.5): The primary reading font. Max line length capped at 70ch.
- **Label** (500, 0.875rem, uppercase): Used for navigation items and form labels.

## 4. Elevation

The system is **Flat & Structural**. Depth is conveyed through subtle borders and tonal shifts rather than shadows, reflecting the "no-nonsense" expertise of the practice.

**The Border-First Rule.** Use 1px borders (#e4e4e7) to define containers. Shadows are forbidden except for transient overlays (modals).

## 5. Components

### Buttons
- **Shape:** Softened-square (8px radius).
- **Primary:** Precision Teal background with white text. High-contrast and unavoidable.
- **Ghost:** Transparent background with 1px border. Used for secondary navigation.

### Cards
- **Corner Style:** 12px radius.
- **Background:** Paper White.
- **Border:** 1px Muted Steel or Border color.

## 6. Do's and Don'ts

### Do:
- **Do** use Precision Teal sparingly to highlight the most important clinical data.
- **Do** maintain a minimum of 64px padding between major sections.
- **Do** use technical terms and data-backed figures in all UI labels.

### Don't:
- **Don't** use stock photography of smiling models. Use diagrams, clinical milestones, or high-end practice photos.
- **Don't** use gradients or glassmorphism.
- **Don't** use "Marketing Magenta" or "Salesy Gold" accents.
