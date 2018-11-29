import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { List, ListItem, SearchBar, Text, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { onFilterList } from '../actions';
class Home extends Component {

    getDistance = (distance) => {
        let valueType = distance > 1000 ? 'km' : 'm';
        let displayValue = distance > 1000 ? (distance / 1000).toFixed(2) : distance;

        return `${displayValue} ${valueType}`
    }

    activeSearch = null;

    onChangeFilterQuery = (filterQuery) => {
        if (this.activeSearch) {
            clearTimeout(this.activeSearch);
            this.activeSearch = null;
        }
        const callback = () => {
            this.props.onFilterList(filterQuery);
        }

        this.activeSearch = setTimeout(callback, 1000);
    }

    renderItem = ({ item }) => {
        console.log(item);
        return (
            <ListItem
                leftIcon={{ style: { marginRight: 10 }, name: "zoom-out-map" }}
                title={<View style={{flexDirection: 'row', alignItems: 'center'}}>{!!item.favorite && <Icon size={14} style={{marginRight: 5}} name="star" color="#2089dc" />}<Text>{item.title}</Text></View>}
                subtitle={item.short_description}
                rightTitle={this.getDistance(item.distance)}
            />
        )
    }
    render() {
        const { filteredList, pathsList, onFilterList } = this.props;
        const list = filteredList ? filteredList : pathsList;

        return (
            <View style={{ flex: 1 }}>
                <SearchBar
                    containerStyle={{ backgroundColor: '#fff' }}
                    lightTheme
                    onChangeText={this.onChangeFilterQuery}
                    onClearText={() => onFilterList()}
                    placeholder='Search...' />
                <List containerStyle={{flexGrow: 1, paddingBottom: 60}}>
                    <FlatList
                        contentContainerStyle={{ flexGrow: 1 }}
                        data={list}
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
        pathsList: state.paths.pathsList,
        filteredList: state.paths.filteredList
    }
}

export default connect(mapStateToProps, { onFilterList })(Home);