import type { APIRoute } from "astro";
import { readFileSync } from "node:fs";

export const GET: APIRoute = () => {
  const content = readFileSync("downloads/hashes.txt.sig");
  return new Response(content, {
    headers: { "Content-Type": "application/pgp-signature" },
  });
};
