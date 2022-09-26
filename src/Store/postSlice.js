import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"




// export const getPost = createAsyncThunk(
//     "post/getData",
//    async (arg,{rejectWithValue})=>{
//     try{
//         const {data} = await axios.get('https://leaguex.s3.ap-south-1.amazonaws.com/task/shopping/catalogue.json');
//         return data;
//     }
//     catch(error)
//     {
//      rejectWithValue(error.response.data);
//     }
// })

let init={
    data :[]
}




const data =(state = init, action) => {
    switch (action.type){
    case 'INCREMENT': return {...state, data:action.post}
    // case 'DECREMENT':{
    //     if((state.count-1)>0){
    //         return {...state,count:state.count-1}
    //     }
    //     else{
    //        alert("Error")
    //     }
    // }
    // case 'RESET' : return {...state,count:0} 
    default :
    return state
    }
}
export default data;