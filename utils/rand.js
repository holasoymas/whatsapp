import crypto from "node:crypto";

export function generateRand(len) {
  return crypto.randomBytes(len).toString("hex");
}
