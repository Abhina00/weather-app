const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export class WeatherApiError extends Error {}

export async function fetchWeatherByCity(city) {
  if (!API_KEY) {
    throw new WeatherApiError(
      "Missing API key. Add REACT_APP_WEATHER_API_KEY to your .env file."
    );
  }

  const url = `${BASE_URL}?q=${encodeURIComponent(
    city
  )}&units=metric&appid=${API_KEY}`;

  const response = await fetch(url);

  if (response.status === 404) {
    throw new WeatherApiError(`Couldn't find a city called "${city}".`);
  }
  if (!response.ok) {
    throw new WeatherApiError("Something went wrong fetching the weather.");
  }

  const data = await response.json();

  return {
    city: data.name,
    country: data.sys?.country,
    temp: data.main?.temp,
    feelsLike: data.main?.feels_like,
    tempMin: data.main?.temp_min,
    tempMax: data.main?.temp_max,
    humidity: data.main?.humidity,
    pressure: data.main?.pressure,
    windSpeed: data.wind?.speed,
    description: data.weather?.[0]?.description,
    icon: data.weather?.[0]?.icon,
    fetchedAt: new Date().toISOString()
  };
}
