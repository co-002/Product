import {configureStore} from "@reduxjs/toolkit"
import productCombinationReducer from "./productCombinationSlice.js";


const store = configureStore({
    reducer: {
        productCombination: productCombinationReducer
    }
})

export default store;