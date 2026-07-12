# Tejas — UI/UX Design System & Page Specifications

This document defines the visual layout, typography, grid system, component tokens, and states for the **Tejas** platform. It utilizes a premium, minimalist design system combining Apple-level polish with functional Material Design behaviors.

---

## 1. Design Tokens & Color System

To maintain strict visual consistency, all elements conform to the following palette:

*   **Primary Background:** `#fcfcfb` (Soft Off-White)
*   **Borders & Dividers:** `#dbd7c7` (Muted Sand)
*   **Secondary Text & Disabled States:** `#b3aa9e` (Stone Grey)
*   **Brand Primary / CTA / Accents:** `#faa114` (Vibrant Amber)
*   **Secondary Actions / Label Text:** `#786e67` (Warm Earth)
*   **Primary Typography / Contrast Elements:** `#262a2b` (Deep Charcoal)

### 1.1 Typography
*   **Font Families:** `Outfit` (Headings, display text) and `Inter` (Body copy, inputs, UI states).
*   **Weights:** Regular (400), Medium (500), Semi-Bold (600), Bold (700).

### 1.2 Layout Grid & Spacing
*   **Desktop:** 12-column grid, 24px gutter, 80px margins.
*   **Mobile-First Grid:** 4-column grid, 16px gutter, 16px margins.
*   **Spacing Scale:** 4px (micro), 8px (small), 16px (medium), 24px (large), 32px (extra large).
*   **Border Radius:** 8px (small elements), 16px (cards, inputs), 24px (major container shells).

---

## 2. Global Navigation Shells

### 2.1 Web Navigation Shell
*   **Desktop Navigation (Left Sidebar):**
    *   **Header:** Logo in `#262a2b`, with a tiny Amber `#faa114` accent dot.
    *   **Links:** Dashboard, Exam Explorer, Study Planner, Document Hub, Revision, Analytics, Profile.
    *   **Interactions:** Hovering links shifts backgrounds to `#dbd7c7` with a 200ms transition. Active state highlights with a left border block in `#faa114`.
*   **Mobile Navigation (Bottom Bar):**
    *   5 core icons: Dashboard, Explorer, Planner, Revision, Profile.
    *   Floating Action Button (FAB) at center: Amber `#faa114` plus button to trigger Instant Quiz.

---

## 3. Page Specifications

---

### Page 1: Landing Page

#### Sections
1.  **Hero Block:** Centered layout, high-impact headline, dynamic product illustration preview.
2.  **Exam Explorer Slider:** Horizontal swipe selector demonstrating support for major Indian examinations.
3.  **Core Features Grid:** Clean, bordered grids detailing AI Planning, Instant Quizzes, and Analytics.
4.  **Pricing Tier Switcher:** Direct contrast grids comparing Free vs. Elite Premium memberships.

#### Components
*   `StickyNavbar`: Minimal header featuring blur effects (`backdrop-filter: blur(10px)`) and `#dbd7c7` bottom border.
*   `PrimaryCTAButton`: High-contrast button in `#faa114` background, `#262a2b` text. Includes micro-interaction scaling up on hover.
*   `PricingCard`: Rounded cards using `#fcfcfb` backgrounds with `#dbd7c7` borders. Premium tier features a subtle amber `#faa114` border accent.

#### States
*   **Loading:** Skeleton cards with shimmer gradients on the feature showcase container.
*   **Responsive Behavior:** Content stacks vertically on tablets and mobile screens. Nav turns into a clean fullscreen overlay menu trigger.

---

### Page 2: Dashboard

#### Sections
1.  **Welcome Banner:** Time-aware greeting, streak counters, and target exam indicators.
2.  **Daily Roadmap Planner:** Horizontal card stack showing today's tasks.
3.  **Analytics Glance:** Circular progress indicator demonstrating concept mastery.
4.  **Quick Action Panel:** Drag-and-drop file ingestion zone.

#### Components
*   `DailyTaskCard`: Bordered white cards. Complete status turns borders to `#dbd7c7` and text to `#b3aa9e`.
*   `ConceptProgressCircle`: Interactive canvas displaying mastery ratios using `#faa114` (active) and `#dbd7c7` (inactive).
*   `StreakCounterBadge`: Text badge in `#262a2b` with inline flame icons colored in `#faa114`.

#### States
*   **Empty:** Renders a clean workspace prompt: "All tasks complete! Upload a document to start a new quiz."
*   **Loading:** Tasks display glowing shimmer blocks.
*   **Responsive Behavior:** The left navigation sidebar collapses to the bottom tab bar on mobile, while daily task columns stack vertically.

---

### Page 3: Study Planner

#### Sections
1.  **Plan Timeline Calendar:** Month/Week grid displaying mapped topic study blocks.
2.  **Planner Config Sidebar:** Inputs for configuring daily hours budgets and exam dates.
3.  **Milestone Summary:** Horizontal timeline tracking syllabus coverage goals.

#### Components
*   `CalendarBlock`: Study blocks matching the user's syllabus hierarchy, colored in warm earth tones `#786e67` with `#dbd7c7` outlines.
*   `MilestoneIndicator`: Small, circular markers on the progress timeline. Completed milestones light up in `#faa114`.

#### States
*   **Loading:** Shimmer blocks over calendar cells.
*   **Conflict Alert:** Highlighted borders in `#faa114` with helper text: "Syllabus dates exceed preparation capacity. Rebalancing recommended."

---

### Page 4: Exam Explorer

#### Sections
1.  **Search & Tags Header:** Search bar with category tags.
2.  **Subject Tree Hub:** Nested accordion nodes showing the exam syllabus tree.
3.  **PYQ Repository:** Cards containing previous-year papers sorted by year.

#### Components
*   `SearchInput`: Minimal input field in `#fcfcfb` with a 1px border in `#dbd7c7`. Turns to `#faa114` on focus.
*   `SubjectAccordionNode`: Collapsible header blocks. Shows progress indicators in `#b3aa9e`.
*   `PYQCard`: Downloadable cards featuring PDF links and attempt statistics.

#### States
*   **Empty Search:** Displays: "No examinations match your query. Try searching for UPSC, JEE, or SSC."
*   **Loading:** Shimmer lines on the accordion lists.

---

### Page 5: Instant Quiz

#### Sections
1.  **Quiz Header:** Title of source, active timer countdown, and progress indicator.
2.  **Question Canvas:** Displays active questions and option buttons.
3.  **Explanation Drawer:** Sliding panel showing answers and explanations.

#### Components
*   `OptionButton`: Bordered buttons in `#dbd7c7`. Hover transitions to `#786e67`. Incorrect selection turns background to `#262a2b` with secondary text, correct turns background to `#faa114`.
*   `TimerBar`: Linear progression bar in `#faa114` running across the top screen border.

#### States
*   **Generating:** Displays: "Extracting concepts... generating questions."
*   **Timed Out:** Disables option selection, highlighting correct answers.

---

### Page 6: PDF Learning

#### Sections
1.  **PDF Document Viewer:** Interactive side panel displaying PDF page structures.
2.  **AI Workspace Pane:** Side-by-side chat view answering questions about the document context.

#### Components
*   `PDFCanvasContainer`: Scrolling viewport with page navigation controls.
*   `HighlightContextMenu`: Context popup offering "Define Concept" or "Add to Flashcards".
*   `WorkspaceChatInput`: Bordered input area with a clean send button in `#faa114`.

#### States
*   **Processing Ingestion:** Renders loading progress over document windows.
*   **Connection Offline:** Disables input tools, showing: "Disconnected. Reconnecting to AI workspace..."

---

### Page 7: Analytics

#### Sections
1.  **Overview Metrics Cards:** Visual summary grids showing accuracy, weekly study time, and speed metrics.
2.  **Mastery Heatmap:** Interactive map tracking syllabus mastery levels.
3.  **AI Insights Feed:** List of recommendations generated based on study records.

#### Components
*   `MasteryBlock`: Squares in the concept map colored according to mastery level: Mastered (`#faa114`), Strong (`#786e67`), Moderate (`#dbd7c7`), and Weak (`#262a2b`).
*   `InsightCard`: Textured cards featuring bold labels in `#faa114` and descriptions in `#262a2b`.

#### States
*   **Empty:** Displays: "Attempt a quiz to generate concept mastery metrics."
*   **Loading:** Shimmer lines over charts and heatmap blocks.

---

### Page 8: Progress

#### Sections
1.  **Milestone Map:** Graph detailing progress through syllabus nodes.
2.  **Achievements Vault:** Grid showing unlocked credentials.

#### Components
*   `MilestoneNode`: Nodes colored `#faa114` when completed, or `#dbd7c7` when locked.
*   `BadgeCard`: Small cards showing achievement icons in `#262a2b`.

#### States
*   **Loading:** Grid blocks render shimmer animations.

---

### Page 9: Profile

#### Sections
1.  **Account Panel:** Profile details, linked accounts, and configuration options.
2.  **Billing Dashboard:** Shows plan type details, billing status, and transaction histories.

#### Components
*   `TextInputField`: Clean inputs with `#dbd7c7` borders. Focused fields highlight in `#faa114`.
*   `SubscriptionBadge`: Badge in `#262a2b` with text highlights in `#faa114`.

#### States
*   **Updating Settings:** Inputs show small load icons.
*   **Error:** Show validation warnings: "Email address is invalid."

---

## 4. Component State Specifications

```
  [ Idle / Standard ] ──► Border: 1px Solid #dbd7c7  | Background: #fcfcfb
          │
          ▼
  [ Hover / Interaction ] ──► Border: 1px Solid #786e67  | Background: #dbd7c7
          │
          ▼
  [ Active / Selected ] ──► Border: 1px Solid #faa114  | Background: #fcfcfb
          │
          ▼
  [ Disabled ] ──► Border: 1px Solid #dbd7c7  | Background: #fcfcfb  | Text: #b3aa9e
```

### 4.1 Skeleton Loader Specs (Loading States)
*   **Background:** Linear gradient starting from `#fcfcfb` to `#dbd7c7` and back to `#fcfcfb`.
*   **Animation:** 1.5s infinite horizontal slide.

### 4.2 Empty State Specs
*   **Illustration Color:** Minimal wireframes in `#dbd7c7`.
*   **Typography:** Title in `#262a2b`, body in `#786e67`.

### 4.3 Alert/Toast Specs (Error States)
*   **Structure:** Minimal floating cards placed at the top center.
*   **Colors:** Accent bar in `#262a2b` with alert icons in `#faa114`.
