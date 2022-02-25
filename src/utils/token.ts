export const generateToken = () =>
  Array(6)
    .fill(0)
    .map(() => Math.random().toString(36).charAt(2))
    .join('')
    .toUpperCase();
