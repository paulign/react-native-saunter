import React, { Component } from 'react';
import { MapView } from 'expo';

const { Marker, Polyline } = MapView;


export default class MapElement extends Component {
    onDragEnd = (key, nativeEvent) => {
        const { onMarkerDragEnd } = this.props;
        if (onMarkerDragEnd) {
            onMarkerDragEnd(key, nativeEvent)
        }
    }

    onMapPress = ({ nativeEvent }) => {
        const { onMapPress } = this.props;
        if (onMapPress) {
            onMapPress(nativeEvent);
        }
    }

    render() {
        const { markers, onMarkerDragStart, editable, style, draggingMarker } = this.props;

        return (
            <MapView
                style={style}
                scrollEnabled={!draggingMarker}
                initialRegion={{
                    latitude: 50.447704,
                    longitude: 30.522050,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
                onPress={this.onMapPress}
            >
                {!!markers && !!markers.length ? markers.map((item, key) => (
                    <Marker
                        key={String(key)}
                        onDragStart={onMarkerDragStart}
                        onDragEnd={({nativeEvent}) => this.onDragEnd(key, nativeEvent)}
                        draggable={editable}
                        coordinate={{
                            latitude: item.lat,
                            longitude: item.lng
                        }}
                    />
                )) : null}
                {!!markers && markers.length > 1 ? (
                    <Polyline
                        coordinates={markers.map(item => {
                            return {
                                latitude: item.lat,
                                longitude: item.lng
                            }
                        })}
                        strokeColor="#FF0000"
                        strokeWidth={2}
                    />
                ) : null}
            </MapView>
        );
    }
}