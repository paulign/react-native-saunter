import React from 'react';
import { Constants } from 'expo';
import { createAppContainer, createStackNavigator } from "react-navigation";
import { View, Text, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import Home from "../screens/Home";
import AddPath from "../screens/AddPath";

const RootStack = createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: (navigation) => {
                return {
                    header: <Header
                        rightComponent={{ icon: 'add', component: TouchableOpacity, color: '#fff', onPress: () => navigation.navigation.navigate('AddPath') }}
                        centerComponent={{ text: 'Saunter', style: { color: '#fff', fontSize: 20 } }}
                        outerContainerStyles={{ paddingTop: Constants.statusBarHeight }}
                    />
                }
            }
        },
        AddPath: {
            screen: AddPath,
            navigationOptions: (navigation) => ({
                header: <Header
                    leftComponent={{ icon: 'chevron-left', component: TouchableOpacity, color: '#fff', onPress: () => navigation.navigation.goBack() }}
                    centerComponent={{ text: 'Add new path', style: { color: '#fff', fontSize: 20 } }}
                    outerContainerStyles={{ paddingTop: Constants.statusBarHeight }}
                />
            })
        },
    },
    {
        initialRouteName: "Home"
    }
);

export const RootNav = createAppContainer(RootStack);