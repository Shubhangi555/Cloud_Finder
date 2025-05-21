import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { SocialMediaButtons } from './Share';
import { format } from 'date-fns'; // Import date-fns for date formatting
import "./Share.css";
import "../src/MoreInfo.css";

const API_KEY = "0034415c647c18c5cb91c7b73d097f3f"; // API key

export default function WeatherCards({ weatherInfo }) {
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const city = weatherInfo.city || "Delhi"; // Default city, if not provided

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await axios.get(url);
        const data = response.data;

        // Process data to group by unique days
        const dailyForecasts = {};
        data.list.forEach((item) => {
          const date = new Date(item.dt * 1000); // Convert timestamp to Date object
          const formattedDate = format(date, 'MMMM dd yyyy'); // Use date-fns to format the date

          if (!dailyForecasts[formattedDate]) {
            dailyForecasts[formattedDate] = {
              date: formattedDate, // Store formatted date
              temp: item.main.temp,
              humidity: item.main.humidity,
              tempMin: item.main.temp_min,
              tempMax: item.main.temp_max,
              feelsLike: item.main.feels_like,
              weather: item.weather[0].description,
              description: item.weather[0].description,
              main: item.weather[0].main,
            };
          }
        });

        // Convert object to an array and sort it
        const sortedData = Object.values(dailyForecasts).sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        setForecastData(sortedData);
      } catch (error) {
        console.error("Error fetching forecast data:", error);
        setError("Failed to fetch forecast data. Please check your API key or city name.");
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [city]);

  // Function to map weather condition to custom image URLs
  const getWeatherIcon = (main) => {
    if (main.toLowerCase().includes("rain")) {
      return "https://cdn-icons-png.flaticon.com/512/1163/1163657.png"; // Rain icon
    } else if (main.toLowerCase().includes("clear")) {
      return "https://cdn-icons-png.flaticon.com/512/869/869869.png"; // Clear sky icon
    } else if (main.toLowerCase().includes("cloud")) {
      return "https://cdn-icons-png.flaticon.com/512/414/414927.png"; // Cloudy icon
    } else if (main.toLowerCase().includes("snow")) {
      return "https://cdn-icons-png.flaticon.com/512/888/888339.png"; // Snow icon
    } else {
      return "https://cdn-icons-png.flaticon.com/512/131/131043.png"; // Default icon
    }
  };

  const todayForecast = forecastData[0]; // Today's forecast
  const next5DaysForecast = forecastData.slice(1, 6); // Next 5 days' forecast

  return (
    <Box p={3}>
      <Typography variant="h4" component="h2" gutterBottom>
        Weather Forecast for {city}
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <Typography variant="h6" sx={{ marginLeft: 2 }}>
            Fetching Weather Data...
          </Typography>
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          {/* Today's Forecast */}
          {todayForecast && (
            <>
              <Card className="card-content" sx={{ textAlign: "center", padding: 2, marginBottom: 2 }}>
                <CardContent >
                  <Typography variant="h5" gutterBottom >
                    Today's Forecast
                    <div>({todayForecast.date} )</div>{/* Displaying formatted date */}
                  </Typography>
                  <Typography variant="body1">{todayForecast.description}</Typography>
                  <img
                    src={getWeatherIcon(todayForecast.main)}
                    alt={todayForecast.main}
                    style={{ width: "60px", height: "60px" }}
                  />

                  {/* Social Media Share Buttons */}
                  <div className="social">
                    <h3>Share Today's Weather</h3>
                    <div className="socialbutton">
                      <SocialMediaButtons weatherInfo={weatherInfo} />
                    </div>
                  </div>
                </CardContent>


                <Card className="each-card">
                  <CardContent>
                    <img src="../temperature.png"></img>
                    <p>Temperature</p>
                    <Typography variant="body1">{todayForecast.temp}°C</Typography>
                    
                  </CardContent> 
                  <CardContent>
                          <img src="../humidity.png"></img>
                          <p> Humidity</p>
                    <Typography variant="body1">{todayForecast.humidity}%</Typography>
            
                  </CardContent>
                  <CardContent>
                    <img src="../temperature.png"></img>
                     <p>temp_min:</p>
                    <Typography variant="body1">{todayForecast.tempMin}%</Typography>
                    
                  </CardContent>
                  <CardContent>
                      <img src="../temperature.png"></img>
                        <p> temp_max:</p>
                    <Typography variant="body1"> {todayForecast.tempMax}%</Typography>   
                          
                  </CardContent>
                    <CardContent>
                        <img src="../wind.png"></img>   
                       <p> feels_like:</p>
                       <Typography variant="body1"> {todayForecast.feelsLike}%</Typography>  
                           
                  </CardContent>
                </Card>

              </Card>

            </>
          )}

          {/* Last 5 Days' Forecast */}
          <Box display="grid" gridTemplateColumns="repeat(5,1fr)" gap={3} flexWrap="wrap">
            {next5DaysForecast.map((day, index) => (
              <Card key={index} sx={{ textAlign: "center", padding: 2, minWidth: 200 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {day.date} {/* Displaying formatted date for each forecast */}
                  </Typography>
                  <Typography variant="body1">{day.description}</Typography>
                  <img
                    src={getWeatherIcon(day.main)}
                    alt={day.main}
                    style={{ width: "60px", height: "60px" }}
                  />
                  <Typography variant="body1">Temp: {day.temp}°C</Typography>
                  <Typography variant="body1">Humidity: {day.humidity}%</Typography>
                  <Typography variant="body1">temp_min: {day.tempMin}%</Typography>
                  <Typography variant="body1">temp_max: {day.tempMax}%</Typography>
                  <Typography variant="body1">feels_like: {day.feelsLike}%</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}
