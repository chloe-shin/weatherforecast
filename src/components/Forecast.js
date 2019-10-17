import React, {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function convertKelvinToCelsius(kelvin) {
	if (kelvin < (0)) {
		return 'below absolute zero (0 K)';
	} else {
		return (kelvin-273.15);
	}
}
export default function Forecast() {
  const [forecast, setForecast] = useState(null)
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((post) => {
      console.log('superman', post)
      getData(post.coords.longitude, post.coords.latitude)
    })}

    useEffect(() => {
      getLocation()
    }, [])

  const getData = async (lon, lat) => {
    const api = process.env.REACT_APP_API
    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${api}`
    const response = await fetch(url)
    const data = await response.json()
    console.log ("forecast red", data)
    setForecast(data)
  }
  console.log(forecast && forecast.list)
  return (
    <div className="container-fluid my-auto">
      <div className="container mx-auto my-4 py-4">
        <div className="row justify-content-center text-center">

           <h2 className="col-12">
            Hourly Forecast
            </h2>

            <Row>
            {forecast && forecast.list.slice(1,6).map((weather) =>{ 
             return (
              <Col lg={2}>
              <Card bg="light">
                <Card.Body>
                  <Card.Title text="white">Hourly Forecast</Card.Title>
                  <Card.Text>
                  {weather.dt_txt} <br/>
                  {convertKelvinToCelsius(weather.main.temp).toFixed(1)}°C  <br/>
                  <img src = {`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}></img> {weather.weather[0].description}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">{weather.dt_txt}</small>
                </Card.Footer>
              </Card>
              </Col>
             )
           })}
           </Row>
   
       </div>
      </div>
    </div>
  )

}

