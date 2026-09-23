# KidzControl V2 test plan

1. Create a Parent account from the landing screen.
2. Confirm email if Supabase email confirmation is enabled.
3. Sign in. The bootstrap RPC creates a family and the client creates the first child.
4. Open Parent Mode and Kids Mode in separate tabs.
5. Change daily limit. Verify the second tab refreshes.
6. Toggle pause. Verify Kids Mode shows its pause banner.
7. Create an extra-time request in Kids Mode.
8. Approve it in Parent Mode and verify extra_minutes increases.
9. Change bedtime/school schedule and verify the Kids agreements page.
10. Rename the child and verify header/profile updates.
11. Inspect Supabase rules, requests and activity_events.
12. Sign out/in and verify cloud state returns.

Fallback behavior: without an authenticated Supabase session, KidzControl continues in local browser mode. This is intentional so the UI remains testable.