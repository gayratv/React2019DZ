import {store} from "../store/store";
import {bindActionCreators} from 'redux';


// то что снизу назовем action creators

const inc = () => ({type : 'INC'});
const dec = () => ({type : 'DEC'});
const reset = () => ({type : 'RESET'});
const rnd = (value) => ({type : 'RND',value});

export {inc, dec, reset, rnd}


export const getDispatchsObj = () => (bindActionCreators(    {inc, dec, rnd,reset }    ,store.dispatch));


// const bindActionCreator = (creator, dispatch) => (...args) => {
//     dispatch(creator(...args));
// }

// function bindActionCreator1 (creator, dispatch)  {
//     return (
//         (...args) => {dispatch(creator(...args));}
//     );
// }


/*
export const incDispatch = bindActionCreators(inc,store.dispatch);
export const decDispatch = bindActionCreators(dec,store.dispatch);
export const rndDispatch =  bindActionCreators(rnd,store.dispatch);
export const resetDispatch = bindActionCreators(reset,store.dispatch);
*/

/*
export const {incDispatch, decDispatch, rndDispatch,resetDispatch }  = bindActionCreators(
    {
        incDispatch : inc,
        decDispatch : dec,
        rndDispatch : rnd,
        resetDispatch : reset
    }
    ,store.dispatch);
*/    