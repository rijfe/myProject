import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, TouchableOpacity, StyleSheet } from "react-native";
import { useRecoilValue } from "recoil";
import ActionButton from "react-native-action-button";
import  Ionicons from '@expo/vector-icons/Ionicons';

import BottomSheet from "./InfoChangeScreen";

import { getName } from "../store/getUserInfo";

const UserInfoScreen = () => {
    let userName = useRecoilValue(getName);

    const [ modalVisible, setModalVisible ] = useState(false);

    const pressButton = () => {
        setModalVisible(true);
    }

    return (
        <View style={styles.centered}>
            <View></View>
            <TouchableOpacity style={styles.size}>
                <Image style={styles.logo} source={require('../assets/free-icon-person-5393061.png')} />
            </TouchableOpacity>
            <View style={styles.text}>
                <Text style={styles.textsize}>{userName}님 환영합니다!</Text>
            </View>
            <View style={styles.floating}>
                <ActionButton 
                    buttonColor="black" 
                    onPress={pressButton}
                    renderIcon={()=>{
                        return(<Ionicons name="ios-settings" size={32} color="white" />);
                    }}
                />
            </View>
            <BottomSheet
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'flex-start',
        alignContent: 'center',
    },
    size: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',

    },
    logo: {
        flex: 1,
        height: "40%",
        width: "52%",
    },
    text: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textsize: {
        fontSize: 20
    },
    floating: {
        position:'absolute',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height: 100,
        bottom:0,
        right:0
    }
});

export default UserInfoScreen;