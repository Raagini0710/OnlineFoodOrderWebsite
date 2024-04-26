import React, { useEffect, useState } from 'react'
import MyTab from './MyTabs'
import MyCarousel from './MyCarousel'
import axios from 'axios';
import queryString from 'query-string';
import Modal from 'react-modal';
import { CheckOut } from '../Payment/CheckOut';

// Modal.setAppElement('#root');
const customStyles = {
  content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgb(192, 192, 192)',
      textAlign: 'center',
      borderRadius: '10px 10px 10px 10px',
      maxHeight: '100vh', // Set a maximum height for the modal content
      overflowY: 'auto'
  }
};


export default function Details() {
  const [restaurant, setRestaurant] = useState([]);
  const [gallaryIsOpen, setGallaryIsOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [count, setCount] = useState({});
  const [paymentModal, setPaymentModal] = useState(false);
  const parsed = queryString.parse(window.location.search);
  const id = parsed.restaurant;

  // useEffect(() => {
  //   axios.get(`http://localhost:8900/getRestaurantsByid/${id}`)
  //     .then((res) => {
  //       setRestaurant(res.data);
  //       console.log(id)
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //       axios.get(`http://localhost:8900/getRestaurantsByMenu/${restaurant.name}`)
  //         .then((res) => {
  //           setSelectedMenu(res.data);
  //           console.log(restaurant.name)
  //         })
  //         .catch((error) => {
  //           console.log("Error fetching menu:", error);
  //         });
          
  // }, [restaurant.name, id]);
  
  // const gallaryOpen = () => {
    
  //   setGallaryIsOpen(true);
  //     axios.get(`http://localhost:8900/getRestaurantsByMenu/${restaurant.name}`)
  //     .then((res) => {
  //       setSelectedMenu(res.data);
  //       console.log(restaurant.name)
  //     })
  //     .catch((error) => {
  //       console.log("Error fetching menu:", error);
  //     });
  // };
  useEffect(() => {
    axios.get(`http://localhost:8900/getRestaurantsByid/${id}`)
      .then((res) => {
        setRestaurant(res.data);
        // After receiving restaurant data, fetch menu data
        fetchMenuData(res.data.name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  
  const fetchMenuData = (restaurantName) => {
    axios.get(`http://localhost:8900/getRestaurantsByMenu/${restaurantName}`)
      .then((res) => {
        setSelectedMenu(res.data);
        console.log(restaurantName);
      })
      .catch((error) => {
        console.log("Error fetching menu:", error);
      });
  };
  
  const gallaryOpen = () => {
    setGallaryIsOpen(true);
    // If restaurant data is already available, fetch menu data
    if (restaurant.length > 0) {
      fetchMenuData(restaurant[0].name);
    }
  };
  
  const handleCloseModal = () => {
    setGallaryIsOpen(false);
  };  

  const handleIncrement = (selectItem, index) => {
    if (selectItem) {
      setCount((pre) => {
        const newCount = { ...pre, [index]: (pre[index] || 0) + 1 };
        setQuantity(pre => parseFloat(pre + selectItem.price));
        return newCount;
      });
    }
  };

  const paymentIsOpen = () => {
    setGallaryIsOpen(false);
    setPaymentModal(true);
}

  const handleDecrement = (selectItem, index) => {
    if (selectItem && quantity > 0 && count[index] > 0) {
      setCount(pre => {
        const newCount = { ...pre, [index]: pre[index] - 1 };
        setQuantity(pre => pre - selectItem.price);
        return newCount;
      });
    }
  };

  const cashOnDelivery = () => {
    setGallaryIsOpen(false);
    alert("Order Accepted.. wait for few minutes...")
}


return (
  <div>
     <div>
        <div className='rounded-3 slider'>
           <MyCarousel/>
             <br/>
             <br/>
                 <div className='d-flex justify-content-between'>
                    <h1 className='line'></h1>
                       <button className="order"style={{height:"50px"}} onClick={gallaryOpen}>Place Online Order</button>
                          <br/>
                          <br/>
                          <br/>      
                  </div>
         </div>
            <MyTab/>
            <br/>
       </div>
       <Modal
        isOpen={gallaryIsOpen}
        style={customStyles}
      >
        {/* <div>raagini</div> */}
        {selectedMenu.map((restaurant, index) => (
          <div key={index}>
            <h1 style={{ color:"maroon" }} className='fw-bold'>{restaurant.name.toUpperCase()}</h1>
            <hr />
            <div style={{ backgroundColor: 'rgba(0,0,0,0.80)', width: '100%', borderRadius: '8px' }}>
              <div>
                {restaurant.items.map((item, itemIndex) => (
                  <span className='d-flex justify-content-between p-2' key={itemIndex}>
                    <p style={{ color: 'rgb(0, 255, 127)', fontSize: '13px' }} className='px-4 fst-italic'>
                      <h3 style={{ color:"deeppink" }} className='fw-bold'>{item.name}</h3>
                      <p style={{fontSize:"20px", width:"650px", color:"yellowgreen"}}>{item.desc}</p>
                    </p>
                    <div className='d-flex justify-content-evenly px-4' style={{ width: '180px', border: 'none' }}>
                      <button className='btn btn-outline-warning fs-6 fw-bold' style={{height:"65px", width:"40px", marginRight:"10px"}} onClick={() => handleDecrement(item, itemIndex)}>-</button>
                      <button className='fw-bold fs-6 text-center btn btn-outline-success' style={{height:"65px", width:"40px", marginRight:"10px"}}>{count[itemIndex] || 0}</button>
                      <button className='btn btn-outline-warning fs-6 fw-bold' style={{height:"65px", width:"40px"}} onClick={() => handleIncrement(item, itemIndex)}>+</button>
                    </div>
                    <h4 className='py-3' style={{ color: 'rgb(255, 69, 0)' }}>&#8377; {item.price}</h4>
                  </span>
                ))}
              </div>
            </div>
            <hr />
            <h1 style={{ color: 'red', marginLeft: "40%"}} className='px-3 py-1'><b>SubTotal: &#8377; {quantity || restaurant.amount}</b></h1>
            <div className='d-flex justify-content-end '>
               <button className='btn btn-outline-success fs-5 fw-bold' style={{marginRight:"10px"}} onClick={handleCloseModal}>Close</button> 
               <button className='btn btn-outline-success fs-5 fw-bold' onClick={paymentIsOpen}>Pay Online</button>
               <button className='btn btn-outline-success fs-5 fw-bold mx-2' onClick={cashOnDelivery} >Cash On Delivery</button>
            </div>
            <br/>        
          </div>
        ))}
      </Modal> 
      <Modal isOpen={paymentModal} style={customStyles}>
                <CheckOut amount={quantity} id={id} />
      </Modal>  
      </div>
  )
}
