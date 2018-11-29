import React, { Component } from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import firebase from '../firebaseConfig';
import MapElement from '../components/MapElement';
import { connect } from 'react-redux';
import { toggleFavoriteState, removePath } from '../actions';
import Loading from '../components/Loading';

class PathDetails extends Component {
    constructor(props) {
        super(props);

        const { params } = props.navigation.state;
        this.state = {
            id: params.id,
            selectedPath: null
        };
    }

    componentDidMount() {
        this.loadPath();
    }

    componentWillUnmount() {
        this.unsubscribeFromRef();
    }

    loadPath = () => {
        this.unsubscribeFromRef();
        const { id } = this.state;
        this.ref = firebase.database().ref(`walking_paths/${id}`);
        this.ref.on('value', this.onLoadPath);
    }

    onLoadPath = async (snapshot) => {
        try {
            const selectedPath = snapshot.val();
            await this.setState({ isLoading: false, selectedPath });
        } catch (error) {
            this.setState({ isLoading: false, selectedPath: null });
        }
    }

    unsubscribeFromRef = () => {
        if (this.ref) {
            this.ref.off('value', this.onLoadPath);
            this.ref = null;
        }
    }

    onToggleFavorite = () => {
        this.props.toggleFavoriteState(this.state.selectedPath);
    }

    onRemove = () => {
        const { navigation, removePath } = this.props;
        const { selectedPath } = this.state;
        removePath(selectedPath, navigation);
    }

    getDistance = () => {
        const { selectedPath } = this.state;
        if (selectedPath && selectedPath.distance) {
            let distance = selectedPath.distance;
            let valueType = distance > 1000 ? 'km' : 'm';
            let displayValue = distance > 1000 ? (distance / 1000).toFixed(2) : distance;

            return `${displayValue} ${valueType}`
        }
        return '0 m'
    }


    render() {
        const { selectedPath, isLoading } = this.state;
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                {selectedPath ? (
                    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 15, paddingTop: 0 }}>
                        <MapElement
                            style={{ height: 300, backgroundColor: '#ccc', marginHorizontal: -15, marginBottom: 10 }}
                            markers={selectedPath.path}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {!!selectedPath.favorite && (<Icon name="star" color="#2089dc" />)}
                            <Text h3>{selectedPath.title}</Text>
                        </View>
                        <Text>{selectedPath.full_description}</Text>
                        <View style={{ alignItems: "center", marginVertical: 5 }}>
                            <Icon name="map" />
                            <Text>{this.getDistance()}</Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.8} onPress={this.onRemove}>
                            <Text style={{ marginTop: 5, fontSize: 16, color: "#bd2130", textDecorationLine: 'underline' }}>Remove</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={this.onToggleFavorite}>
                            <Text style={{ marginTop: 5, fontSize: 16, color: "#2089dc", textDecorationLine: 'underline' }}>{!selectedPath.favorite ? "Add to favorites" : "Remove from favorites"}</Text>
                        </TouchableOpacity>
                    </ScrollView>
                ) : (
                        <Text style={{ textAlign: 'center' }}>Nothing to display...</Text>
                    )}
                <Loading visible={isLoading || this.props.isUpdating} />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isUpdating: state.paths.isUpdating
    }
}
export default connect(null, {
    toggleFavoriteState,
    removePath
})(PathDetails);