import decode from 'jwt-decode';

const isTokenExpired = (token) => {
  const decoded = decode(token);

  if (!decoded) {
    return false;
  }

  const date = new Date(0);
  date.setUTCSeconds(decoded.exp);

  const offsetSeconds = 0;

  return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('chirpyToken');

  if (token) {
    return !isTokenExpired(token);
  }

  return false;
};

export const getCurrentUserId = () => {
  const token = localStorage.getItem('chirpyToken');
  const decoded = decode(token);

  if (!decoded) {
    return null;
  }

  return decoded.id;
};
