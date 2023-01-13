import { atom, selector } from "recoil";

const curTokenState = atom({
    key:'curTokenState',
    default:''
});

const getTokenState = selector({
    key:'getTokenState',
    get:({get})=>{
        const text = get(curTokenState);
        return text;
    }
});

export {curTokenState, getTokenState};