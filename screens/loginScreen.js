import React,{useState, createRef, useEffect} from "react";
import { View, Button, StyleSheet, Text, TextInput, Image, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Loading from "../screens/Loading";

import { useRecoilState } from "recoil";

import { curTokenState} from "../store/setTokenstate";

const loginScreen = props =>{
    const [userPwd, setUserPwd] = useState("");
    const [userStdId, setUserStdId] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [ready, setReady] = useState(false);

    const [tokenState, setTokenState]= useRecoilState(curTokenState);

    const pwdInputRef = createRef();
    const idInputRef = createRef();

    const clear = () =>{
        idInputRef.current.clear();
        pwdInputRef.current.clear();
    };

    let para = ""+userStdId;

    useEffect(()=>{
        props.navigation.addListener('beforeRemove', (e)=>{
            e.preventDefault();
        });

        setTimeout(() => {
            AsyncStorage.getItem('info', (err, result)=>{
                console.log(result);
                if(result){
                    props.navigation.navigate('tab');
                }else{
                    setReady(true);
                }
            });
            setReady(true);
        }, 1000);
    },[]);

    const loginHandler = async (props) =>{
        if(!userStdId){
            Alert.alert('학번을 입력해주세요.');
            return;
        }
        if(!userPwd){
            Alert.alert('비밀번호를 입력해주세요.');
            return;
        }
        let loginUrl = 'http://119.203.225.3/user/login?';
        let id = 'identifier='+userStdId;
        
        let pwd = '&password='+userPwd;
        let url = loginUrl+id+pwd;
        await fetch(url,{
            method:'GET'
        }).then((reponse)=>{
            let resData = reponse.json();
            resData.then((result)=>{
                if(result.code === "400"){
                    Alert.alert(result.message,'다시 입력해주세요.',[
                        {text:'Ok', style:'destructive', onPress:()=>{clear();}}
                    ]);
                }
                else{
                    console.log(result.accessToken);
                    console.log(""+userStdId);
                    setLoginSuccess(true);
                    AsyncStorage.setItem('info', JSON.stringify({result}));
                    clear();
                }
            });
        }).then((error)=>{
            console.log(error);
        });
        setTokenState("login");
        clear();
    };

    if(loginSuccess){
        props.navigation.navigate('tab',{screen:'Main', params:{id: ""+userStdId}});
        setLoginSuccess(false);
    }

    return ready ? (
        <View style={styles.centered}>
            <View style={styles.logo}>
                <Image source={require('../assets/logo-removebg-preview.png')}/>
            </View>
            <View style={styles.Input}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>학번</Text>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={(userStdId)=>{setUserStdId(userStdId)}}
                        ref={idInputRef}
                        placeholder = "학번을 입력하세요."
                        returnKeyType="next"
                        onSubmitEditing={()=>
                            pwdInputRef.current && pwdInputRef.current.focus()
                        }
                    />
                </View>
                <View style={styles.container}>
                    <Text style={styles.label}>비밀번호</Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText={(userPwd)=>{setUserPwd(userPwd)}}
                        ref={pwdInputRef}
                        placeholder = "비밀번호를 입력하세요."
                        onSubmitEditing={()=>
                            idInputRef.current && idInputRef.current.focus()
                        }
                    />
                </View>
                <View style={styles.button}>
                    <Button title="Login" color="black" onPress={()=>{loginHandler();}}/>
                </View>
                <View>
                    <Button title="SignUp" color="black" onPress={()=>{props.navigation.navigate('SignUp'); clear();}}/>
                </View>
            </View>
        </View>
    ) : (
        <Loading/>
    );
};

export const screenOptions = () =>{
    return{
        headerShown: false
    };
};

const styles = StyleSheet.create({
    container:{
        marginBottom:7
    },
    centered:{
        flex:1,
        justifyContent:'center',
        alignContent:'center'
    },
    button:{
        borderRadius:10,
        marginBottom:3
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
        height:230,
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
    logo:{
        flex:0.5,
        justifyContent:'center',
        alignItems:'center',
    }
});

export default loginScreen;