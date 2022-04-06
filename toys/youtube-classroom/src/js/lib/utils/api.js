import { ERROR_MESSAGES } from '../constants/errorMessages.js';
import { MAX_RESULT_VIDEO_COUNT } from '../constants/searchVideo.js';

const request = async (url, option = {}) => {
  const response = await fetch(url, option);
  if (response.ok) {
    return response.json();
  }

  throw new Error(ERROR_MESSAGES.API_CALL_ERROR);
};

export const searchVideo = async (keyword) => {
  // NOTE: dotenv 사용을 위해 Webpack 설정 필요.
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?type=video&key=${process.env.YOUTUBE_API_KEY}&q=${keyword}&part=snippet&maxResults=${MAX_RESULT_VIDEO_COUNT}`;
  return request(searchUrl);
};
