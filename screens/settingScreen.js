import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, TouchableOpacity, StyleSheet } from "react-native";

const SettingScreen = ({route}) => {
    let [name, setName] = useState("");

    useEffect(()=>{
        let owner = route.params;
        console.log(route);
        setName(owner);
    },[]);

    console.log(name);

    return(
        <View style={styles.centered}>
            <TouchableOpacity style={styles.size}>
                <Image style={styles.logo} source={require('../assets/free-icon-person-5393061.png')}/>
            </TouchableOpacity>
            <View style={styles.text}>
                <Text style={styles.textsize}>김영우님 환영합니다!</Text>
            </View>
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
        marginTop:10,
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