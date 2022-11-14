import React,{useState} from "react";
import { View, Button, StyleSheet, KeyboardAvoidingView, SafeAreaView } from "react-native";
import {Picker} from "@react-native-picker/picker";

import Input from "../component/Input";

const SignUpScreen = () => {
    const [selectRole, setSelectRole] = useState();
    return(
        <View style={styles.center}>
            <KeyboardAvoidingView>
                <SafeAreaView style={styles.Input}>
                    <Input
                        id = "학번"
                        label = "학번"
                        keyboardType = "default"
                        required
                        autoCapitalize="none"
                        errorMessage = "is not correct"
                        onInputChange= {()=>{}}
                        initialValue=""
                    />
                    <Input
                        id = "이름"
                        label = "이름"
                        keyboardType = "default"
                        required
                        autoCapitalize="none"
                        errorMessage = "is not correct"
                        onInputChange= {()=>{}}
                        initialValue=""
                    />
                    <Input
                        id = "비밀번호"
                        label = "비밀번호"
                        keyboardType = "default"
                        required
                        autoCapitalize="none"
                        errorMessage = "is not correct"
                        onInputChange= {()=>{}}
                        initialValue=""
                    />
                    <Picker
                        selectedValue={selectRole}
                        onValueChange={(itemValue, itemIndex)=>{
                            setSelectRole(itemValue)
                        }}
                    >
                        <Picker.Item label="학생" value="Student"/>
                        <Picker.Item label="교직원" value="Staff"/>
                        <Picker.Item label="교수" value="Professor"/>
                    </Picker>
                    <Button title="SignUp"/>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    center:{
        flex:1,
        justifyContent:'center',
        alignContent:'center'
    },
    Input:{
        shadowColor: 'black',
        shadowOpacity:0.26,
        shadowOffset: {width: 0, height:2},
        shadowRadius:8,
        elevation:5,
        borderRadius:10,
        backgroundColor:'white',
        height:350,
        margin:20
    }
});

export default SignUpScreen;