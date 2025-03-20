function countryCodeToFlag(countryCode) {
  // Validate the input to be exactly two characters long and all alphabetic
  if (
    !countryCode ||
    countryCode.length !== 2 ||
    !/^[a-zA-Z]+$/.test(countryCode)
  ) {
    return "🏳️"; // White Flag Emoji for unknown or invalid country codes
  }

  // Convert the country code to uppercase to match the regional indicator symbols
  const code = countryCode.toUpperCase();

  // Calculate the offset for the regional indicator symbols
  const offset = 127397;

  // Convert each letter in the country code to its corresponding regional indicator symbol
  const flag = Array.from(code)
    .map((letter) => String.fromCodePoint(letter.charCodeAt(0) + offset))
    .join("");

  return flag;
}

module.exports = { countryCodeToFlag };
