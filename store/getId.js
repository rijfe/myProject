import { atom, selector } from "recoil";

const getIdState = atom({
    key: "getIdState",
    default:""
});

const setIdState = selector({
    key:"setIdState",
    get:({get})=>{
        const id = get(getIdState);
        return id;
    }
});

export { getIdState, setIdState };