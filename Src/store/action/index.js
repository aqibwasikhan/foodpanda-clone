const addToCArt = (item)=>{
    console.log('item action ke---->', item);
    return {
        type: 'ADD TO CART',
        payload: item
    }
}
const removeItem = (id)=>{
    console.log('remove in action-->',id);
    return {
        type: 'REMOVE ITEM',
        payload: id
    }
}
export {addToCArt,removeItem};