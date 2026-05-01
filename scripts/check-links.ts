import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { defaultLocale, locales } from "../src/i18n/config";
import pkg from "../package.json" with { type: "json" };

const distDir = resolve("dist");
const tempDir = mkdtempSync(join(tmpdir(), "lychee-"));
const reportFile = join(tempDir, "report.json");

const nonDefaultLocales = Object.keys(locales).filter(
  (l) => l !== defaultLocale,
);

const args = [
  "--config",
  "lychee.toml",
  "--root-dir",
  distDir,
  "--remap",
  `${pkg.homepage} file://${distDir}`,
  "--fallback-extensions",
  "html",
  "--format",
  "json",
  "--output",
  reportFile,
];

if (nonDefaultLocales.length > 0) {
  args.push("--exclude-path", `dist/(${nonDefaultLocales.join("|")})/`);
}

args.push("dist");

const child = spawn("lychee", args, { stdio: "inherit" });

child.on("exit", (code) => {
  try {
    if (!existsSync(reportFile)) process.exit(code ?? 1);

    const report = JSON.parse(readFileSync(reportFile, "utf8"));
    const counts = new Map<string, number>();

    for (const fileFailures of Object.values<unknown>(
      report.error_map ?? {},
    )) {
      if (!Array.isArray(fileFailures)) continue;
      for (const f of fileFailures) {
        const url = (f as { url?: string }).url;
        if (url) counts.set(url, (counts.get(url) ?? 0) + 1);
      }
    }

    if (counts.size === 0) {
      console.log("\nAll links OK");
    } else {
      console.log(`\n${counts.size} unique broken URLs:\n`);
      for (const [url, count] of [...counts].sort((a, b) => b[1] - a[1])) {
        console.log(`  [${count.toString().padStart(4)}] ${url}`);
      }
    }
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
  process.exit(code ?? 1);
});
