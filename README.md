# KidzControl
KidzControl is een GitHub Pages-first prototype met een aparte Parent Mode en Kids Mode.

## V1
- Parent dashboard
- Kids dashboard
- Live synchronisatie tussen tabs via BroadcastChannel + localStorage
- Parent PIN
- Daglimiet en extra tijd
- Pauzeren / hervatten
- Bedtijd en schoolplanning
- Website- en appregels
- Toegangs- en tijdverzoeken
- Goedkeuren/afwijzen
- Activiteitsdashboard
- Profielen
- Dark/light theme
- Meldingen/eventlog
- Developer Center
- Responsive desktop/mobile UI
- Supabase-koppelpunt voorbereid

## GitHub Pages
Zet Pages op **Deploy from a branch**, branch **main**, map **/(root)**.

## Test live sync
Open de Pages-site in twee tabs. Open tab 1 in Parent Mode en tab 2 in Kids Mode. De standaard Parent PIN is `2468`. Wijzig schermtijd of pauzeer Kids Mode in Parent Mode; de andere tab wordt direct bijgewerkt.

## Belangrijk
Deze eerste GitHub Pages-versie beheert alleen gedrag binnen KidzControl zelf. Een browserpagina kan niet zelfstandig andere apps op een tablet/pc afsluiten of het OS vergrendelen. Een toekomstige KidzControl Agent/PWA/native app kan daar een aparte, transparante handhavingslaag voor bieden.

## Supabase
De UI is voorbereid op Supabase, maar echte accounts vereisen nog een Supabase-project, database-schema en project keys. Zet nooit een service-role key in GitHub Pages.
