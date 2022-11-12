import React from "react";
import { View, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../component/UI/HeaderButton";
import Colors from "../Constant/Colors";

const MainScreen = props => {
    return(
        <View>
            <Text>wellcome Main!</Text>
        </View>
    );
};


export const screenOptions = navData =>{
    return{
        headerTitle:"Main",
        headerLeft:()=>{

        },
        headerRight:()=>(
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='logout' iconName={'ios-log-out'} onPress={()=>{navData.navigation.pop();}}/>
            </HeaderButtons>
        )
    };
};

export default MainScreen;