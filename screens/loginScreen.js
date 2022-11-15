import React,{useState, createRef} from "react";
import { View, Button, StyleSheet, Text, TextInput, Image } from "react-native";

const loginScreen = props =>{
    const [userPwd, setUserPwd] = useState("");
    const [userStdId, setUserStdId] = useState("");

    const pwdInputRef = createRef();
    const idInputRef = createRef();

    return(
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
                        onSubmitEditing={()=>
                            idInputRef.current && idInputRef.current.focus()
                        }
                    />
                </View>
                <View style={styles.button}>
                    <Button title="Login" onPress={()=>{props.navigation.navigate('tab')}}/>
                </View>
                <View>
                    <Button title="SignUp" onPress={()=>{props.navigation.navigate('SignUp')}}/>
                </View>
            </View>
        </View>
        
    );
};

export const screenOptions = navData =>{
    return{
        headerTitle:'Login',
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