# Cytoscape Home

[![Deploy Status](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-orange)](https://cytoscape-home.pages.dev/)
[![License](https://img.shields.io/badge/License-Cytoscape%20Consortium-blue)](LICENSE)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)](https://vitejs.dev/)

**Cytoscape Home** is the centralized web portal and landing page for the **Cytoscape**. It serves as an entry point for bench biologists and bioinformaticians to discover, access, and utilize powerful network biology tools including Cytoscape Desktop, Cytoscape Web, NDEx, and GeneMANIA.

The application is designed to guide users from raw data (gene lists, enrichment files) to actionable network visualizations and analyses through interactive wizards and unified search capabilities.

## 🚀 Key Features

### 🔍 Unified Search & Discovery
- **Multi-API Integration:** A centralized search bar that simultaneously queries multiple bioinformatics databases to find relevant genes, pathways, and networks.
- **Gene Analysis:** Instantly search for gene functions and interactions using **GeneMANIA** and **MyGene.info**.
- **Pathway Discovery:** Search for biological pathways via **WikiPathways**.
- **Network Search:** Find published networks hosted on the **NDEx** (Network Data Exchange).

### 🧙‍♂️ Guided Workflows (Wizards)
Interactive step-by-step guides help users choose the right tool based on their specific data type:
- **Gene Analysis Wizard:** Identifies organisms from gene lists and guides users to function prediction tools.
- **Enrichment Analysis Wizard:** Directs users with differential expression data to **EnrichmentMap**.
- **Network Figure Wizard:** Helps users upload spreadsheet data to **Cytoscape Web** for immediate visualization.
- **Tutorials Wizard:** A searchable index of protocols and learning materials for the ecosystem.

### 🌐 Ecosystem Integration
Seamlessly connects the suite of Cytoscape tools:
- **Cytoscape Web:** Browser-based network visualization.
- **Cytoscape Desktop:** Links to download the full-feature desktop client.
- **NDEx:** Cloud storage for biological networks.
- **GeneMANIA:** Fast gene function prediction.

## 🛠 Tech Stack

- **Framework:** [React](https://react.dev/) (v18)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Headless UI](https://headlessui.com/)
- **Data Fetching:** [TanStack Query](https://tanstack.com/query/latest) (React Query)
- **Search Indexing:** [MiniSearch](https://github.com/lucaong/minisearch) (Client-side full-text search)
- **Visualization:** [Cytoscape.js](https://js.cytoscape.org/) & [Cytoscape-fcose](https://github.com/iVis-at-Bilkent/cytoscape.js-fcose)
- **Icons:** [Heroicons](https://heroicons.com/)

## 📂 Project Structure

```text
.
├── public/              # Static assets (images, logos, tutorials JSON)
├── src/
│   ├── app/             # Main application layout, routes, and shared logic
│   │   ├── shared/      # Shared utilities (SearchEngine, API queries)
│   ├── components/      # Reusable UI components
│   │   ├── base/        # Atomic components (Buttons, Fields, Dialogs)
│   │   ├── wizards/     # Logic for "Get Started" workflow steps
│   │   └── ...          # Feature-specific components (Hero, Results, Guide)
│   ├── images/          # Component-specific SVG assets
│   ├── styles/          # Tailwind configuration and global CSS
│   └── main.jsx         # Application entry point
├── .eslintrc.cjs        # ESLint configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── vite.config.js       # Vite configuration
```

## ⚡ Getting Started
### Prerequisites
Ensure you have Node.js (v16 or higher recommended) and npm installed on your machine.

### Installation
1. Clone the repository:

<pre>git clone https://github.com/cytoscape/cytoscape-home.git cd cytoscape-home</pre>

2. Install dependencies:

<pre>npm install</pre>

## Development
To start the local development server with Hot Module Replacement (HMR):

<pre>
npm run dev
# or
npm run watch
</pre>

Open http://localhost:5173 to view the site in your browser.

## 📦 Build & Deployment
To build the application for production (optimizes and minifies the code into the dist/ folder):
<pre>npm run build</pre>

To preview the production build locally:
<pre>npm run preview</pre>

## ✅ Linting
This project uses ESLint with React-specific plugins. To check for code quality issues:
<pre>npm run lint</pre>

## 📄 License
### Copyright (c) 2023-2024, The Cytoscape Consortium.

This project is licensed under the terms found in the LICENSE file. The software is provided "AS IS", without warranty of any kind.

## 🔗 Related Links
[Cytoscape.org](https://cytoscape.org/)

[Cytoscape App Store](https://apps.cytoscape.org/)

[Cytoscape Manual](https://manual.cytoscape.org/en/stable/)

[NDEx Bio](https://www.ndexbio.org//#/)