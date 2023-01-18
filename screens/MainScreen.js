import React, { useEffect, useState } from "react";
import { View, Text, Button, SafeAreaView, FlatList, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useRecoilState } from "recoil";

import HeaderButton from "../component/UI/HeaderButton";

import MoveScreen from "./MoveScreen";
import CoinList from "../component/UI/CoinList";

import Colors from "../Constant/Colors";
import { nameState } from "../store/getUserInfo";
import { tokenState } from "../store/getUserToken";
import { getIdState } from "../store/getId";

import AsyncStorage from "@react-native-async-storage/async-storage";

const MainScreen = (props) => {
    const [token, setToken] = useRecoilState(tokenState);
    const [name, setName] = useRecoilState(nameState);
    const [id, setId] = useRecoilState(getIdState);
    const [loading, setLoading] = useState(false);
    const [coin, setCoin] = useState({});

    let str;
    const getInfo = () =>{
        const t = AsyncStorage.getItem('info');
        t.then((result)=>{
            const p = JSON.parse(result);
            str = p.result.accessToken;
            setToken(str);
        });
    };

    const data = [
        {
            value:'0',
            title: 'HBC',
        },
        {
          value:'0',
          title: 'TEST',
        }
      ];

    const getData = async() =>{
        await fetch("http://119.203.225.3/user/user",{
            method:'GET',
            headers:{
                'Authorization':token
            }
        }).then((reponse)=>{
            let resData = reponse.json();
            resData.then((result)=>{
                setCoin(result.coin);
                setName(result.owner);
                setId(result.identifier);
                setLoading(true);
            });
        });
        
    };

    useEffect(()=>{
        getInfo();

        setTimeout(() => {
            getData();
        }, 1000);
    },[])

    console.log(data);

    return loading ? (
        <SafeAreaView  style={styles.container}>
            <FlatList
                data={data}
                renderItem={({item})=>
                    <CoinList
                        title={item.title}
                        value={item.value}
                    />
                }
                keyExtractor={item => item.title}
            />
        </SafeAreaView>
    ) : (
        <MoveScreen/>
    );
};


export const screenOptions = props =>{
    
    return{
        headerTitle:"Coin",
        headerLeft:()=>{

        },
        headerRight:()=>(
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='logout' iconName={'ios-log-out'} onPress={()=>{
                    props.navigation.pop();
                    AsyncStorage.removeItem('info');
                }}/>
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    container:{
        flex:1
    }
});

export default MainScreen;