# TEDxIGDTU Recruitment Portal

## What I built
An integrated TEDxIGDTU website enhancement that adds a branded, on-site recruitment flow in place of a generic Google Form while preserving the event website experience. Applicants can select a team, preview their application ticket, submit their details, and receive an application status. An admin manifest provides search, filters, status updates, applicant details, and CSV export.

## Problem solved
The original site can turn recruitment into a natural part of the TEDx journey instead of sending visitors to a separate form. This enhancement gives applicants event context, a clear “Join the team” entry point, an immediate ticket-style confirmation, and gives organizers a lightweight review manifest.

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
Not deployed yet. The project is ready to publish through Vercel; after deployment, replace this line with the generated production URL.

## Submission status
- GitHub repository: https://github.com/vijayajaiswal398-commits/tedxigdtu-recruitment
- Deployed link: Pending Vercel deployment
- README: Complete

## AI tools used
- v0 by Vercel for design exploration, implementation, and iteration.
- Agent Browser for preview verification.

## What I would improve with more time
- Add a real database with server-side validation and authenticated admin access.
- Add email confirmation and applicant status notifications.
- Add file uploads for resumes/portfolios with secure storage.
- Add analytics for application completion and team demand.
- Add a production database, deployment URL, and final screenshots of the recruitment and admin views.

## Development
Install dependencies with pnpm, then run the Next.js development server with `pnpm dev`.

The project is available in the GitHub repository above and is ready to publish through the Vercel Publish flow.
