import React,{useState, createRef} from "react";
import { View, Button, StyleSheet, KeyboardAvoidingView, SafeAreaView, Text, TextInput, Alert } from "react-native";
import {Picker} from "@react-native-picker/picker";

import Input from "../component/Input";

const SignUpScreen = props => {
    const [selectRole, setSelectRole] = useState("");
    const [userName, setUserName] = useState("");
    const [userStdId, setUserStdId] = useState("");
    const [userPwd, setUserPwd] = useState("");
    const [userPwdCheck, setPwdCheck] = useState("");
    const [signupSuccess, setSignupSuccess] = useState(false);

    const idInputRef = createRef();
    const roleInputRef = createRef();
    const pwdInputRef = createRef();
    const pwdchkInputRef = createRef();
    const nameInputRef = createRef();

    const signUpHandler = () =>{
        if(!userName){
            Alert.alert('이름을 입력해주세요');
            return;
        }
        if(!userStdId){
            Alert.alert('학번을 입력해주세요');
            return;
        }
        if(!userPwd){
            Alert.alert('비밀번호를 입력해주세요');
            return;
        }
        if(userPwd != userPwdCheck){
            Alert.alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        if(!selectRole){
            Alert.alert('선택해주세요.');
            return;
        }
        
        fetch('http://119.203.225.3/user/user',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "identifier": userStdId,
                "name": userName,
                "password": userPwd,
                "userRole": selectRole
            })
        }).then((reponse) => {
            console.log(reponse.json());
            setSignupSuccess(true);
        }).catch((error)=>{
            console.log(error);
        });
    };

    if(signupSuccess){
        Alert.alert('회원가입에 성공했습니다.', '로그인하세요.' , [
                {text:'Ok', style:'destructive', onPress:()=>{props.navigation.pop()}}
        ]);
    }

    return(
        <View style={styles.Input}>
            <View style={styles.formControl}>
                <Text style={styles.label}>이름</Text>
                <TextInput 
                    style={styles.input} 
                    onChangeText={(userName)=>{setUserName(userName)}}
                    keyboardType='default'
                    autoCapitalize='sentences'
                    autoCorrect
                    returnKeyType='next'
                    ref={nameInputRef}
                    onSubmitEditing={()=>
                        idInputRef.current && idInputRef.current.focus()
                    }
                />
            </View>
            <View style={styles.formControl}>
                <Text style={styles.label}>학번</Text>
                <TextInput 
                    style={styles.input} 
                    onChangeText={(userStdId)=>{setUserStdId(userStdId)}}
                    ref={idInputRef}
                    returnKeyType="next"
                    onSubmitEditing={()=>
                        pwdInputRef.current && pwdInputRef.current.focus()
                    }
                />
            </View>
            <View>
                <Text style={styles.label}>비밀번호</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={(userPwd)=>{setUserPwd(userPwd)}}
                    ref={pwdInputRef}
                    onSubmitEditing={()=>
                        pwdchkInputRef.current && pwdchkInputRef.current.focus()
                    }
                />
            </View>
            <View>
                <Text style={styles.label}>비밀번호 확인</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={(userPwdCheck)=>{setPwdCheck(userPwdCheck)}}
                    ref={pwdchkInputRef}
                    onSubmitEditing={()=>
                        roleInputRef.current && roleInputRef.current.focus()
                    }
                />
            </View>
            <Text style={styles.label}>선택</Text>
            <Picker
                selectedValue={selectRole}
                onValueChange={(itemValue, itemIndex)=>{
                    setSelectRole(itemValue)
                }}
            >   
                <Picker.Item label="선택해주세요." value="Nothing"/>
                <Picker.Item label="학생" value="Student"/>
                <Picker.Item label="교직원" value="Staff"/>
                <Picker.Item label="교수" value="Professor"/>
            </Picker>
            <View style={styles.button}>
                <Button title="Sign UP" onPress={()=>{signUpHandler();}}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    Input:{
        justifyContent:'center',
        alignContent:'center',
        shadowColor: 'black',
        shadowOpacity:0.26,
        shadowOffset: {width: 0, height:2},
        shadowRadius:8,
        elevation:5,
        borderRadius:10,
        backgroundColor:'white',
        height:400,
        margin:20
    },
    form:{
        margin:20
    },
    formControl:{
        width:'100%'
    },
    label:{
        marginVertical:8
    },
    input:{
        paddingHorizontal:2,
        paddingVertical:5,
        borderBottomColor:'#ccc',
        borderBottomWidth:1
    },
    button:{
        shadowColor: 'black',
        shadowOpacity:0.26,
        shadowOffset: {width: 0, height:2},
        shadowRadius:8,
        elevation:5,
        borderRadius:10,
    }
});

export default SignUpScreen;