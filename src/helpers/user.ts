export function convertToUsername(name: string) {
  return name.replace(/\s/g, "").toLowerCase();
}
