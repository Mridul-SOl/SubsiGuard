# SubsiGuard Frontend

SubsiGuard is a hackathon MVP dashboard for detecting leakage and fraud in Indian government subsidy programs including PDS, PM-KISAN, LPG, and MGNREGA.
# SubsiGuard – Frontend Development Tasks  
Full Task Breakdown for Next.js 15 (App Router) Frontend

**Project Context**  
SubsiGuard is a hackathon MVP dashboard for detecting leakage & fraud in Indian government subsidy programs (PDS, PM-KISAN, LPG, MGNREGA etc.).  
Frontend goals: professional look, strong social impact storytelling, responsive, demo-ready in short time.

**Tech Stack (Frontend)**  
- Next.js 15 (App Router) + TypeScript  
- TanStack Query v5 (data fetching, caching, mutations)  
- Tailwind CSS + shadcn/ui + Lucide React icons  
- Theme: Dark mode default (#0f172a navy, #10b981 emerald accents)  
- Charts: Recharts  
- Map: react-leaflet + OpenStreetMap (India state heatmap)  
- UI extras: sonner (toasts), canvas-confetti, jsPDF + autoTable (PDF export)  

## 1. Project Setup & Foundation (Do First – Critical)

- [ ] Initialize Next.js 15 project in `frontend/` folder  
  ```bash
  npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

 Install core dependenciesBashnpm install @tanstack/react-query @tanstack/react-table lucide-react recharts react-leaflet leaflet @types/leaflet sonner canvas-confetti jspdf jspdf-autotable
npm install -D @types/node @types/leaflet
 Configure Tailwind for dark mode & custom colors
tailwind.config.ts: add colors (navy: '#0f172a', emerald: '#10b981')
Force dark mode (class strategy + dark class on <html>)

 Initialize shadcn/uiBashnpx shadcn-ui@latest initAdd early components: Button, Card, Badge, Table, Tabs, Skeleton, Input, Label, Toast, Dialog, etc.
 Create root layout (app/layout.tsx)
Apply global dark theme
Wrap children with:
TanStack Query Provider
Sonner Toaster


 Set up environment
Create .env.local
Add: NEXT_PUBLIC_API_URL=http://localhost:8000

 Create API utilities
lib/api.ts or hooks/useApi.ts – typed fetcher + base query client setup


2. Required Routes / Pages



































RoutePriorityMain Purpose & Key Features/ (landing)HighHero + stats + impact story + “Try Demo” CTA + subtle fake testimonials/uploadCriticalDrag-and-drop CSV upload + file preview table + “Analyze” button/dashboardCriticalKPI cards + Tabs (Overview / Fraud Analysis) + charts + flagged cases table/results/[fileId]HighDetailed fraud report + per-row reasons + export buttons (PDF + CSV)/demo (optional)MediumOne-click auto-load synthetic data → analyze → redirect to dashboard/results
3. Reusable Components to Build

<Header /> or <Navbar />
Logo + title + theme toggle (optional) + GitHub link
<Footer />
Minimal copyright + hackathon mention
<KpiCard />
Title, large value, optional delta %, icon (Lucide)
<DataTable />
TanStack Table wrapper: sorting, filtering, pagination, column visibility
<FraudScoreBadge />
Green/yellow/red badge + score % + tooltip with primary reason
<IndiaHeatmap />
react-leaflet choropleth – state-level fraud/leakage intensity (highlight UP, MP, Bihar)
<CsvDropZone />
Drag-and-drop area + hover/focus states + .csv validation
<LoadingSkeleton /> variants (cards, table rows, chart placeholders)
<ExportButtons />
PDF (jsPDF + autoTable) + CSV download triggers

4. Data Fetching / Mutations (TanStack Query)

useUploadCsv mutation → POST /upload → file → { file_id, previewRows }
useAnalyze mutation → POST /analyze → { file_id } → full analysis result
useGetResults query → GET /results/{fileId} (cached)
useSyntheticData query → GET /synthetic (for demo mode)
 Add optimistic updates + loading/error states on analyze action

5. Page-Specific Implementation Checklist
Landing Page (/)

Hero headline + ₹1.5 lakh crore leakage stat
3–5 impact KPI cards
Fake testimonials (2–3 subtle quotes/cards)
“Try Demo” button (redirect to /upload or trigger demo flow)
Subtle background (gradient or faint India outline)

Upload Page (/upload)

Large centered drag-and-drop zone
Show selected file name/size
Preview table (first 10–20 rows) using shadcn Table
“Analyze for Fraud” button (disabled until file ready)
Toast feedback on upload success/error

Dashboard (/dashboard)

Top KPI row (5 cards): total records, flagged count, leakage %, avg fraud score, top risky state
Tabs: Overview | Fraud Analysis
Recharts:
Bar chart: leakage % by state
Pie chart: fraud vs legitimate %
Histogram: fraud score distribution
Area/line: claims timeline (if dates available)

India state heatmap (react-leaflet)
Sortable/filterable table of flagged cases

Results Page (/results/[fileId])

Summary header (KPIs)
Detailed table (all rows or flagged-only toggle)
Expandable rows → show fraud reasons in plain language
Export section: PDF full report + CSV of flagged rows

6. Polish & Hackathon Touches

 Loading skeletons on all async areas
 Toast notifications (upload, analyze success/error)
 Confetti on successful analysis completion
 Fully responsive (mobile → desktop)
 Custom 404 page (branded)
 Favicon + metadata (title + description with social impact keywords)
 Optional: simple sidebar navigation

Recommended Build Order (Fastest Path to Impressive Demo)

Project init + layout + shadcn + Query provider
/upload page + dropzone + preview table + upload mutation
Test backend connection (/health)
/results/[fileId] page + render basic results
Analyze mutation + display results
/dashboard with KPI cards + basic charts
Landing page polish
India heatmap + more charts
PDF export + confetti + toasts
Optional demo mode
## Tech Stack

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Data Fetching**: TanStack Query v5
- **Styling**: Tailwind CSS + shadcn/ui
- **Charts**: Recharts
- **Map**: react-leaflet + OpenStreetMap
- **Icons**: Lucide React
- **Notifications**: Sonner
- **PDF Export**: jsPDF + autoTable
- **Animations**: canvas-confetti

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```
   Update `NEXT_PUBLIC_API_URL` if needed (default: `http://localhost:8000`)

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open** [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── layout.tsx          # Root layout with providers
├── providers.tsx       # TanStack Query provider
├── page.tsx           # Landing page
├── upload/            # CSV upload page
├── dashboard/         # Main dashboard
└── results/[fileId]/  # Detailed results page

components/
├── ui/                # shadcn/ui components
├── kpi-card.tsx       # KPI display card
├── data-table.tsx     # Sortable table
├── fraud-score-badge.tsx
├── csv-dropzone.tsx
├── india-heatmap.tsx
└── export-buttons.tsx

lib/
├── api.ts            # API utilities
└── utils.ts          # Helper functions

hooks/
├── use-upload-csv.ts
├── use-analyze.ts
├── use-get-results.ts
└── use-synthetic-data.ts
```

## Features

- 📊 **Real-time Analytics**: KPI cards, charts, and state-wise heatmaps
- 🔍 **Fraud Detection**: AI-powered analysis of subsidy data
- 📁 **CSV Upload**: Drag-and-drop interface with preview
- 📈 **Interactive Charts**: Bar, pie, histogram, and timeline visualizations
- 🗺️ **India Heatmap**: State-level fraud intensity visualization
- 📄 **Export**: PDF reports and CSV downloads
- 🎨 **Dark Theme**: Professional navy and emerald color scheme
- 📱 **Responsive**: Mobile-first design

## Development

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## License

MIT
