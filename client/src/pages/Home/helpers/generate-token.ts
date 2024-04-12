export function generateToken() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseAlphabet = alphabet.toUpperCase();
  const numbers = "0123456789";
  let token = "";
  for (let i = 0; i < 10; i++) {
    const random = Math.random();
    if (random < 0.33) {
      token += alphabet[Math.floor(Math.random() * alphabet.length)];
    } else if (random < 0.66) {
      token +=
        upperCaseAlphabet[Math.floor(Math.random() * upperCaseAlphabet.length)];
    } else {
      token += numbers[Math.floor(Math.random() * numbers.length)];
    }
  }
  return token;
}
