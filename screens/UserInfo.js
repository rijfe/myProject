import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { useRecoilValue } from "recoil";
import ActionButton from "react-native-action-button";
import Ionicons from '@expo/vector-icons/Ionicons';

import BottomSheet from "./InfoChangeScreen";

import { getName } from "../store/getUserInfo";
import { getTokenState } from "../store/setTokenstate";
import { setIdState } from "../store/getId";

const UserInfoScreen = props => {
    let userName = useRecoilValue(getName);
    const curToken = useRecoilValue(getTokenState);
    let userId = useRecoilValue(setIdState);

    const theme = {
        Button: {
          titleStyle: {
            color: 'red',
          },
        },
      };

    const [modalVisible, setModalVisible] = useState(false);

    const pressButton = () => {
        setModalVisible(true);
    }

    if (curToken === "change") {
        props.navigation.pop();
    }

    return (
        <View style={styles.centered}>
            <View style={styles.size}>
                <TouchableOpacity>
                    <Image style={styles.logo} source={require('../assets/free-icon-person-5393061.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.editContainer}>
                <View style={styles.text}>
                    <Text style={styles.textsize}>{userName}/{userId}</Text>
                </View>
                <View style={styles.editBntContainer}>
                    <View >
                        <Button title="프로필 편집하기" color="black" onPress={() => {}} />
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Button title="저장" color="black" />
                    </View>
                </View>
            </View>
            <View style={styles.userPro}>
                <Text style={{fontWeight:'bold', fontSize: 30}}>학과: 컴퓨터공학과</Text>
                <TextInput/>
            </View>
            <View style={styles.floating}>
                <ActionButton
                    buttonColor="black"
                    onPress={pressButton}
                    renderIcon={() => {
                        return (<Ionicons name="ios-lock-closed" size={32} color="white" />);
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
        justifyContent: 'flex-start',
        flexDirection: "row",
        alignContent: 'center',
        position: 'relative'
    },
    size: {
        flex: 1,
        alignItems: 'center',
        marginTop: 30
    },
    logo: {
        height: 130,
        width: 130,
    },
    text: {
        marginRight: 25,
        justifyContent: 'space-around',
        alignItems: 'center',
        right: 24
    },
    textsize: {
        fontSize: 20,
    },
    floating: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 100,
        bottom: 0,
        right: 0,
        top: 460
    },
    editContainer: {
        flex: 1,
        top: 50,
    },
    editBntContainer: {
        marginTop: 20,
        width: 200,
        flexDirection: 'row'
    },
    userPro:{
        position:'absolute',
        flexDirection:'column',
        top: 200,
        
        height: 200,
        justifyContent:'center',
        alignContent:'center',
    }
});

export default UserInfoScreen;