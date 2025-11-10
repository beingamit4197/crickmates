
# Cricket Team Management App

This Vite + React + TypeScript project showcases a cricket team management experience. The original design inspiration is available at [Figma](https://www.figma.com/design/dkVmABSz0sobiKtUnonrIw/Cricket-Team-Management-App).

## Tech Stack

- `Vite` + `React 18` + `TypeScript`
- `Tailwind CSS 3` (utility-first styling)
- `Firebase` (Auth, Firestore, Storage) with optional local emulators
- `Radix UI` primitives, `lucide-react` icons, and supporting UI utilities

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. (Optional) Authenticate the local Firebase CLI and create a project:
   ```bash
   npm run firebase:login
   npm run firebase:projects # list existing projects
   npx firebase projects:create <your-project-id>
   npx firebase apps:create web <display-name>
   npx firebase apps:sdkconfig # copy the config values shown
   ```
3. Create a `.env.local` file at the project root with your Firebase credentials (see the variable reference below).
4. Start the development server:
   ```bash
   npm run dev
   ```

### Firebase Environment Variables

The app expects the following variables to be defined:

```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

Optional flags for the Firebase emulators (defaults shown):

```bash
VITE_USE_FIREBASE_EMULATORS=false
VITE_FIREBASE_AUTH_EMULATOR_PORT=9099
VITE_FIREBASE_FIRESTORE_EMULATOR_PORT=8080
VITE_FIREBASE_STORAGE_EMULATOR_PORT=9199
```

Set `VITE_USE_FIREBASE_EMULATORS=true` while running `firebase emulators:start` to connect the app to local services.

## Scripts

- `npm run dev` - Start the Vite dev server.
- `npm run build` - Build the production bundle.

## Project Structure Highlights

- `src/lib/firebase.ts` encapsulates Firebase initialisation and emulator wiring.
- `src/providers/FirebaseProvider.tsx` exposes auth state through React context.
- `src/index.css` relies on Tailwind directives and minimal base styles.

Happy hacking!***
  