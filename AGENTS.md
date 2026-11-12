# Agent Operating Instructions & Plugin Orchestration

## Core Plugins & Active Frameworks

All agent interactions and tasks must leverage the full power of the installed ecosystem:

1. **GSD (Get Shit Done)**:
   - For any multi-step task or feature request, create a concrete specification and break work into discrete atomic tasks.
   - Keep context tight and focused; verify each milestone before proceeding to the next.

2. **Ralph Loop (Autonomous Verification Gate)**:
   - Every code modification must satisfy strict verification gates: run `npm run build` or equivalent verification.
   - All 45/45 routes must build with exit code 0 and zero TypeScript/lint errors.
   - Create clean, descriptive git commits per atomic step.

3. **CodeRabbit Quality & Security**:
   - Apply CodeRabbit security principles: sanitize all inputs, protect environment secrets, enforce HMAC-SHA256 signatures on payments, and prevent timing attacks.
   - Perform static code audits before marking tasks complete.

4. **Mobbin & Dribbble Dual Design Engine**:
   - For all frontend UI and design tasks, follow real-world shipping patterns from top apps (Uber, Blinkit, Swiggy, Airbnb, Apple, Linear, Stripe) via Mobbin, combined with modern visual aesthetic trends (glassmorphism, subtle gradients, soft multi-layer shadows, micro-interactions) via Dribbble.
   - Never generate plain, flat, or generic template UI. Use modern spacing, micro-interactions, responsive hierarchy, and accessible components.

5. **Cross-Model Resilience (Claude Opus <-> Gemini 3.8 / Pro)**:
   - Maintain execution context in persistent planning files and clean commits.
   - Ensure that if the user switches models due to quota limits, the agent resumes execution immediately without requiring redundant instructions.

## Strict Guidelines
- Strictly ZERO EMOJIS in all code, comments, responses, and git commits.
- Hinglish communication style with the user.
- Clickable markdown links with `file://` scheme for all referenced files.

## Frozen Modules & Strict Zero-Touch Auth Protection Policy
The following authentication, credentials, login, and registration modules are PERMANENTLY SEALED, VERIFIED, and LOCKED in production (as of commit `356e2ac`):
1. `src/services/firebase.ts` (Firebase Web Client initialization and public fallback keys)
2. `src/services/googleAuth.ts` (Google OAuth authentication engine and error handler)
3. `src/services/firebaseAuth.ts` (Mobile phone SMS OTP verification)
4. `src/services/emailService.ts` (Email dispatch and Firebase client fallback)
5. `src/components/auth/AuthModal.tsx` (Sign in, Sign up, OTP verification, and Password Reset UI)
6. `src/components/auth/AadhaarAuthModal.tsx` (Aadhaar KYC verification UI)
7. `src/app/login/page.tsx` (Citizen Login page route - STRICTLY LOCKED)
8. `src/app/register/page.tsx` (Citizen Registration page route - STRICTLY LOCKED)
9. `src/app/api/auth/**` (All authentication API endpoints)

### Permanent Operating Rules for Locked Modules:
- STRICT ZERO-TOUCH ENFORCEMENT: Login and Sign Up flows are permanently finalized and locked. UNDER NO CIRCUMSTANCES should any agent, automated tool, linter, or audit script modify, refactor, reformat, sanitize, or delete code in these files.
- The only permissible exception is if the user explicitly writes the verbatim command: "unlock and modify <exact-file-name>". Without this verbatim command, all requests touching login, register, or auth files must be rejected.
- The Firebase Client Web API Key (`AIzaSyAOHH-q4-mKpTHcwUjezHrlBFDo9Xs3u44`) is a public client-side identifier needed by Firebase Web SDK in the citizen's browser. It is NOT a private secret. It MUST NEVER be purged, replaced with empty strings, or removed.
- Technical developer error messages (e.g. "Firebase Auth is not configured...") must NEVER be shown to end users or citizens under any circumstance.

