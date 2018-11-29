import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
class Home extends Component {

    getDistance = (distance) => {
        let valueType = distance > 1000 ? 'km' : 'm';
        let displayValue = distance > 1000 ? (distance / 1000).toFixed(2) : distance;

        return `${displayValue} ${valueType}`
    }

    renderItem = ({ item }) => {
        console.log(item);
        return (
            <ListItem
                leftIcon={{ style: { marginRight: 10 }, name: "zoom-out-map" }}
                title={item.title}
                subtitle={item.short_description}
                rightTitle={this.getDistance(item.distance)}
            />
        )
    }
    render() {
        console.log(this.props.pathsList)
        return (
            <View style={{ flex: 1 }}>

                <List>
                    <FlatList
                        data={this.props.pathsList}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id}
                    />
                </List>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        pathsList: state.paths.pathsList
    }
}

export default connect(mapStateToProps)(Home);