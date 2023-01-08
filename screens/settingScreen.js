import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, TouchableOpacity, StyleSheet } from "react-native";
import { useRecoilValue } from "recoil";

import { getName} from "../store/getUserInfo";
import {getToken} from "../store/getUserToken";

const SettingScreen = () => {
    let userName = useRecoilValue(getName);
    let userToken = useRecoilValue(getToken);

    const changePwd = () =>{
        fetch("http://119.203.225.3/user/user?newPassword=21",{
            method:'PATCH',
            headers:{
                'Authorization': userToken
            }
        }).then((response)=>{
            let res = response.json();
            console.log(res);
            res.then((result)=>{
                console.log(result);
            })
        });
    };

    return(
        <View style={styles.centered}>
            <TouchableOpacity style={styles.size}>
                <Image style={styles.logo} source={require('../assets/free-icon-person-5393061.png')}/>
            </TouchableOpacity>
            <View style={styles.text}>
                <Text style={styles.textsize}>{userName}님 환영합니다!</Text>
            </View>
            <Button title="change" onPress={()=>{changePwd();}}/>
        </View>
    );
};

const styles = StyleSheet.create({
    centered:{
        flex:1,
        justifyContent:'flex-start',
        alignContent:'center',
    },
    size:{
        flex: 0.4,
        justifyContent:'center',
        alignItems: 'center',
        
    },
    logo:{
        flex:1,
        height: "40%",
        width:"52%",
    },
    text:{
        marginTop:30,
        justifyContent:'center',
        alignItems: 'center'
    },
    textsize:{
        fontSize:20
    }
});

export const screenOptions = props =>{
    
    return{
        headerTitle:"User",
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

export default SettingScreen;