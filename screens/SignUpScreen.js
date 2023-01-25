import React,{useState, createRef} from "react";
import { View, Button, StyleSheet, KeyboardAvoidingView, SafeAreaView, Text, TextInput, Alert, Image } from "react-native";
import {Picker} from "@react-native-picker/picker";

import Input from "../component/Input";

const SignUpScreen = props => {
    const [selectRole, setSelectRole] = useState("ROLE_STUDENT");
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

    const clear = () =>{
        idInputRef.current.clear();
        pwdInputRef.current.clear();
        pwdchkInputRef.current.clear();
        nameInputRef.current.clear();
    };

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
            let resData = reponse.json();
            resData.then((result)=>{
                if(result.code === "400"){
                    Alert.alert(result.message, '다시 입력해주세요.',[
                        {text:'Ok', style:'destructive', onPress:()=>{clear();}}
                    ]);
                }
                else{
                    console.log(result.accessToken);
                    setSignupSuccess(true);
                }
            });
        });
    };

    if(signupSuccess){
        Alert.alert('회원가입에 성공했습니다.', '로그인하세요.' , [
                {text:'Ok', style:'destructive', onPress:()=>{props.navigation.pop()}}
        ]);
        setSignupSuccess(false);
    }

    return(
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image source={require('../assets/logo-removebg-preview.png')}/>
            </View>
            <View style={styles.Input}>
                <Text style={styles.coin}>Coin</Text>
                <View style={styles.formControl}>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={(userName)=>{setUserName(userName);}}
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        returnKeyType='next'
                        placeholder = "이름을 입력하세요."
                        ref={nameInputRef}
                        onSubmitEditing={()=>
                            idInputRef.current && idInputRef.current.focus()
                        }
                    />
                </View>
                <View style={styles.formControl}>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={(userStdId)=>{setUserStdId(userStdId);}}
                        ref={idInputRef}
                        placeholder = "학번을 입력하세요."
                        returnKeyType="next"
                        onSubmitEditing={()=>
                            pwdInputRef.current && pwdInputRef.current.focus()
                        }
                    />
                </View>
                <View>
                    <TextInput 
                        style={styles.input}
                        onChangeText={(userPwd)=>{setUserPwd(userPwd);}}
                        ref={pwdInputRef}
                        placeholder = "비밀번호를 입력하세요."
                        onSubmitEditing={()=>
                            pwdchkInputRef.current && pwdchkInputRef.current.focus()
                        }
                    />
                </View>
                <View>
                    <TextInput 
                        style={styles.input}
                        onChangeText={(userPwdCheck)=>{setPwdCheck(userPwdCheck);}}
                        ref={pwdchkInputRef}
                        placeholder = "비밀번호를 다시 입력하세요."
                        onSubmitEditing={()=>
                            roleInputRef.current && roleInputRef.current.focus()
                        }
                    />
                </View>
                <View style={styles.button}>
                    <Button title="가입" color="black" onPress={()=>{signUpHandler();}}/>
                </View>
            </View>
        </View>
        
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignContent:'center'
    },
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
        height:330,
        margin:20,
        marginTop: 40,
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
        borderBottomWidth:1,
        borderRadius: 2,
        borderColor: '#ccc',
        backgroundColor: 'white',
        borderWidth: 1,
        marginBottom: 10,
        backgroundColor:'#efefef',
        width:'80%',
        left: 37
    },
    button:{
        shadowColor: 'black',
        shadowOpacity:0.26,
        shadowOffset: {width: 0, height:2},
        shadowRadius:8,
        elevation:5,
        borderRadius:10,
        width:'80%',
        left: 37
    },
    logo:{
        flex:0.5,
        justifyContent:'center',
        alignItems:'center',
    },
    coin: {
        justifyContent: 'center', 
        alignItems: 'center', 
        fontSize: 50, 
        left: 130,
        top:0,
        marginBottom:10
    }
});

export const screenOptions = () =>{
    return{
        headerTitle:"회원가입"
    };
};

export default SignUpScreen;