import React from "react";
import { View, Image, StyleSheet } from "react-native";

const MoveScreen = () =>{
    return(
        <View style={styles.center}>
            <Image source={require('../assets/loading-removebg-preview.png')}/>
        </View>
    );
};

const styles = StyleSheet.create({
    center:{
        flex: 1,
        justifyContent:'center',
        alignContent: 'center',
        alignItems:'center',
        height: "100%",
        width: "100%"
    }
});

export default MoveScreen;