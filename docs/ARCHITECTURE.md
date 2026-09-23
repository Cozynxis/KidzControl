# KidzControl architecture

## Frontend
GitHub Pages hosts a static HTML/CSS/JS client. Parent Mode and Kids Mode share a local state adapter. BroadcastChannel provides instant same-browser tab sync.

## Cloud
Supabase supplies Auth, Postgres, Row Level Security and Realtime. The publishable key may be present in frontend code; authorization is enforced by RLS. Never put a service-role key in this repository.

## Data model
Family -> family members -> child profiles. Child profiles own rules, blocked items, requests, usage and activity events. Notifications belong to a family.

## Security
The browser is not trusted. UI checks are convenience only. Database access is restricted with RLS functions that verify the signed-in user belongs to the family containing the requested child profile.

## Enforcement
GitHub Pages cannot enforce OS-level restrictions. V2 enforces the KidzControl web experience and synchronizes policy state. A future native agent/PWA can consume the same rules transparently to enforce supported device-level controls.