let init={
    data :[]
}

const data =(state = init, action) => {
    switch (action.type){
    case 'CART': return {...state, data:action.post}
 
    default :
    return state
    }
}
export default data;