import React from "react";
import './header.css';
import { Tabs } from 'antd';
import {ShoppingCartOutlined  } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';
import 'antd/dist/antd.css';
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"



function Header (props) {
 const cartProducts = useSelector((state)=>state.cartReducer);

 let navigate = useNavigate()

    return(
        <div className="header-container">
          <div className="header-name">
            {props.name ? 
            <a href="#">ShansTees</a> :
            <a href="#">TeeRex Store</a>
        }

          </div>
          <div className="cart-details">
            <a href="#" onClick={() => { 
               navigate("/");
        }}> Products </a>
        {props.name ? 
        <a href="#">Shoping Cart</a>
        :
            <button onClick={() => { 
               navigate("/Cart");
        }}>
            <Badge count={cartProducts.length} size="small">
                <ShoppingCartOutlined shape="square" size="large" />
            </Badge>
            </button>
}
          </div>
        </div>
    );
}

export default Header;