import React from 'react'
import { useAtom } from 'jotai';
import { cityAtom } from './App';
import axios from 'axios';
import { useQuery ,useMutation, useQueryClient } from '@tanstack/react-query'


const API_KEY = '7f97c46704f9af7abef3d2b951c5d3a8';

const Sidebar = () => {

  const [city, setCity] = useAtom(cityAtom);
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7f97c46704f9af7abef3d2b951c5d3a8&units=metric`;

  const queryClient = useQueryClient(); // return the thing we created in app.js

  const query  = useQuery({queryKey:["cityData"],queryFn: async()=>{
    const response = await axios.get(URL);
    return response.data;
  }});

  const mutation = useMutation({
    mutationFn : async()=>{
        const response = await axios.get(URL);
        console.log(response.data);
        return response.data;
    },
    onSuccess:()=>{
        queryClient.invalidateQueries(["cityData"]) //invalidates our old data.
    },
  })

  const handleKeyDown = (e) =>{
    if(e.key === 'Enter'){
      console.log("enter thichyo");
        mutation.mutate();
    }
  }

  



  console.log(query.data?.weather[0].id);


  return (
    <div className='flex flex-col items-center w-2/6 h-screen bg-blueGray'>
        <div className='inputBar  mt-10 mb-20 '>
            <input 
            type="text" 
            className="bg-gray-400 px-2 py-1 rounded text-white placeholder-white" 
            placeholder="Enter City Name"
            onKeyDown={handleKeyDown}
            onChange = {(e)=>setCity(e.target.value)}
           />
        </div>
        {city}

        <div>
          {query.isLoading ? <h1>LOADING....</h1>:null}
        </div>
        <div>
          {query.error ? <h2>query error</h2>:null}
        </div>
        <div>
          {query.data?.main ? <h1>{Math.trunc(query.data.main.temp)}°C</h1>:null}
        </div>
        {/* <div className = "flex justify-center w-12.625">
          <img src = {photoURL} className='w-full '/>
        </div> */}

        <div>{mutation.isError? <h1>{mutation.error.message}</h1>:null}</div>
    </div>
  )
}

export default Sidebar;