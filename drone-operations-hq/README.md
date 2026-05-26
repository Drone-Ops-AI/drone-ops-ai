# Drone Operations HQ - FAA Part 107 Study System

A comprehensive, full-stack FAA Part 107 prep system equipped with 45 real exam questions, analytics, a flight command center, airspace command systems, and an AI Ground Tutor powered by the Google Gemini API.

## 🚀 Production Deployment (Google Cloud Run / Container Environments)

This application is fully optimized for containerized production environments like **Google Cloud Run** and **Google Cloud Build**.

### 1. Unified Port Binding
The production server automatically binds to the `PORT` environment variable provided by Cloud Run (which defaults to `8080` or `3000` depending on the platform) using the standard:
```typescript
const PORT = process.env.PORT || 8080;
```

### 2. Standard Production Build and Run Scripts
To run the server in a containerized environment, execute the following production scripts:

```bash
# Install dependencies
npm install

# Build the client and compile the server for production
npm run build

# Start the optimized production server (listens on PORT)
npm run start
```

### 3. Production Compilation Workflow
When `npm run build` is run:
- **Vite** builds and packs the React frontend assets into static files in `/dist`.
- **esbuild** bundles and compiles the server (`server.ts`) into a standalone, optimized CommonJS file at `/dist/server.cjs` with soucemaps for fast execution and zero runtime package path resolution errors to avoid any ESM relative import bottlenecks.
- The production command `npm run start` launches Node natively on `/dist/server.cjs`, serving the React frontend as static assets and exposing the backend API routes on the requested Cloud Run container port.

## ⚙️ Environment Configuration

To enable the live **AI Ground Tutor** with real-time feedback, configure the following environment variable in your secret store or container environment:

```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```
*(If no API key is provided, the application will automatically fall back to the built-in federal Ground Intelligence Offline Mode)*

## 🛠️ Local Development (Offline/Dev Sandbox)

To run the application in a local developer sandbox:
```bash
npm run dev
```
The dev sandbox integrates **Vite middleware** for hot-reloading and development modules.
