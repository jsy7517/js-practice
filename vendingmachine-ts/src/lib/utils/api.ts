export const { BASE_URL, HTTP_METHOD, request } = {
  BASE_URL: 'http://localhost:3000',
  HTTP_METHOD: {
    POST(data) {
      return {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
    },
  },
  async request(url, option = {}) {
    const response = await fetch(url, option);

    return response.json();
  },
};
