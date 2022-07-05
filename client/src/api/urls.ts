const getWebsocketUrl = (apiUrl: string) => {
    const urlObj = new URL(apiUrl);
    const wsProtocol = urlObj.protocol.replace("http", "ws");
    return `${wsProtocol}//${urlObj.host}`;
};
  
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
export const NL_API_ENDPOINT = import.meta.env.VITE_NL_API_URL || "http://localhost:8080";
export const WEBSOCKET_URL = getWebsocketUrl(API_URL);

// export const API_URL =
//   process.env.VUE_APP_API_URL || "http://localhost:3000/api";
// export const BASE_URL = process.env.VUE_APP_BASE_URL || "http://localhost:8080";
  