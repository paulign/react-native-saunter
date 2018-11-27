import React, { Component } from 'react';
import { View, Text, Keyboard, KeyboardAvoidingView } from 'react-native';
import { FormInput, FormLabel } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { reduxForm, Field } from 'redux-form';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            keyboardAvoidingViewKey: "keyboardAvoidingViewKey",
            keyboardVisible: false
        }
    }

    componentDidMount = () => {
        this.keyboardHideListener = Keyboard.addListener(
            "keyboardDidHide",
            this.keyboardHideListener
        );
        this.keyboardShowListener = Keyboard.addListener(
            "keyboardDidShow",
            this.keyboardShowListener
        );
    };

    componentWillUnmount() {
        this.keyboardHideListener.remove();
        this.keyboardShowListener.remove();
    }

    keyboardShowListener = () => {
        this.setState({ keyboardVisible: true });
    };

    keyboardHideListener = () => {
        this.setState({
            keyboardAvoidingViewKey: "keyboardAvoidingViewKey" + new Date().getTime(),
            keyboardVisible: false
        });
    };

    renderField = ({ input, label, meta, inputProps = {} }) => {
        console.log(input, label, inputProps);
        return (
            <View>
                <FormLabel labelStyle={{ marginLeft: 15, marginRight: 15 }} >{label}</FormLabel>
                <FormInput
                    inputStyle={{ color: "#4d4d4d", maxHeight: 100, minHeight: 35, borderBottomWidth: 2, borderColor: '#cccccc', paddingBottom: 5 }}
                    containerStyle={{ justifyContent: 'flex-start' }}
                    onChangeText={input.onChange}
                    onBlur={(e) => {
                        this.setState({ reviewFocused: false, keyboardVisible: false });
                        Keyboard.dismiss();
                        input.onBlur(e);
                    }}
                    onFocus={input.onFocus}
                    value={input.value}
                    {...inputProps}
                />
                {!!inputProps.maxLength ? (<Text style={{ marginTop: 5, color: '#4d4d4d', fontSize: 12, paddingHorizontal: 15, textAlign: 'right' }}>Limit {input.value.length} of {inputProps.maxLength}</Text>) : null}
            </View>
        );
    }

    render() {
        return (
            <KeyboardAwareScrollView key={ this.state.keyboardAvoidingViewKey} enableOnAndroid={true} contentContainerStyle={{paddingBottom: 20}} >
                {!this.state.keyboardVisible &&  <View style={{ height: 300, backgroundColor: '#ccc' }} />}
                <Field name="title" inputProps={{ placeholder: 'Enter title...' }} component={this.renderField} label="Title" />
                <Field name="short_description" inputProps={{ multiline: true, maxLength: 160, placeholder: 'Enter short description...' }} component={this.renderField} label="Short description" />
                <Field name="full_description" inputProps={{ multiline: true, placeholder: 'Enter full description...' }} component={this.renderField} label="Full description" />
            </KeyboardAwareScrollView>
        )
    }
}

export default reduxForm({ form: 'newPath' })(Home);
//export default Home