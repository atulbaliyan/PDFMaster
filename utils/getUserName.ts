export function getUserName(
  email?: string | null
): string {
  if (!email) return "User";

  // Get text before @
  let username = email.split("@")[0];

  // Remove numbers
  username = username.replace(/[0-9]/g, "");

  // Replace . _ - with spaces
  username = username.replace(/[._-]/g, " ");

  // Capitalize each word
  username = username
    .split(" ")
    .filter(Boolean)
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1).toLowerCase()
    )
    .join(" ");

  return username;
}