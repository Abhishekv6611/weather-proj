import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const[name,setName]=useState('')
  const[err,setErr]=useState('')
  const [data,setData] =useState({
  celcius:10,
  humidity:10,
  name:'London',
  speed:2,
  Image:'/images.clouds.png'
  })

  const handleClick=()=>{
     if(name!==''){
      const apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=35650e9f8c2ea3683761be72e25a39b7&&units=metric`;
      axios.get(apiUrl)
      .then(res => {
        let imgpath='';
        if(res.data.weather[0].main== 'Clouds'){
          imgpath='/images/cloud.png'
        }else if(res.data.weather[0].main =='Clear'){
          imgpath='/images/Clear.png'
        }else if(res.data.weather[0].main=='Rain'){
          imgpath='/images/rain.png'
        }else if(res.data.weather[0].main=='Drizzle'){
          imgpath='/images/drizzler.png'
        }else if(res.data.weather[0].main=='Mist'){
          imgpath='/images/mist.png'
        }else {
          imgpath='/images.clouds.png'
        }

        console.log(res.data)
        setData({...data,celcius:res.data.main.temp,name:res.data.name,
          humidity:res.data.main.humidity,speed:res.data.wind.speed,Image:imgpath})
          setErr('')
      })
      .catch(err=>{
        if(err.response.status==404){
          setErr('invslid city name')
        }else{
          setErr('')
        }
      })
     }
  }
  return (
    <div className='container'>
         <div className="weather">
          <div className="search">
            <input type="text" placeholder='Enter city name' onChange={e=>setName(e.target.value)}/>
            <button className='btn-sub'><img src="/images/search.png" onClick={handleClick} alt=""/></button>
          </div>
          <div className="error">
            <p>{err}</p>
          </div>
          <div className="winfo">
            <img className='cloud' src={data.Image} alt="pic"/>
            <h1>{Math.round(data.celcius)}°c</h1>
            <h2>{data.name}</h2>
            <div className="details">
              <div className="col">
                <img src="/images/wind.png" alt="" />
                <div className='humidity'>
                  <p>{Math.round(data.humidity)}°</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="col">
                  <img src="/images/humidity.png" alt="" />
                  <div className='wind'> 
                    <p>{Math.round(data.speed)}km/h</p>
                    <p>wind</p>
                  </div>
              </div>
            </div>
          </div>
         </div>
    </div>
  )
}

export default App
