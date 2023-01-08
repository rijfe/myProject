import { atom, selector } from "recoil";

const tokenState = atom({
    key:"tokenState",
    default:"",
});

const getToken = selector({
    key:"getToken",
    get: ({get})=>{
        const text = get(tokenState);
        return text;
    },
});
 export { tokenState, getToken };