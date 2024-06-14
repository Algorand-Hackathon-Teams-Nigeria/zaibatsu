const TOKEN_KEY = "authToken";
const REFRESH_TOKEN_KEY = "refreshToken";

interface AuthTokens {
  token: string;
  refreshToken: string;
}

export function getAuthTokens(): AuthTokens | undefined {
  let token: string | null = null;
  let refreshToken: string | null = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem(TOKEN_KEY);
    refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  }
  if (!(token && refreshToken)) {
    return undefined;
  }
  return {
    token,
    refreshToken,
  };
}

export function setAuthTokens(authTokens: AuthTokens) {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, authTokens.token);
    localStorage.setItem(REFRESH_TOKEN_KEY, authTokens.refreshToken);
  }
}
