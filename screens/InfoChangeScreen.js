import React, { useEffect, useRef, useState, createRef } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Modal,
    Animated,
    TouchableWithoutFeedback,
    Dimensions,
    PanResponder,
    TextInput,
    Button,
    Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useRecoilState,useRecoilValue } from "recoil";
import { getToken } from "../store/getUserToken";
import { curTokenState } from '../store/setTokenstate';

const BottomSheet = props => {
    const [userPwd, setUserPwd] = useState("");
    const [userPwdCheck, setPwdCheck] = useState("");
    const [curToken, setCurToken] = useRecoilState(curTokenState);

    const pwdInputRef = createRef();
    const pwdchkInputRef = createRef();

    let userToken = useRecoilValue(getToken);

    const { modalVisible, setModalVisible } = props;
    const screenHeight = Dimensions.get("screen").height;
    const panY = useRef(new Animated.Value(screenHeight)).current;
    const translateY = panY.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 0, 1],
    });

    const resetBottomSheet = Animated.timing(panY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
    });

    const closeBottomSheet = Animated.timing(panY, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
    });

    const panResponders = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => false,
        onPanResponderMove: (event, gestureState) => {
            panY.setValue(gestureState.dy);
        },
        onPanResponderRelease: (event, gestureState) => {
            if (gestureState.dy > 0 && gestureState.vy > 1.5) {
                closeModal();
            }
            else {
                resetBottomSheet.start();
            }
        }
    })).current;

    const closeModal = () => {
        closeBottomSheet.start(() => {
            setModalVisible(false);
        })
    };

    const changePwd = props => {
        if(!userPwd){
            Alert.alert('비밀번호를 입력해주세요');
            return;
        }
        if (userPwd === userPwdCheck) {
            fetch(`http://119.203.225.3/user/user?newPassword=${userPwdCheck}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': userToken
                }
            }).then((response) => {
                let res = response.json();
                console.log(res);
                res.then((result) => {
                    setCurToken("change");
                })
            });
        }
        else{
            Alert.alert('비밀번호가 일치하지 않습니다.');
            return;
        }
    };
    useEffect(() => {
        if (props.modalVisible) {
            resetBottomSheet.start();
        }
    }, [props.modalVisible]);

    return (
        <Modal
            visible={modalVisible}
            animationType={"fade"}
            transparent
            statusBarTranslucent
        >
            <View style={styles.overlay}>
                <TouchableWithoutFeedback
                    onPress={closeModal}
                >
                    <View style={styles.background} />
                </TouchableWithoutFeedback>
                <Animated.View
                    style={{ ...styles.bottomSheetContainer, transform: [{ translateY: translateY }] }}
                    {...panResponders.panHandlers}
                >
                    <View style={styles.Input}>
                        <Text style={styles.title}>비밀번호 변경</Text>
                        <View style={styles.container}>
                            <TextInput
                                style={styles.input}
                                defaultValue="새로운 비밀번호"
                                onChangeText={(userPwd) => { setUserPwd(userPwd); }}
                                ref={pwdInputRef}
                                returnKeyType="next"
                            />
                            <TextInput
                                style={styles.input}
                                defaultValue="다시 입력해주세요."
                                onChangeText={(userPwdCheck) => { setPwdCheck(userPwdCheck); }}
                                ref={pwdInputRef}
                            />
                        </View>
                        <View style={styles.change}>
                            <Button title='변경' onPress={()=>{changePwd();}} />
                        </View>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.4)"
    },
    background: {
        flex: 1,
    },
    bottomSheetContainer: {
        height: 300,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginTop: 10
    },
    Input: {
        justifyContent: 'center',
        alignContent: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: "100%",
        margin: 20,
        width: "100%"
    },
    container: {
        width: "70%",
        height: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        marginLeft: 20
    },
    title: {
        fontSize: 30,
        top: 50,
        left: 10,
        position: 'absolute'
    },
    change: {
        right: 0,
        top: 165,
        position: 'absolute',
        width: '25%',
        height: 100
    }

})

export default BottomSheet;
