import React, { useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import img from  '../../Asset/wallpaper.jpg'
import axios from 'axios';
export default function Wallpaper() {
    const navigate=useNavigate();
    const [location, setLocation]=useState([]);
    const [locationid, setLocationid]=useState([]);
    const [restaurant, setRestaurant]=useState([]);
    const [inputtext, setInputext]=useState('');
    const [suggestion,setSuggestion]=useState([]);

    useEffect(()=>{
        axios.get('http://localhost:8900/getAllLocations')
        .then((res)=>{
            setLocation(res.data);
        })
        .catch(err=>err)
        sessionStorage.clear()
        // console.log(location);
    },[])
    const handleLocation=(e)=>{
        var locationId=e.target.value
        sessionStorage.setItem("locationID",Number(locationId))
        axios.get(`http://localhost:8900/getRestaurantsByLocationid/${locationId}`)
        .then((res)=>{
            setRestaurant(res.data);
        })
        .catch(err=>err)
        // console.log(restaurant);
        setLocationid(locationid)
        }
    
    const handleSearch=(e)=>{
        let input=e.target.value
        const suggestions=restaurant.filter(e=>e.name.toLowerCase().includes(input.toLowerCase()));
        setInputext(input);
        setSuggestion(suggestions)
    }
    const selectingRest=(restObj)=>{
        navigate(`/Details?restaurant=${restObj._id}`);
    }
    const showSuggestion=()=>{
        if(suggestion.length === 0 && inputtext === undefined){
            return null
        }
        if(suggestion.length > 0 && inputtext === ''){
            return null
        }
        if(suggestion.length === 0 && inputtext){
            return<ul>
                <li  style={{backgroundColor:"white"}}>No search result found</li>
            </ul>
        }
        return(
            <ul style={{backgroundColor:"white"}}>
                {suggestion.map((e,i)=>(
                    <li key={i} onClick={()=>selectingRest(e)}>{`${e.name}-${e.locality},${e.city}`}</li>
                ))}
            </ul>
        )
    }
    
  return (
    <div>
        <img src={img} alt="no img" className="image"></img>
        <div className="container top">
        <div className="logo2">e!</div>
            <div className="row justify-content-center find">
                <div className="col-12  mb-5" style={{textAlign: "center"}}><h1 className="header">Find the best restaurants, cafes, bars</h1></div>
                <div className="col-12 col-lg-4 mb-4 me-5">
                    
                    <select className="form-control place me-2" 
                    list="datalistOptions" 
                    id="exampleDataList" 
                    onChange={handleLocation}>
                        <option value="location_id_name_city">Choose City...</option>
                        {location.map((loc)=>(
                            <option key={loc.location_id} value={loc.location_id}>{loc.locality},{loc.city}</option>
                            ))}
                    </select>
                </div>
                <div className="col-12 col-lg-4 me-5">
                    <input className="form-control me-2 icons" type="search" placeholder="search for restaurants" onChange={handleSearch}></input>
                    {showSuggestion()}
                </div>
            </div>
        </div>
            {/* <div className="logo">e!</div> */}
    </div>
  )
}
