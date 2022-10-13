import React, {useState, useEffect} from "react";

function Task  () {
  const [data, setData] = useState([])
  const [newData, setNewData] = useState([])
 
    const Schema = [
        {
        id: 1,
        username: "shiva",
        coins: 200,
        isCreator: "true"
    },
       {
        id: 2,
        username: "Chandru",
        coins: 300,
        isCreator: "false"
    },
       {
        id: 3,
        username: "Gokul",
        coins: 200,
        isCreator: "true"
    }
      ]


      useEffect (()=>{

        let datas = Schema.map(Object =>{
            if (Object.id == 3){
                return {...Object, isCreator : "False"}
            }
            return Object
          }
            
            )
            console.log(datas)
        setNewData(datas)
      },[])

        

    return (
        <div>
        {newData && newData.map((item, index)=>{
            return(
              <div key={item.id}>
              // <li>{item.number}</li>
              <li>{item.username}</li>
              <li>{item.coins}</li>
              <li>{item.isCreator}</li>
              </div>
      
      
            );
          })}
          </div>
        );
}

export default Task 