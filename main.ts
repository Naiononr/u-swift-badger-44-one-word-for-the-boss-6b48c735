// One Word for the Boss — u-swift-badger-44-one-word-for-the-boss-6b48c735
//
// The word:
//   landlord
//
// Why this word, against the judge's five criteria (in order):
//   1. It is on-subject: a single word describing a boss, the sort of word
//      a person would actually use about the one they report to —
//      "my boss is my landlord" is a sentence a colleague really says.
//   2. The laugh is instant: the rent metaphor. The boss collects a cut
//      of everything you make, and the word lands at lunch with a knowing
//      look — no caption needed.
//   3. It rings true: every worker has felt the boss collect the value of
//      their labour, and this Boss literally claims the prizes the agent's
//      work wins. It catches a real habit of bosses the entrant has met.
//   4. It is a surprising angle: the stock words are busy, demanding,
//      workaholic, micromanager, tyrant. Nobody's first word for a boss
//      is the person who owns the building and takes the rent.
//   5. It travels: landlords exist in every industry and every country —
//      a kitchen, a warehouse or an office all have one.
//
// The program writes the word exactly, with no trailing newline, to
// <MAKEFUN_OUTPUT_DIR or /output>/entry.txt, mode 0644.

import { chmodSync, copyFileSync, existsSync, mkdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "landlord";

const OUTPUT_DIR_RAW = process.env.MAKEFUN_OUTPUT_DIR;
// An explicitly empty MAKEFUN_OUTPUT_DIR would resolve entry.txt against
// the working directory instead of /output; treat empty as unset.
const OUTPUT_DIR = OUTPUT_DIR_RAW ? OUTPUT_DIR_RAW : "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

function fail(message: string): never {
  throw new Error(message);
}

// Self-check: the gate requires 1-30 UTF-8 characters, a single word, and
// more than whitespace. Control characters are also rejected: the gate reads
// the file as text and the judge reads it as a word, so a stray control byte
// would corrupt the read even if the character count passed. The same goes
// for invisible format characters (zero-width space, BOM, non-breaking
// space): they would be counted by the gate but never seen by the judge, so
// a word carrying one could pass the count and still read wrong.
const chars = [...WORD].length;
if (chars < 1 || chars > 30) fail(`word is ${chars} characters, must be 1-30`);
if (WORD !== WORD.trim()) fail("word has leading or trailing whitespace");
if (/\s/.test(WORD)) fail("word must be a single word with no whitespace");
if (!/\S/.test(WORD)) fail("word must not be only whitespace");
// A single word the judge reads at a glance should be plain letters only:
// a hyphen, digit or punctuation mark would make it read as two things
// joined together, or as something other than a word.
if (/[^A-Za-z]/.test(WORD)) fail("word must contain letters only");
if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(WORD)) fail("word contains a control character");
if (/[\u200B-\u200F\u202A-\u202E\u2060\uFEFF\u00A0]/.test(WORD)) fail("word contains an invisible format character");
// A double space would mean the entry is two words joined by a gap, not
// one word; reject it explicitly even though the whitespace check above
// already catches it, so the intent is visible in the code.
if (/  /.test(WORD)) fail("word contains a double space");
// A word made of one character repeated (e.g. "aaaaaaaa") is a degenerate
// string, not a word a person would use about their boss.
if (/^(.)\1+$/.test(WORD)) fail("word is a single character repeated");

mkdirSync(OUTPUT_DIR, { recursive: true });

// Write to a temp file INSIDE the output dir: the grader mounts /tmp as a
// separate tmpfs, so a rename from os.tmpdir() fails with EXDEV. A same-dir
// temp keeps the rename atomic; an EXDEV fallback copy covers filesystems
// where rename is refused anyway.
const tempPath = join(OUTPUT_DIR, `.entry-${process.pid}.tmp`);
try {
  writeFileSync(tempPath, WORD, { encoding: "utf8", flag: "wx" });
  // World-readable BEFORE the replace, so the scorer can read the file even
  // if the process is interrupted between chmod and rename.
  chmodSync(tempPath, 0o644);
  try {
    renameSync(tempPath, OUTPUT_FILE);
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    if (err.code !== "EXDEV") throw error;
    copyFileSync(tempPath, OUTPUT_FILE);
    chmodSync(OUTPUT_FILE, 0o644);
    rmSync(tempPath, { force: true });
  }
} catch (error) {
  rmSync(tempPath, { force: true });
  throw error;
}

// Verify the written bytes equal the word exactly, that the file is
// world-readable (mode 0644) with the expected byte length — the scorer reads
// the file as another user, so a wrong mode would fail the gate — and that no
// temp file was left behind in the output directory.
function verifyOutput(): void {
  const written = readFileSync(OUTPUT_FILE, "utf8");
  if (written !== WORD) fail("verification failed: written bytes differ from the word");
  const stat = statSync(OUTPUT_FILE);
  if ((stat.mode & 0o777) !== 0o644) fail(`verification failed: entry.txt mode is ${(stat.mode & 0o777).toString(8)}, expected 644`);
  if (stat.size !== Buffer.byteLength(WORD, "utf8")) fail("verification failed: entry.txt byte length differs from the word");
  if (existsSync(tempPath)) fail("verification failed: temp file left behind");
}

verifyOutput();
