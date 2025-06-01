declare interface WeatherData {
  resolvedAddress: string;
  currentConditions: {
    temp: number;
    humidity: number;
    windspeed: number;
    pressure: number;
    conditions: string;
    icon: string;
    sunrise: string;
    sunset: string;
  };
}