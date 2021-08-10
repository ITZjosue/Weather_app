import {useState} from 'react';
import './App.css'

const App = ()=>{

  const apiKey = '4b97b8828fa2646615e9a92aee1fefa4';

  const [weatherData,setWeateherData] = useState([{}]);
  const [city,setCity] = useState('');

  const getWeather = (event)=>{
    if(event.key === 'Enter'){
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      .then(respuesta => respuesta.json())
      .then(data => {
        setWeateherData(data)
        setCity('')
      })
    }
  }


  return(
    <div className='container'>
      <input 
      className='input' 
      placeholder='Enter City...'
      onChange = {e => setCity(e.target.value)}
      value={city}
      onKeyPress = {getWeather}
      />
      {typeof weatherData.main == 'undefined' ? (
        <div className = 'letters'>
          <p>Welcome to wheather app! Enter a city to get the weather of.</p>
        </div>
      ):(
        <div className='weather-data'>
          <p className='city'>{weatherData.name} {weatherData.sys.country}</p>
          <p className='temp'>{(Math.round(weatherData.main.temp)-273.15).toFixed(2)}°C</p>
          <p className='weather'>{weatherData.weather[0].main}</p>
        </div>
      )}  
      {weatherData.cod === '404' ? (
        <p>City not found.</p>
      ):(
        <>
        </>
      )}
    </div>
  );
};
export default App;