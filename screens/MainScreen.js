import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../component/UI/HeaderButton";
import Colors from "../Constant/Colors";

import AsyncStorage from "@react-native-async-storage/async-storage";

const MainScreen = ({navigation}) => {
    const [token, setToken] = useState("");
    let str;
    const test = () =>{
        const t = AsyncStorage.getItem('info');
        t.then((result)=>{
            const p = JSON.parse(result);
            console.log(p.result.accessToken);
            str = p.result.accessToken;
            setToken(str);
        });
    };

    const getData = () =>{
        console.log(token)
        fetch("http://119.203.225.3/user/user",{
            method:'GET',
            headers:{
                'Authorization':token
            }
        }).then((reponse)=>{
            let resData = reponse.json();
            resData.then((result)=>{
                console.log(result);
                navigation.setParams({
                    owner: result.owner
                });
            });
        });
    };

    useEffect(()=>{
        test();
    },[])

    return(
        <View>
            <Text>wellcome Main!</Text>
            <Button title="Click" onPress={()=>{getData();}}/>
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