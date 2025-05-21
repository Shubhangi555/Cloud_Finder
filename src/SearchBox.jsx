import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';

export default function SearchBox({updateInfo,darkMode }){
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);


    const API_URL ="https://api.openweathermap.org/data/2.5/weather";
    const API_KEY ="0034415c647c18c5cb91c7b73d097f3f";

    let getWeatherInfo= async()=>{

        try{
            let response= await fetch (`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse= await response.json();
            console.log(jsonResponse);
            let result={
             city:city,
             temp: jsonResponse.main.temp,
             tempMin: jsonResponse.main.temp_min,
             tempMax: jsonResponse.main.temp_max,
             humidity: jsonResponse.main.humidity,
             feelsLike:jsonResponse.main.feels_like,
             weather:jsonResponse.weather[0].description,
    
            };
            console.log(result);
            return result;
        }catch(err){
            throw err;
        }
       
    };
   

  let handlechange=(event)=>{
        setCity(event.target.value);
    };

    let handleSubmit= async (event)=>{
        try{
        event.preventDefault();
        setError(false);
        console.log(city);
        setCity("");
        let newInfo= await getWeatherInfo(city);
        updateInfo(newInfo);
        }catch(err){
            setError(true);
        }
        setCity("");
    };

    return (
        <div className={`search-box ${darkMode ? "dark-mode" : ""}`}>
            <form onSubmit={handleSubmit}>
            <TextField id="city" label="City Name" variant="outlined" required value={city} onChange={handlechange}  style={{
            backgroundColor: "var(--input-bg-color)",
            color: "var(--text-color)",
          }}/>
            
            <br></br>
            <br></br>
            <Button variant="contained" type='submit'>Search</Button>
            </form>
           { error && <p style={{color:'red'}}>No such place exists!</p>}
        </div>
    )
}