import React,{useState} from 'react'

export const CheckOut = (props) => {
    const [total,setTotal]=useState(props.amount)
  
    const handlePay=(e)=>{
      e.preventDefault();
      if(total===0 || ""){
       alert("please select the items")
      } else{
          var options ={
              key:"rzp_test_m9pKorzB9zYAr8",
              secret_key:"rXrGGPpxNICFu2nPMnqu3ZJa",
              amount:total*100,
              currency:"INR",
              name:"Food Delivery Demo",
              description:"for testing purpose",
              handler:function(response){
                alert(response.razorpay_payment_id)
                window.location.reload();
              },
          prefill:{
              name:"Raagini",
              email:"raagini0710@gmail.com",
              contact:"8838079591"
          },
          notes:{
              address:"Razorpay Corporate"
            },
            theme:{
              color:"#3399cc"
            }
          };
          var pay = new window.Razorpay(options);
          pay.open()
         }
  }
  
    return (
      <div>
          <form >
          <h1 className='fw-bold'>PAYMENT</h1>
          <hr />
          <h1 style={{color:'rgb(255, 69, 0)'}} value={total} onChange={e=>setTotal(e.target.value)}>Total:  &#8377;{props.amount}</h1>
          <button className='btn btn-outline-danger' onClick={handlePay}>pay</button>
  
          </form>
      </div>
    )
}