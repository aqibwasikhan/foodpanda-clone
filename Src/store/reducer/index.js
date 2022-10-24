const initialState = {
  selectedItem: [],
};
const reducer = (state = initialState, action) => {
  console.log("action reducer--->", action);
  switch (action.type) {
    case "ADD TO CART":
      let name = [...state.selectedItem, action.payload.menuItems];
      console.log(name, "-----reducer");
      return {
        ...state,
        selectedItem: [...state.selectedItem, action.payload.menuItems],
      };
    case "REMOVE ITEM":{

        // let removed = [...state.selectedItem]
        // removed.splice(action.payload,1)
        // console.log(selectedItem,'selcete',action.payload,'action');
        // console.log(action.payload,'select', state.selectedItem)
        
        let removed = state.selectedItem.filter(itemInArray => itemInArray.id.id !== action.payload.id.id)
        // console.log(removed,'id')
        return {
            ...state,
            selectedItem: removed
        };
    }

    default:
      return state;
  }
};
export default reducer;
