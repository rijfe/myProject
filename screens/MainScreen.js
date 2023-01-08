import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useRecoilState } from "recoil";

import HeaderButton from "../component/UI/HeaderButton";
import Colors from "../Constant/Colors";
import { nameState } from "../store/getUserInfo";
import { tokenState } from "../store/getUserToken";

import AsyncStorage from "@react-native-async-storage/async-storage";

const MainScreen = ({navigation}) => {
    const [token, setToken] = useRecoilState(tokenState);
    const [name, setName] = useRecoilState(nameState);

    let str;
    const getInfo = () =>{
        const t = AsyncStorage.getItem('info');
        t.then((result)=>{
            const p = JSON.parse(result);
            str = p.result.accessToken;
            setToken(str);
        });
    };

    const getData = async() =>{
        await fetch("http://119.203.225.3/user/user",{
            method:'GET',
            headers:{
                'Authorization':token
            }
        }).then((reponse)=>{
            let resData = reponse.json();
            resData.then((result)=>{
                console.log(result);
                setName(result.owner);
            });
        });
        
    };

    useEffect(()=>{
        getInfo();
    },[])

    if(token != ""){
        getData();
    }

    return(
        <View>
            <Text>wellcome Main!</Text>
        </View>
    );
};


export const screenOptions = props =>{
    
    return{
        headerTitle:"Coin",
        headerLeft:()=>{

        },
        headerRight:()=>(
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='logout' iconName={'ios-log-out'} onPress={()=>{
                    props.navigation.pop();
                    AsyncStorage.removeItem('info');
                }}/>
            </HeaderButtons>
        )
    };
};

export default MainScreen;