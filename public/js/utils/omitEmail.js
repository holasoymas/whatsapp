export function omitEmail(email) {
  if (!email.includes("@")) return email;
  return email.split("@")[0];
}
