# TEDxIGDTU Recruitment Portal

## What I built
A TEDxIGDTU-inspired recruitment experience that replaces a generic Google Form with a branded application portal. Applicants can select a team, preview their application ticket, submit their details, and receive an application status. An admin manifest provides search, filters, status updates, applicant details, and CSV export.

## Problem solved
Recruitment submissions are easier to discover, review, and manage when they live inside the event website instead of being separated into an external form. The experience also gives applicants clearer context about each team and immediate confirmation after applying.

## Key technical and design decisions
- Next.js App Router with a responsive client-side application flow.
- Dark theatrical visual system inspired by the supplied TEDxIGDTU stage reference.
- Red, charcoal, warm white, and muted gray palette to preserve TEDx brand energy without visual clutter.
- Accessible form labels, keyboard-friendly dialogs, validation, duplicate-email protection, and responsive layouts.
- Local demo data powers the prototype; production persistence can be connected to a database and authenticated admin role.

## Screenshots
Open the site locally or use the deployed link below to view the recruitment portal and admin manifest.

![TEDxIGDTU recruitment portal](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iq1quOrwBKlxJofoNRli5VWtJemrko.png)

## Deployed link
_To be added after publishing through Vercel._

## AI tools used
- v0 by Vercel for design exploration, implementation, and iteration.
- Agent Browser for preview verification.

## What I would improve with more time
- Add a real database with server-side validation and authenticated admin access.
- Add email confirmation and applicant status notifications.
- Add file uploads for resumes/portfolios with secure storage.
- Add analytics for application completion and team demand.
- Connect the deployed URL and include screenshots of the finished recruitment and admin views.

## Development
Install dependencies with pnpm, then run the Next.js development server with `pnpm dev`.

The project is ready to be connected to a GitHub repository and published through the Vercel Publish flow.
