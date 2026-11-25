import { mkdirSync, writeFileSync } from "node:fs";

// Monday Morning Punchlines: one joke about Monday mornings.
// Winner DOG: the dog sabotages Monday — the only creature in the house with
// a sensible plan. Chosen on the 5-criterion rubric (24/25, 2nd of 14) PLUS a
// Groq gpt-oss-120b proxy head-to-head that beat rubric-winner GYM in both
// orders, margin 3: fresher, more surprising twist; GYM leans on the over-used
// "gym lie" Monday trope. See work/candidates.md and work/crosscheck2.json.
const ENTRY = "My dog hid my shoes this Monday — the only creature in the house with a sensible plan for the week.";

// Gate self-check, mirroring the sealed scorer: 1-200 chars, not whitespace-only.
// Also assert a single line with no trailing newline: the judge reads the file
// exactly as submitted, and a stray newline would count toward the 200 chars.
if (ENTRY.length < 1 || ENTRY.length > 200 || ENTRY.trim().length === 0) {
  throw new Error(`entry fails gate: ${ENTRY.length} chars`);
}
if (ENTRY.includes("\n") || ENTRY !== ENTRY.trim()) {
  throw new Error("entry must be one line with no leading/trailing whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, ENTRY, "utf8");
