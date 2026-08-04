/**
 * Regenerate draw.io XML + PNG for bosses 6–14 (fixed XML escaping).
 * Usage: node scripts/regen-position-pngs.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execFileSync } from "child_process";
import { BOSSES, makeDrawio } from "./gen-remaining-briefs.mjs";
import { BOSSES_9_14 } from "./briefs-9-to-14.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DRAWIO = "/Applications/draw.io.app/Contents/MacOS/draw.io";

const ALL = [...BOSSES, ...BOSSES_9_14];

for (const b of ALL) {
  const dir = path.join(ROOT, "assets", b.folder);
  fs.mkdirSync(dir, { recursive: true });
  const drawioPath = path.join(dir, `${b.folder}-positions.drawio`);
  const xml = makeDrawio({ id: b.id, pages: b.pages });
  // sanity: no raw <b> inside attributes
  if (/value="[^"]*<b>/.test(xml)) {
    throw new Error(`unescaped <b> still present in ${b.id}`);
  }
  fs.writeFileSync(drawioPath, xml);
  console.log("wrote", path.relative(ROOT, drawioPath));

  b.pages.forEach((_, i) => {
    const imgRel = b.brief.positions[i].diagram.img;
    const out = path.join(ROOT, imgRel);
    execFileSync(
      DRAWIO,
      ["-x", "-f", "png", "-p", String(i + 1), "-o", out, drawioPath],
      { stdio: "inherit" }
    );
  });
}

console.log("done", ALL.length, "bosses");
