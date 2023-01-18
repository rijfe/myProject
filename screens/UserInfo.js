import React, { useEffect, useId, useState } from "react";
import { View, Text, Image, Button, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView } from "react-native";
import { useRecoilValue } from "recoil";
import ActionButton from "react-native-action-button";
import Ionicons from '@expo/vector-icons/Ionicons';

import AsyncStorage from "@react-native-async-storage/async-storage";

import MoveScreen from "./MoveScreen";

import BottomSheet from "./InfoChangeScreen";

import { getName } from "../store/getUserInfo";
import { getTokenState } from "../store/setTokenstate";
import { setIdState } from "../store/getId";

const UserInfoScreen = props => {
    let userName = useRecoilValue(getName);
    const curToken = useRecoilValue(getTokenState);
    let userId = useRecoilValue(setIdState);

    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editable, setEditable] = useState(false);
    const [department, setDepartment] = useState("");

    useEffect(()=>{
        const d = AsyncStorage.getItem('department');
        d.then((dep)=>{
            console.log(dep);
            setDepartment(dep);
        });
        setTimeout(() => {
            setLoading(true);
        }, 1000);
    },[])

    const pressButton = () => {
        setModalVisible(true);
    }

    const saveHandler = () =>{
        AsyncStorage.setItem('department', department);
        setEditable(false);
    };

    if (curToken === "change") {
        props.navigation.pop();
    }

    return loading ? (
        <View style={styles.centered}>
            <View style={styles.size}>
                <TouchableOpacity>
                    <Image style={styles.logo} source={require('../assets/free-icon-person-5393061.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.editContainer}>
                <View style={styles.text}>
                    <Text style={styles.textsize}>보유코인 : ?</Text>
                </View>
                <View style={styles.editBntContainer}>
                    <View >
                        <Button title="프로필 편집하기" color="black" onPress={() => {setEditable(true);}} />
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Button title="저장" color="black" onPress={()=>{saveHandler();}}/>
                    </View>
                </View>
            </View>
            <KeyboardAvoidingView behavior='padding' style={styles.userPro}>
                <Text style={{fontWeight:'bold', fontSize: 15, color:'grey'}}>이름</Text>
                <TextInput
                    defaultValue={userName}
                    style={styles.input}
                    editable={false}
                    selectTextOnFocus={true}
                />
                <Text style={{fontWeight:'bold', fontSize: 15, color:'grey'}}>학번</Text>
                <TextInput
                    defaultValue={userId}
                    style={styles.input}
                    editable={false}
                />
                <Text style={{fontWeight:'bold', fontSize: 15, color:'grey'}}>학과 </Text>
                <TextInput
                    defaultValue={department}
                    style={styles.input}
                    editable= {editable ? true : false}
                    onChangeText={(department)=>{setDepartment(department);}}
                />
            </KeyboardAvoidingView>
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
    ):(
        <MoveScreen/>
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
        right: 35
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
        top: 220,
        left:30,
        height: 200,
        width:"90%",
        justifyContent:'center',
        alignContent:'center',
    },
    input:{
        width:"90%",
        paddingHorizontal:2,
        paddingVertical:7,
        borderBottomColor:'black',
        borderBottomWidth:1,
        fontSize: 20,
        marginBottom:15,
        color:'black'
    },
});

export default UserInfoScreen;