/**
 * Created by air on 2017/12/25.
 */
import * as ActionTypes from './ActionTypes';

export const increment = (counterCaption)=>{
    return {
        type:ActionTypes.INCREMENT,
        counterCaption:counterCaption
    }
}

export const decrement = (counterCaption)=>{
    return{
        type:ActionTypes.DECREMENT,
        counterCaption:counterCaption
    }
}