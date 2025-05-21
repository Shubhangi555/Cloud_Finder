import { useState, useEffect } from "react";
import SearchBox from "./SearchBox";
import "./WeatherApp.css";
import MoreInfo from "./MoreInfo";
  
export default function WeatherApp(){
const [weatherInfo, setWeatherInfo]=useState({

        city:"Delhi",
        feelslike:24.84,
        temp:25.05,
        tempMin:25.05,
        tempMax:25.05,
        humidity:47,
        weather:"haze",
});


let updateInfo = (newInfo) => {
    try {
        console.log("Updating Weather Info:", newInfo);
        setWeatherInfo(newInfo);
    } catch (err) {
        console.error("Error updating weather info:", err);
    }
};

const [darkMode, setDarkMode] = useState(false);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  };

return (
        
       <div style={{textAlign:"center"}}>
        <div className="dashboard">
          <div className="header">
            <h1>Cloud Finder</h1>
              <button onClick={toggleDarkMode}>
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
            </div>
            <SearchBox updateInfo={updateInfo}/>
            <MoreInfo weatherInfo={weatherInfo}/>
            </div>
        </div>
    
    );
}