let defaultState = {
    selectedItems: { items: [], restaurentName: "", }
}

let cartReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "ADD_TO_CART": {
            let newState = { ...state };
            if (action.payload.checkboxValue) {
                console.log("Add To Cart");
                newState.selectedItems = {
                    items: [...state.selectedItems.items, action.payload],
                    restaurentName: action.payload.restaurentName,

                }
            }
            else {
                console.log("Remove To Cart");
                newState.selectedItems = {
                    items: [
                        ...state.selectedItems.items.filter((item) => item.title !== action.payload.title),],
                    restaurentName: action.payload.restaurentName,

                };

            }
            // console.log(newState);
            return newState;

        }

        case "REMOVE_TO_CART": {
               
            let newState = { ...state };
            newState.selectedItems = {
                items: [null],
                restaurentName: null,

            }
            return newState;
        }
        default:
            return state;
    }
};

export default cartReducer;