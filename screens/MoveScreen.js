import React, { useEffect } from "react";
import { View, Image, StyleSheet, Animated } from "react-native";

const MoveScreen = () => {
    const spinValue = new Animated.Value(0);

    useEffect(() => {
        Animated.timing(
            spinValue,
            {
                toValue: 1,
                duration: 3000,
                // easing: Easing.linear, 
                useNativeDriver: true
            }
        ).start();
    }, [spinValue]);

    // First set up animation 

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    return (
        <Animated.View style={styles.center}>
            <Animated.Image
                style={{ transform: [{ rotate: spin }] }}
                source={require('../assets/loading-removebg-preview.png')}
            />
        </Animated.View>

    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: "100%"
    }
});

export default MoveScreen;