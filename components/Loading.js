import React, { Component } from 'react';
import {ActivityIndicator, View} from 'react-native';

class Loading extends Component {
    render() {
        if(!this.props.visible) {
            return null;
        }
    
        return (
            <View style={{width: "100%", height: "100%", position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.4)'}}>
                <ActivityIndicator size="large" />
            </View>
        )
    }  
}

export default Loading