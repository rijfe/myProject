import React from "react";
import { View, StyleSheet, Text } from "react-native";

const CoinList = ({title, value}) =>{
    return(
        <View>
            <Text>{title}</Text>
            <Text>{value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default CoinList;