// serialize the cookes to object
export const parseCookies = (cookieString) => {
  const cookies = {};
  if (!cookieString) return cookies;

  cookieString.split(";").forEach((cookie) => {
    const [key, value] = cookie.split("=").map((part) => part.trim());
    if (key && value) {
      cookies[key] = decodeURIComponent(value);
    }
  });
  return cookies;
};
