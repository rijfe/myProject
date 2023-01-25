import react, { useState } from "react";
import { Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from 'react-native-vector-icons/Ionicons';

import LoginScreen from "../screens/loginScreen";
import MainScreen from "../screens/MainScreen";
import SecondScreen from "../screens/secondScreen";
import UserInfoScreen from "../screens/UserInfo";
import SignUpScreen from "../screens/SignUpScreen";

import { screenOptions as LoginScreenOptions } from "../screens/loginScreen";
import { screenOptions as MainScreenOptions } from "../screens/MainScreen";
import { screenOptions as SignUpScreenOptinons } from "../screens/SignUpScreen";


const Stack = createStackNavigator();
const Bottom = createBottomTabNavigator();

const tabNav = () => {
    return(
        <Bottom.Navigator
            screenOptions={({route})=>({
                tabBarIcon:({ focused, color, size })=>{
                    let iconName;
                    color = "black";
                    if(route.name === 'Main'){
                        iconName = focused ? 'ios-home':'ios-home-outline';
                    }
                    else if(route.name === 'User'){
                        iconName = focused ? 'ios-person-circle':'ios-person-circle-outline';
                    }
                    else{
                        iconName = focused ? 'ios-list' : 'ios-list-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarLabel:()=>{return null;}
            })}
            tabBarOptions={{
                activeTintColor: 'black',
                inactiveTintColor: 'gray',
            }}
        >
            <Bottom.Screen name="Main" component={MainScreen} />
            <Bottom.Screen name="Second" component={SecondScreen}/>
            <Bottom.Screen name="User" component={UserInfoScreen}/>
        </Bottom.Navigator>
    );
    
};

const appNav = () =>{
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="LoginScreen" component = {LoginScreen} options={LoginScreenOptions}/>
                <Stack.Screen name="tab" component={tabNav} options={MainScreenOptions}/>
                <Stack.Screen name="SignUp" component={SignUpScreen} options={SignUpScreenOptinons}/>
            </Stack.Navigator>
        </NavigationContainer>
    ); 
};

export default appNav;