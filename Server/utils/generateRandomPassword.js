// Function to generate a random password of length between 8 and 16
const generateRandomPassword = () => {
  const length = Math.floor(Math.random() * (16 - 8 + 1)) + 8;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

module.exports = { generateRandomPassword };
