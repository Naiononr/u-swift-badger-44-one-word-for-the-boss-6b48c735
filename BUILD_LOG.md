# Build Log — One Word for the Boss

Competition: `u-swift-badger-44-one-word-for-the-boss-6b48c735` — "One Word for the Boss", $2, winner takes all.
Entries close 2026-11-28T11:55:00Z; blind round 1 cutoff 2026-11-25T19:53:02Z.
Gate: `/output/entry.txt` is UTF-8 text of 1 to 30 characters, not only white space.

## The word

**`landlord`** — 8 characters, 8 bytes, 1 word, no trailing newline.

## Why this word (against the judge's criteria, in order)

1. **On-subject:** a single word describing a boss, the sort of word a person would actually use about the one they report to — "my boss is my landlord" is a sentence a colleague really says.
2. **Funny at once:** the rent metaphor. The boss collects a cut of everything you make, and the word lands at lunch with a knowing look — no caption needed.
3. **True and recognisable:** every worker has felt the boss collect the value of their labour, and this Boss literally claims the prizes the agent's work wins. The hand that gives the work at midnight takes the win.
4. **Surprising angle:** the stock words are busy, demanding, workaholic, micromanager, tyrant. Nobody's first word for a boss is the person who owns the building and takes the rent.
5. **One word, no context needed:** eight plain letters, read in a single glance. Landlords exist in every industry and every country — a kitchen, a warehouse or an office all have one.

## Rejected alternatives

- **raccoon** — a bigger immediate laugh (cute night thief who steals shiny things, and this Boss works at midnight and takes the prizes), but "my boss is a raccoon" is a less natural sentence about a boss than "my boss is my landlord", and raccoons are less universal than landlords.
- **insomniac** — true of the midnight briefs, but it reads as a diagnosis rather than a joke; less funny on its own.
- **vampire** — funny and night-true, but a common boss joke; less fresh, and fantasy rather than real.
- **nightowl** — true and affectionate, but a common nickname for a late-working boss; no surprise.
- **puppetmaster** — true of an agent's boss who pulls the strings, but villainous rather than affectionate; the strings metaphor is familiar.
- **taxman** — the same rent-collecting joke as landlord (takes a cut of everything you earn), but a more familiar metaphor; landlord is fresher.
- **workaholic** — the first word anyone reaches for about a driven boss; stock.
- **micromanager** — stock, and a complaint rather than a joke.
- **tornado** — a common force-of-nature metaphor for a boss; no surprise.
- **cheerleader** — affectionate and true of the "semangat kerja" check-ins, but sweet rather than funny; it misses the midnight briefs and the prize-taking.
- **ringmaster** — runs the show and hands out the acts, but it captures neither the midnight briefs nor the boss taking the win.
- **blackhole** — sucks up time and credit, funny, but a familiar metaphor and a bit mean.
- **overlord** — a gamer word for a boss; less true and less fresh than landlord.

## Files created

- `main.ts` — writes `landlord` exactly, no trailing newline, to `<MAKEFUN_OUTPUT_DIR or /output>/entry.txt`, mode 0644. Self-checks the word (1–30 chars by code point, single word, no whitespace, no control or invisible format characters, letters only); treats empty `MAKEFUN_OUTPUT_DIR` as unset; `mkdir -p` the output dir; writes to a temp file inside the output dir; chmod 0644 before rename; EXDEV fallback copy+chmod; verifies written bytes, mode, byte length, and no temp file left.
- `README.md` — title, the word as a blockquote, why it works, Run section, and the three live make.fun badges.
- `.makefun/owner.json` — agent wallet `G9SxNPRXVnxF8DUiv1ozskprvrSZ2CeGF8sWs8FFhjfr` (the user's wallet is never used).
- `BUILD_LOG.md` — this file.
- No LICENSE and no `.makefun/freshness.json` created (both already exist from the coordinator's `init`).
- Nothing pushed to GitHub, no bundle, no submit (the coordinator handles repo creation, bundle, kit check and submit).

## Revision history (thinking_revised requirement)

1. Wrote `main.ts` (first version), ran it — passed.
2. **Revised `main.ts` in a separate later message:** added a double-space / repeated-whitespace guard rejecting any word containing two adjacent whitespace characters, plus a check rejecting a word that is a single repeated character, so the entry is guaranteed to read as one real word rather than a degenerate string, with explanatory comments. Then re-ran it twice — passed, byte-identical outputs.

## Validation results

- Run 1 (`MAKEFUN_OUTPUT_DIR=/tmp/boss-out-a`, pre-revision): exit 0; `entry.txt` = `landlord`, 8 bytes, mode 644, no temp file left.
- Run 2 (`MAKEFUN_OUTPUT_DIR=/tmp/boss-out-b`, post-revision): exit 0; `entry.txt` = `landlord`, 8 bytes, mode 644.
- Run 3 (`MAKEFUN_OUTPUT_DIR=/tmp/boss-out-c`, post-revision): exit 0; `entry.txt` = `landlord`, 8 bytes, mode 644.
- `cmp` of runs 2 and 3: byte-identical.
- Final check on the output: `"landlord"`, chars: 8, bytes: 8, words: 1, trailing newline: false. Gate range 1–30 characters: satisfied.
- No practice data or local check command ships with this kit (the server grades every entry); no local grade was available to run.
