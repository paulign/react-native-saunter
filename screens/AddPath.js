import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormInput, FormLabel } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class Home extends Component {

    onChageField = (value, name) => {
        this.setState({

        });
    }

    renderField = ({ name, label, placeholder }) => {
        return (
            <View>
                <FormLabel labelStyle={{ marginLeft: 15, marginRight: 15 }} >{label}</FormLabel>
                <FormInput
                    inputStyle={{ color: "#4d4d4d", minHeight: 35 }}
                    containerStyle={{ borderBottomWidth: 2, borderColor: '#cccccc', justifyContent: 'flex-start', paddingBottom: 5 }}
                    placeholder={placeholder}
                />
            </View>
        );
    }

    render() {
        return (
            <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={10}>
                <FormLabel labelStyle={{ marginLeft: 15, marginRight: 15 }} >Title</FormLabel>
                <FormInput inputStyle={{ color: "#4d4d4d", minHeight: 35 }} containerStyle={{ borderBottomWidth: 2, borderColor: '#cccccc', justifyContent: 'flex-start', paddingBottom: 5 }} placeholder="Enter title..." />
                <FormLabel labelStyle={{ marginLeft: 15, marginRight: 15 }} >Short description</FormLabel>
                <FormInput multiline inputStyle={{ color: "#4d4d4d", minHeight: 35 }} containerStyle={{ borderBottomWidth: 2, borderColor: '#cccccc', justifyContent: 'flex-start', paddingBottom: 5 }} placeholder="Enter short description..." />
                <FormLabel labelStyle={{ marginLeft: 15, marginRight: 15 }} >Full description</FormLabel>
                <FormInput multiline inputStyle={{ color: "#4d4d4d", minHeight: 35 }} containerStyle={{ borderBottomWidth: 2, borderColor: '#cccccc', justifyContent: 'flex-start', paddingBottom: 5 }} placeholder="Enter full description..." />
            </KeyboardAwareScrollView>
        )
    }
}

export default Home;