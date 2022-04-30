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
    if (!response.ok) {
      alert('API 요청 중 에러가 발생했습니다.');
    }

    return response.json();
  },
};
