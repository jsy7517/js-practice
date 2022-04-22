import { ERROR_MESSAGES } from '../constants/errorMessages.js';
import { MAX_RESULT_VIDEO_COUNT } from '../constants/searchVideo.js';

const request = async (url, option = {}) => {
  const response = await fetch(url, option);
  if (response.ok) {
    return response.json();
  }

  throw new Error(ERROR_MESSAGES.API_REQUEST_ERROR);
};

export const searchVideo = async (keyword) => {
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?type=video&key=${process.env.YOUTUBE_API_KEY}&q=${keyword}&part=snippet&maxResults=${MAX_RESULT_VIDEO_COUNT}`;
  return request(searchUrl);
};

export const searchMoreVideo = async (keyword, nextPageToken) => {
  if (!nextPageToken) throw new Error(ERROR_MESSAGES.NO_MORE_SEARCH_RESULTS);

  const searchUrl = `https://www.googleapis.com/youtube/v3/search?type=video&key=${process.env.YOUTUBE_API_KEY}&pageToken=${nextPageToken}&q=${keyword}&part=snippet&maxResults=${MAX_RESULT_VIDEO_COUNT}`;

  return request(searchUrl);
};
