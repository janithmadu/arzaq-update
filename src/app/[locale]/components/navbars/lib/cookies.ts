export function getCookie(name: string) {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  }
  
  export function setCookie(name: string, value: string) {
    document.cookie = `${name}=${value}; path=/;`;
  }