// import React from 'react'
// import beverage from '../../Asset/beverages.jpg'
// import breakfast from '../../Asset/breakfast.jpg'
// import dinner from '../../Asset/dinner.jpg'
// import icecream from '../../Asset/ice creams.jpg'
// import pizza from '../../Asset/pizza.jpg'
// import lunch from '../../Asset/lunch.jpg'
import React, { useEffect,useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function QuickSearchItems() {
    const [mealtype, setMealtype ]=useState([])
    const navigate=useNavigate()

    useEffect(()=>{
      axios.get(`http://localhost:8900/getAllMealTypes`)
      .then((res)=>setMealtype(res.data))
      .catch((err)=>err);
    },[])
   
    const navigateFilter=(mealtypeid)=>{
      const locId=sessionStorage.getItem("locationID")
      if(locId){
        navigate(`/Filter?mealtype=${mealtypeid}&location=${locId}`)
      }else{
        navigate(`/Filter?mealtype=${mealtypeid}`)
      }
      
    }
    


  return (
    <div>
        {mealtype.map((e)=>{
            return <div className="whole d-inline-flex bd-highlight col-4" onClick={()=>navigateFilter(e.meal_type)}>
                            {/* <div className="col-sm-6 col-md-3 col-lg-2 d-inline-flex p-2 bd-highlight"> */}
                                <img src={e.image} alt="no img found" className='items' />
                            <div className="col-sm-6 col-md-3 col-lg-2 shadow-lg p-3 mb-5 bg-body rounded about">
                                <h2>{`${e.name}`}</h2>
                                <p>{`${e.content}`}</p>
                            </div>
                            {/* </div> */}
                        </div>
                    // </div>
                })}
                </div>

  )
}
