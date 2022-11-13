import React from "react";
import { View, Button, StyleSheet, KeyboardAvoidingView, SafeAreaView } from "react-native";

import Input from "../component/Input";
import Colors from "../Constant/Colors";

const loginScreen = props =>{
    return(
        <View style={styles.centered}>
            <View>
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
                            id = "Password"
                            label = "Password"
                            keyboardType = "default"
                            required
                            autoCapitalize="none"
                            errorMessage = "is not correct"
                            onInputChange= {()=>{}}
                            initialValue=""
                        />  
                        <View style={styles.button}>
                            <Button title="Login" onPress={()=>{props.navigation.navigate('tab')}}/>
                        </View>
                        <View style={styles.button}>
                            <Button title="SiguUp" onPress={()=>{props.navigation.navigate("SignUp")}}/>
                        </View>
                    </SafeAreaView>
                </KeyboardAvoidingView>
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
        flex:1,
        borderTopLeftRadius: 10, // to provide rounded corners
        borderTopRightRadius: 10, // to provide rounded corners
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
        shadowColor: 'black',
        shadowOpacity:0.26,
        shadowOffset: {width: 0, height:2},
        shadowRadius:8,
        elevation:5,
        borderRadius:10,
        backgroundColor:'white',
        height:230,
        margin:20
    }
});

export default loginScreen;