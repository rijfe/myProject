import { atom, selector } from "recoil";

const nameState = atom({
    key: "nameState",
    default: "",
});

const getName = selector({
    key: "getName",
    get: ({get})=>{
        const str = get(nameState);
        return str;
    },
});

export { nameState, getName };