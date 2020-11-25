export const setCookie = (cookieName, cookieValue, daysValid) => {
  const date = new Date();
  date.setTime(date.getTime() + daysValid * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${cookieName}=${cookieValue};${expires};path=/`;
};

export const getCookie = (cookieName) => {
  const name = `${cookieName}=`;
  const decodedCookie = decodeURIComponent(document.cookie).split(';');
  if (decodedCookie) {
    const cookie = decodedCookie.filter((itemRef) => itemRef.startsWith(name));
    if (cookie[0]) {
      if (cookie[0].startsWith(name)) {
        return cookie[0].substring(name.length, cookie[0].length);
      }
    }
  }

  return '';
};
