import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Cart = () => {
  const [cartitem,setCartitem]=useState([])
  const fetch=async()=>{
    try{
      const response=await axios.get("http://localhost:3004/Cart")
      const val=response.data
      setCartitem(val)
    }
    catch(err){
      console.log(err)
    }
  }
  const handledelete=async(id)=>{
    try{
      await axios.delete( `http://localhost:3004/Cart/${id}`)
      fetch()
    }
    catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    fetch()
  },[])
  
  return (
    <div>
      <div className="container mt-4">
                    <h2>cart items :</h2>
                    
                    <div className="row">
                    {cartitem.map((product) => (
                            <div key={product.name} className="col-md-4 mb-4">
                                <div className="card">
                                    <img src={product.image} alt={product.name} className="card-img-top" style={{width: '100%', height: '300px', objectFit: 'cover'}} />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">Size:{product.size} </p>
                                        <p className="card-text">price: {product.price}</p>
                                        <p className="card-text">Quantity: {product.quantity}</p>
                                        <button className="btn Enter" onClick={()=>handledelete(product.id)}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
     
    </div>
  )
}

export default Cart
