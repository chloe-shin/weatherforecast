import React, {useState, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import { css } from '@emotion/core';
import BeatLoader from 'react-spinners/BeatLoader';
import Forecast from './components/Forecast'


export default function App() {
  const [weather, setWeather] = useState(null)
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((post) => {
      console.log('superman', post)
      getData(post.coords.longitude, post.coords.latitude)
    })
  // const getLocation = function() {
  //   navigator.geolocation.getCurrentPosition((post) => {
  //     getData(post.coords.longitude, post.coords.latitude)    
  //   });
  }
  useEffect(() => {
    getLocation()
  }, []) // [] means run once!!!!

  const getData = async (lon, lat) => {
    const api = process.env.REACT_APP_API
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${api}&units=metric&lang=kr`
    try {
    const response = await fetch(url)
    console.log ("response", response)
    const data = await response.json()
    console.log ("data", data)
    setWeather(data)
    }
    catch (e) {
      alert ('Wrong API Address')
    }
// [weater, setWeather]:useState기능. weather 의 초기값은 null로 설정, 
//  index1부터는 data의 값을 기록. (api에서 얻은 object {key: value} 값들).
  }



// weather 초기값이 로딩 안되었을경우, loading을 call함.
  if (!weather) return  <div className = "loading"> <BeatLoader
  sizeUnit={"px"}
  size={30}
  color={'#ee7d6e'}
  loading={true}
  margin={"10px"}
/> Loading
</div>

  return (
    <div className="container-fluid my-auto">
      <div className="container mx-auto my-4 py-4">
        <div className="row justify-content-center text-center">
          <h1 className="col-12 display-4 my-2 py-3 text-success">
            Chloe's Weather App
        </h1>
          <h2 className="col-12 text-white">{weather && weather.name}</h2>
          <h3 className="col-12 text-danger">Temperature {weather && weather.main.temp}°C</h3>
          <h3 className="col-12 text-white">Weather Description <img src = {`https://openweathermap.org/img/w/${weather && weather.weather[0].icon}.png`}></img> {weather && weather.weather[0].description}</h3>
        </div>
      </div>
         <Forecast /> 
    </div>
  
  ) 
}


// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       weather: null,
//     }
//   }
//   componentDidMount() {
//     this.getLocation()
//   }

//   feedDog = () => {
//     console.log ('Chloe feed dog')
//     this.setState({ feedDog: true })
//   }

//   getLocation = () => {
//     console.log('gettting weather   yellow')
//     navigator.geolocation.getCurrentPosition((post) => {
//       this.getData(post.coords.longitude, post.coords.latitude)
//     })
//   }

//   getData = async (lon, lat) => {
//     const api = process.env.REACT_APP_API
//     console.log('api',api)
//     const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${api}&units=metric`
//     const response = await fetch(url)
//     const data = await response.json()
//     this.setState({
//       weather: data
//     })
//   }

//   render() {
//     console.log('this chloe jajajaja', this.state)
//     return <div>Hello </div>
    // if (!this.state.weather) 
    // return <div className="App App-header" style={{ color: 'white' }}>loading ...</div>
    // return (
    //   <div className="container-fluid text-white my-auto">
    //     <div className="container mx-auto my-4 py-4">
    //       <div className="row justify-content-center text-center">
    //         <h1 className="col-12 display-4 my-2 py-3 text-success">
    //           Awesome Weather App
    //         </h1>
    //         <h2 className="col-12">{this.state.weather && this.state.weather.name}</h2>
    //         <h3 className="col-12 text-danger">Temperature {this.state.weather && this.state.weather.main.temp}°C</h3>
    //         <h3 className="col-12">Weather Description {this.state.weather && this.state.weather.weather[0].description}</h3>
    //       </div>
    //     </div>
    //   </div>
    // )
//   }
// }

// export default App

