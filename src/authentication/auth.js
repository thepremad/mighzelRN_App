export const isValidEmail = email => {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // var emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};
