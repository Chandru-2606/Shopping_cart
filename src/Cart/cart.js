import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux"
import Header from "../Header/header";
import './cart.css';



function Cart () {
 const [newData, setNewData] = useState([])

 const post = useSelector((state)=>state.post.data);
 const cartProducts = useSelector((state)=>state.cartReducer);

 let dispatch = useDispatch()

 useEffect(()=>{
    const Datessssss =cartProducts && cartProducts.map(t1 => ({...t1, ...post.find(t2 => t2.id === t1.product_id)}))
    console.log("Datessssss",Datessssss)
    setNewData(Datessssss)
},[cartProducts])

    const onDelete = (product_id) => {
   console.log("eeeeee", product_id)
    dispatch({type:"REMOVE_CART",id:product_id})
 }
 
    return(
        <div>
            <Header name="Cart" />
          <h1>Shooping Cart</h1>
{newData && newData.map((item, index)=>{
    return(
        
        <div className="cart-container">
            <img src={item.imageURL} />
            <div className="cart-type">
                <h3>{item.name}</h3> 
                <span>Rs : {item.price}</span>
                </div>
                <button id="qty-btn">Qty : {item.count}</button>
                <button onClick={(e) => {  onDelete(item.product_id)}}>Delete</button>
            </div>
    );

})}
</div>
);
}

export default Cart;