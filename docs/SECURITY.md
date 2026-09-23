# Security model
KidzControl uses the public Supabase publishable key in the frontend. This is expected for browser clients. Authorization must come from Postgres Row Level Security, not secrecy of that key.

Never commit a service-role key, database password, access token or private credential.

The app intentionally does not implement hidden keylogging, webcam/microphone capture, password collection or stealth browsing surveillance. Activity events are explicit KidzControl events.

Parent PIN is currently a local convenience lock, not a replacement for Supabase authentication. Cloud access is controlled by authenticated user identity and RLS.