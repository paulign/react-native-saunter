import React, { Component } from "react";
import { MapView } from "expo";
import { colors } from "../colors";
import geolib from "geolib";

const { Marker, Polyline } = MapView;

export default class MapElement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: { latitude: 50.447704, longitude: 30.52205 }
    };
  }

  componentDidMount() {
    let center = { latitude: 50.447704, longitude: 30.52205 };

    if (this.props.markers && this.props.markers.length) {
      const _center = geolib.getCenter([].concat(this.props.markers));
      center["latitude"] = +_center.latitude;
      center["longitude"] = +_center.longitude;
    }
    this.setState({ center });
  }
  onDragEnd = (key, nativeEvent) => {
    const { onMarkerDragEnd } = this.props;
    if (onMarkerDragEnd) {
      onMarkerDragEnd(key, nativeEvent);
    }
  };

  onMapPress = ({ nativeEvent }) => {
    const { onMapPress } = this.props;
    if (onMapPress) {
      onMapPress(nativeEvent);
    }
  };

  render() {
    const {
      markers,
      onMarkerDragStart,
      editable,
      style,
      draggingMarker
    } = this.props;
    const { center } = this.state;

    return (
      <MapView
        style={style}
        scrollEnabled={!draggingMarker}
        initialRegion={{
          ...center,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        onPress={this.onMapPress}
      >
        {!!markers && !!markers.length
          ? markers.map((item, key) => (
              <Marker
                key={String(key)}
                onDragStart={onMarkerDragStart}
                onDragEnd={({ nativeEvent }) =>
                  this.onDragEnd(key, nativeEvent)
                }
                draggable={editable}
                coordinate={{
                  latitude: item.lat,
                  longitude: item.lng
                }}
              />
            ))
          : null}
        {!!markers && markers.length > 1 ? (
          <Polyline
            coordinates={markers.map(item => {
              return {
                latitude: item.lat,
                longitude: item.lng
              };
            })}
            strokeColor={colors.red}
            strokeWidth={2}
          />
        ) : null}
      </MapView>
    );
  }
}
