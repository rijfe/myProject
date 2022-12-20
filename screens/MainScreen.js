import React from "react";
import { View, Text, Button } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../component/UI/HeaderButton";
import Colors from "../Constant/Colors";

import AsyncStorage from "@react-native-async-storage/async-storage";

const MainScreen = props => {

    const test = () =>{
        const token = AsyncStorage.getItem('info');
        token.then((result)=>{
            const p = JSON.parse(result);
            console.log(p.result.accessToken);
        });
    };

    return(
        <View>
            <Text>wellcome Main!</Text>
            <Button title="Click" onPress={()=>{test();}}/>
        </View>
    );
};


export const screenOptions = props =>{
    
    return{
        headerTitle:"Main",
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