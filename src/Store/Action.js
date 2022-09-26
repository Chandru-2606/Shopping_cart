import React, { useEffect, useState } from "react";
import './action.css';
import {SearchOutlined, FilterOutlined  } from '@ant-design/icons';
import axios from "axios";
import 'antd/dist/antd.css';

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';

import { Layout, Menu } from 'antd';

import {useDispatch, useSelector} from "react-redux"
const { Header, Sider, Content } = Layout;



function Action(){
    const [seachText, setSearchText] = useState("")
    // const[postData, setPostData] = useState("")
 const [copyPost, setCopyPost] = useState("")
 const [display, setDisplay] = useState([])
 const [collapsed, setCollapsed] = useState(true);

//  const [selectedColors, setSelectedColors] = useState([])



 const dispatch = useDispatch();
 const post = useSelector((state)=>state.post.data);
 const cartProducts = useSelector((state)=>state.cartReducer);


 const getPost =async () =>{
    try{
        const {data} = await axios.get('https://leaguex.s3.ap-south-1.amazonaws.com/task/shopping/catalogue.json');
    dispatch({type:"INCREMENT",post:data});
        return data;
    }
    catch(error)
    {
    //  rejectWithValue(error.response.data);
    }
}



// console.log("post", post)
 useEffect (()=>{
    setCopyPost(post)
    getPost()

  },[])


useEffect(()=>{

    const postWithCount =post && post.map(t1 => ({...t1, ...cartProducts.find(t2 => t2.product_id === t1.id)}))

    setCopyPost(postWithCount)

},[post])

//   console.log("postData", copyPost)


  
// console.log(post)
  

  const searchFunc = (e) => {
    // console.log(e)
    setSearchText(e)
  }

  const onSearch = () =>{
    console.log("btn triggered")
    const filteredArray = post.filter((items) => {
        return (((items.name).toLowerCase()).includes(seachText.toLowerCase()) || 
        ((items.color).toLowerCase()).includes(seachText.toLowerCase()) || 
        ((items.type).toLowerCase()).includes(seachText.toLowerCase()))  
      })
      console.log("filteredArray", filteredArray)
      setCopyPost(filteredArray)
  }

const onAdd = (event ,param) =>{
//     console.log("param", param.id)
//     post.map((item,index) => {
// if(item.id == param.id){
    setDisplay([...display, param.id])
    dispatch({type:"ADD_EXPENSE",expense:{product_id:param.id,count:1}})
//}
    //})
   // setDisplay(true)
   console.log(display)
}
// console.log(display)


useEffect(()=>{
    const Datessssss =copyPost && copyPost.map(t1 => ({...t1, ...cartProducts.find(t2 => t2.product_id === t1.id)}))
    console.log("Datessssss",Datessssss)
    setCopyPost(Datessssss)

},[cartProducts])

const changeCount = (product_id,count) =>{

    let changedItem = post.filter(({ id }) => id == product_id)
    changedItem=changedItem?.[0]


    if(count == 0)
    {
        let removedCount = copyPost.map((product) => {
            if (product.id === product_id) {
                return {
                    ...product,
                    count:0
                };
            } else {
                return product;
            };
        });

        setCopyPost(removedCount)

        dispatch({type:"REMOVE_EXPENSE",id:product_id})
        return
    }


    if(changedItem.quantity >= count)
    {
        dispatch({type:"EDIT_EXPENSE",id:product_id,updates:{count:count}})
    }else{
        alert("No stock")
    }
}

const onFilter = (e, type) =>{
    console.log("type", type)
    // console.log(e)
    if( type ){
        let colors = document.querySelector(".colorFilter").querySelectorAll("input:checked")

        let gender =document.querySelector(".genderfilter").querySelectorAll("input:checked")
        
        let type =document.querySelector(".typeFilter").querySelectorAll("input:checked")
        console.log("type", type)

    let price =document.querySelector(".priceFilter").querySelectorAll("input:checked")


        let selectedColors = [...colors].map(a => a.name);
        console.log("selectedColors", selectedColors)

        let selectedGender = [...gender].map(a => a.name);
        console.log("selectedGender", selectedGender)

        let selectedType = [...type].map(a => a.name);
        console.log("selectedType", selectedType)

        let selectedPrice = [...price].map(a => a.name);
        console.log("selectedType", selectedPrice)





        let filteredArray = post.filter((item) => {
            return ((selectedColors.length>0 ? (selectedColors).includes(item.color) : true )   &&
            (selectedGender.length>0 ? (selectedGender).includes(item.gender) : true) &&
            (selectedType.length>0 ?  (selectedType).includes(item.type) : true) &&
            (selectedPrice.includes("a") ? item.price <= 250 :true) &&
            (selectedPrice.includes("b") ? (item.price > 250 &&item.price <= 450 ) :true) &&
            (selectedPrice.includes("c") ? (item.price > 450) :true)

             )})

      setCopyPost(filteredArray)


    console.log("selectedPrice", price)

    if(type){
        const filtered = filteredArray.filter(employee => {
                        return employee.type <= 250;
                  })
                  console.log("filtered", filtered)

    }
    

}



}


  

return(
<div >
    <div className="main-container">
        <input id="searchFilter" placeholder="Search for Products" onChange={(e) => { searchFunc(e.target.value) }}/>
        <button onClick={() => onSearch()}><SearchOutlined /></button>
        {/* <button id="filter-btn"><FilterOutlined /></button> */}
        <button id="phonenav_btn">
        {React.createElement(collapsed ? FilterOutlined : FilterOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          </button>
</div>

<Layout>
     {!collapsed && <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <div >
    <div className="phove-navBar" >
            <span> Color</span><br/>

    <div className="colorFilter">
        <input type="checkbox" name="Red"  onClick={()=> onFilter("Red", "color")}/>
        <label>Red</label> <br/>

        <input type="checkbox" name="Blue"  onClick={()=> onFilter("Blue" , "color")}/>
        <label>Blue</label> <br/>
          
        <input type="checkbox" name="Green"  onClick={()=> onFilter("Green" , "color")}/>
        <label>Green</label> <br/>
 
        <input type="checkbox" name="Pink"  onClick={()=> onFilter("Pink" , "color")}/>
        <label>Pink</label> <br/>

        <input type="checkbox" name="Black"  onClick={()=> onFilter("Black" , "color")}/>
        <label>Black</label> <br/>
 
        <input type="checkbox" name="Grey"  onClick={()=> onFilter("Grey" , "color")}/>
        <label>Grey</label> <br/>

    </div>
    
    <span>Gender</span><br />
    <div className="genderfilter">

    <input type="checkbox" name="Men" onClick={()=> onFilter("Men" , "gender")}/>
    <label>Men</label> <br/>

    <input type="checkbox" name="Women" onClick={()=> onFilter("Women", "gender")}/>
    <label>Women</label> <br/>
    </div>



    <span>Price</span><br />
    <div className="priceFilter">
    <input type="checkbox" name="a" onClick={()=> onFilter("250","a")}/>
    <label>Rs 0-250</label> <br/>

    <input type="checkbox" name="b" onClick={()=> onFilter("350","price")}/>
    <label>RS 251-450</label> <br/>

    <input type="checkbox" name="c" onClick={()=> onFilter("450","price")}/>
    <label>RS 450</label> <br/>

    <span>Type</span><br />
    <div className="typeFilter">
    <input type="checkbox" name="Polo" onClick={()=> onFilter("Polo", "type")}/>
    <label>Polo</label> <br/>

    <input type="checkbox" name="Hoodie" onClick={()=> onFilter("Hoodie", "type")}/>
    <label>Hoodie</label> <br/>

    <input type="checkbox" name="Basic" onClick={()=> onFilter("Basic", "type")}/>
    <label>Basic</label> <br/>
    </div>

    </div>
    
    </div>
</div>
      </Sider> }
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
<div className="conatiner-div">
<div className="nav-filter">
    <div className="filter-type">
            <span> Color</span><br/>

    <div className="colorFilter">
        <input type="checkbox" name="Red"  onClick={()=> onFilter("Red", "color")}/>
        <label>Red</label> <br/>

        <input type="checkbox" name="Blue"  onClick={()=> onFilter("Blue" , "color")}/>
        <label>Blue</label> <br/>

        <input type="checkbox" name="Green"  onClick={()=> onFilter("Green" , "color")}/>
        <label>Green</label> <br/>

        <input type="checkbox" name="Pink"  onClick={()=> onFilter("Pink" , "color")}/>
        <label>Pink</label> <br/>

        <input type="checkbox" name="Black"  onClick={()=> onFilter("Black" , "color")}/>
        <label>Black</label> <br/>

        <input type="checkbox" name="Grey"  onClick={()=> onFilter("Grey" , "color")}/>
        <label>Grey</label> <br/>

    </div>
    
    <span>Gender</span><br />

    <div className="genderfilter">
    <input type="checkbox" name="Men" onClick={()=> onFilter("Men" , "gender")}/>
    <label>Men</label> <br/>

    <input type="checkbox" name="Women" onClick={()=> onFilter("Women", "gender")}/>
    <label>Women</label> <br/>
    </div>



    <span>Price</span><br />
    <div className="priceFilter">
    <input type="checkbox" name="a" onClick={()=> onFilter("250","a")}/>
    <label>Rs 0-250 </label> <br/>

    <input type="checkbox" name="b" onClick={()=> onFilter("350","price")}/>
    <label>RS 251-450</label> <br/>

    <input type="checkbox" name="c" onClick={()=> onFilter("450","price")}/>
    <label>RS 450</label> <br/>
    </div>
    <span>Type</span><br />
    <div className="typeFilter">
    <input type="checkbox" name="Polo" onClick={()=> onFilter("Polo", "type")}/>
    <label>Polo</label> <br/>

    <input type="checkbox" name="Hoodie" onClick={()=> onFilter("Hoodie", "type")}/>
    <label>Hoodie</label> <br/>

    <input type="checkbox" name="Basic" onClick={()=> onFilter("Basic", "type")}/>
    <label>Basic</label> <br/>
    </div>
    
    </div>
</div>

<div>

</div>


    <div className="post-container">
        {copyPost && copyPost.map((item,index)=>{
            let id = item.id
            return(
          <div className="post-container1" key={index}> 

          <h3 id="type-name">{item.name}</h3>

            <img src={item.imageURL} />
            
          <div className="container-foot">
            
                <span>RS {item.price}</span>
            {item?.count >0 ?
            <div className="footer-btn">

            <button id="incrementbtn" onClick={(e)=>{changeCount(item.id,item?.count - 1)}} ><p>-</p></button >
            <h3 style={{margin:0}}>{item?.count}</h3> <button id="incrementbtn" onClick={(e)=>{changeCount(item.id,item?.count + 1)}}><p>+</p></button>
             </div>:
             <button onClick={event => onAdd (event , {id})}><p>Add to cart</p></button>
            }
            </div>
    </div>
            );
    }
            )}
</div>

</div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >

        </Content>
      </Layout>
    </Layout>







</div>

);
}
export default Action;