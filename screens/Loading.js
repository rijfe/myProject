import React from "react";
import { View, Image, StyleSheet } from "react-native";

const Loading = () =>{
    return(
        <View style={styles.center}>
            <Image source={require('../assets/logo-removebg-preview.png')}/>
        </View>
    );
};

const styles = StyleSheet.create({
    center: {
        justifyContent:'center',
        alignContent: 'center',
        alignItems:'center',
        flex: 1
    }
});

export default Loading;