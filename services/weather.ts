// services/weather.ts
import axios from 'axios';

const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY!;
if (!API_KEY) {
  throw new Error('WEATHER_API_KEY is not defined');
} 
const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

export const fetchWeather = async (location: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${location}/today`, {
      params: {
        unitGroup: 'metric',
        include: 'current',
        key: API_KEY,
        contentType: 'json',
      },
      validateStatus: (status) => status < 500, // Don't throw for 4xx errors
    }); 
    if (response.data.errorCode) {
      throw new Error(response.data.message || 'Failed to fetch weather data');
    }

    return response.data;
  } catch (error:any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      if (error.response.status === 400) {
        error.message = 'Invalid location provided';
      } else if (error.response.status === 404) {
        error.message = 'Location not found';
      }
    }
    throw error;
  }
};