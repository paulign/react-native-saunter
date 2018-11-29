import React, { Component } from 'react';
import {View} from 'react-native';
import { RootNav } from './navigation';
import firebase from './firebaseConfig';
import Loading from './components/Loading';
import { connect } from 'react-redux';
import { onLoadPaths } from './actions';

class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    componentDidMount() {
        this.initScreen();
    }

    componentWillUnmount() {
        if (this.ref) {
            this.ref.off(this.onLoadPaths);
        }
    }

    initScreen = () => {
        try {
            this.ref = firebase.database().ref('walking_paths');
            this.ref.on('value', this.onLoadPaths);
        } catch (error) {
            this.setState({ isLoading: false });
        }
    }

    onLoadPaths = async snapshot => {
        try {
            let list = [];
            if (snapshot.exists()) {
                list = Object.values(snapshot.val());
                list = list.sort((a, b) => {
                    if (a.favorite && !b.favorite) {
                        return -1;
                    } else if (b.favorite && !a.favorite) {
                        return 1;
                    }
                    return 0;
                });
            }
            this.props.onLoadPaths(list);
            this.setState({isLoading: false});
            // this.filterList();
        } catch (error) {
            console.log(error);
            this.setState({ isLoading: false });
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1}}>
                    <Loading visible={true} />
                </View>
            )
        }
        return (
            <RootNav />
        )
    }
}

export default connect(null, { onLoadPaths })(AppContainer);