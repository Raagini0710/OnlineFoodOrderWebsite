import React, { useState,useEffect } from 'react'
import breakfast from '../../Asset/breakfast.jpg'
import queryString from 'query-string'
import axios from 'axios'
import { useLocation,useNavigate } from 'react-router-dom'


export default function Filter() {
    const navigate=useNavigate();
    const location=useLocation().search;
    const restaurantsPerPage = 2


    const [locationData, setLocationData]=useState([]);
    const [restaurantData, setRestaurantData]=useState([]);
    const [cuisineid,setCuisineid]=useState([])
    // const [restaurants,setRestaurants]=useState([])
    const [sort,setSort]=useState(1)
    const [lowcost,setLowcost]=useState(undefined);
    const [highcost,setHighcost]=useState(undefined);
    const [currentPage,setCurrentPage]=useState(1)


    const qs = queryString.parse(window.location.search)
    const mealtype_id = qs.mealtype;
    const location_id = Number(sessionStorage.getItem('locationID'));

    const fetchLocation=()=>{
        axios.get('http://localhost:8900/getAllLocations')
        .then((res)=>setLocationData(res.data))
        .catch((err)=>err)
    }
    useEffect(()=>{
        fetchLocation();

        const filterObject={
            mealtype_id:Number(mealtype_id),
            location_id:location_id,
            cuisine_id:cuisineid,
            sort:sort,
            lowcost:lowcost,
            highcost:highcost
        }

      axios.get(`http://localhost:8900/getRestaurantsByMealTypeid/${mealtype_id}`)
      .then((res)=>setRestaurantData(res.data))
      .catch((err)=>err)
      
      axios.post("http://localhost:8900/filteroptions",filterObject)
      .then((res)=>setRestaurantData(res.data))
      .catch((err)=>err);
      sessionStorage.clear()
    },[location, sort, cuisineid,lowcost, highcost, mealtype_id,location_id])

  
    const searchHandle=(e)=>{
        var locationsids=Number(e.target.value);
        const FilterObject={
            mealtype_id:Number(mealtype_id),
            location_id:Number(locationsids),
            sort:sort,
            lowcost:lowcost,
            highcost:highcost
        }
        axios.post("http://localhost:8900/filteroptions",FilterObject)
        .then(res=>setRestaurantData(res.data))
        .catch(err =>err)
    }
    const filters = ()=>{
        const filterObject = {
            mealtype_id:Number(mealtype_id),
            location_id: location_id,
            cuisine_id:cuisineid,
            sort: sort,
            lowcost: lowcost,
            highcost: highcost
        }
        axios.post("/filteroptions",filterObject)
        .then(res=>setRestaurantData(res.data))
        .catch(err =>err)
    }
    const handleCuisine = (id) => {
        const updatedCuisineIds = [...cuisineid]; 
        const index = updatedCuisineIds.indexOf(id);
        if (index === -1) {
            updatedCuisineIds.push(id);
        } else {
            updatedCuisineIds.splice(index, 1);
        }
        setCuisineid(updatedCuisineIds);
        setTimeout(() => {
            filters();
        }, 0);
    
    }
    // const handleCuisine=(id)=>{
    //     const index=cuisineid.indexOf(id)
    //     if(index === -1){
    //         cuisineid.push(id)
    //         setCuisineid(cuisineid)
    //     }else{
    //         cuisineid.splice(index,1)
    //         setCuisineid(cuisineid)
    //     }
    //     setTimeout(()=>{
    //         filters();
    //     },0)
    // const handleCuisine = (id) => {
    //     setCuisineid(prevCuisineIds => {
    //         const index = prevCuisineIds.indexOf(id);
    //         if (index === -1) {
    //             return [...prevCuisineIds, id];
    //         } else {
    //             return prevCuisineIds.filter(cuisineId => cuisineId !== id);
    //         }
    //     });
    //     setTimeout(() => {
    //         filters();
    //     }, 0);
    
    

    const searchSort=(e)=>{
        const sort=e.target.value
        setSort(sort)
        setTimeout(()=>{
            filters();
        },0)
    }

    const handleCost=(lowcost, highcost)=>{
        setLowcost(lowcost)
        setHighcost(highcost)
        setTimeout(()=>{
            filters();
        },0)
    }
    const handleDetails=(e)=>{
        navigate(`/Details?restaurant=${e._id}`);
    }

    const indexOfLastRestaurant = currentPage * restaurantsPerPage;
    const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
    const length = Math.ceil(restaurantData.length / restaurantsPerPage);
    const currentRestaurants = restaurantData.length > 0 ? restaurantData.slice(indexOfFirstRestaurant, indexOfLastRestaurant) : 0;

    const handlePage=(pageNumber)=>{
        setCurrentPage(pageNumber);
    }
  return (
    <div>
    
    <h2 className="u">Breakfast place in Tamil Nadu</h2>
    <div className="parent">
         <div className="left">
            <div className="filter">
              <h2>Filters</h2>
               {/* <div className="location">select location </div> */}
                    
                     
                     <select id="dropdown" className="dropdown" onChange={searchHandle} >
                        <option>select city</option>
                         {locationData.map((e)=>{
                            return <option key={e._id} value={e.location_id}>{`${e.city}-${e.locality}`}</option>
                         })}
                         </select>
                         <br/>
            </div>
            <br/>
            <div className="cost"> 
                <p style={{fontWeight:"bold"}}>Cuisine</p>
                <input type="checkbox" onChange={() => handleCuisine(1)}/> North indian
                <br/>
                <input type="checkbox" onChange={() => handleCuisine(2)}/> South indian
                <br/>
                <input type="checkbox" onChange={() => handleCuisine(3)}/> Chinese
                <br/>
                <input type="checkbox" onChange={() => handleCuisine(4)}/> Fast food
                <br/>
                <input type="checkbox" onChange={() => handleCuisine(5)}/> Street food
                 <br/>
            </div>
            <br/>
            <div className="cost"> 
                <p style={{fontWeight: "bold"}}>Cost of Two</p>
                <input  type="radio" name="price" onChange={()=>handleCost(0, 500)}/> Less than Rs500
                <br/>
                <input  type="radio" name="price" onChange={()=>handleCost(500, 1000)}/> Rs500 to Rs1000
                <br/>
                <input  type="radio" name="price" onChange={()=>handleCost(1000, 1500)}/> Rs1000 to Rs1500
                <br/>
                <input  type="radio" name="price" onChange={()=>handleCost(1500, 2000)}/> Rs1500 to Rs2000
                <br/>
                <input type="radio" name="price" onChange={()=>handleCost(2000, 2500)}/> Rs2000+
                <br/>
            </div>
            <br/>
            <div className="price">
            <p style={{fontWeight: "bold"}}>Sort</p>
                <input  type="radio" name="sort" onClick={searchSort}/> Price low to high
                <br/>
                <input  type="radio" name="sort"onClick={searchSort}/> Price high to low
            </div>
        </div>
         <div className="images">
           
                {currentRestaurants.length >0 ? currentRestaurants.map((item,i)=>{
                    return  <div className="common2">
            <div className="box1" onClick={()=>{handleDetails(item)}}>
            <div className="v">
                <img src={breakfast} alt="no img found" className='filimg'style={{width: "100px"}}/>
            </div>
            <div className="des"> 
                <h3> {item.name}</h3>
                <h4>{item.city}</h4>
                <h5>{item.locality}</h5>  
            </div>
            </div>
        
        <div className="s">
            <br/>
            <hr/>
            <table>
                <tr>
                    <td>Cusines:</td>
                    <td>{`${item.cuisine.map(e=>e.name + " ")}`}</td>
                </tr>
                <tr>
                    <td>Cost for two:</td>
                    <td>  &#8377;{item.min_price}</td>
                </tr>
            </table>
        </div>
        </div>
                }) :<center><h1>No results found</h1></center>}
    
    
     {/* <div className="num">
        <div>prev</div>
        <div className="bg">1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>next</div>
    </div> */}

    {restaurantData.length >0 ?
    <div className='btn-group px-3'>
        {Array.from({length}).map((_,index)=>(
            <p key={index}
            className={`page-item ${currentPage === index + 1 ? 'active' : ''} btn border-primary btn-light`}
            onClick={() => handlePage(index + 1)}>
                <span className='page-link'>{index+1}</span>
                </p>
       ))}
       </div> :null
       }
        
 </div>  
 </div>

   
 </div>
  )
}
