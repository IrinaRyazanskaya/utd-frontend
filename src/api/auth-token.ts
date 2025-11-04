let apiToken = "";

function getApiToken(): string {
  return apiToken;
}

function setApiToken(token: string) {
  apiToken = token;
}

export { getApiToken, setApiToken };
