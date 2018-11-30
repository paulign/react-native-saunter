import React, { Component } from "react";
import { View, Keyboard, StyleSheet } from "react-native";
import {
  FormInput,
  FormLabel,
  Button,
  Icon,
  Text
} from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { addMapMarker, createNewPath } from "../actions";
import geolib from "geolib";
import MapElement from "../components/MapElement";
import Loading from "../components/Loading";

class AddPath extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyboardAvoidingViewKey: "keyboardAvoidingViewKey",
      keyboardVisible: false
    };
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

  onAddMarker = latLng => {
    const path = [].concat(this.props.path);
    path.push(latLng);
    this.updatePath(path);
    this.setState({ addingMarker: false });
  };

  onMarkerDrag = (index, e) => {
    const { coordinate } = e;
    const path = [].concat(this.props.path);
    path[index] = { lat: coordinate.latitude, lng: coordinate.longitude };
    this.updatePath(path);
    this.setState({ draggingMarker: false });
  };

  getDistance = () => {
    const { distance } = this.props;
    let valueType = distance > 1000 ? "km" : "m";
    let displayValue =
      distance > 1000 ? (distance / 1000).toFixed(2) : distance;

    return `${displayValue} ${valueType}`;
  };

  updatePath = path => {
    const distance = geolib.getPathLength(path);
    this.props.addMapMarker({ path, distance });
  };

  onMapPress = e => {
    const { addingMarker } = this.state;
    const { coordinate } = e;

    if (addingMarker) {
      this.onAddMarker({ lat: coordinate.latitude, lng: coordinate.longitude });
    }
  };

  getDistance = () => {
    const { distance } = this.props;
    let valueType = distance > 1000 ? "km" : "m";
    let displayValue =
      distance > 1000 ? (distance / 1000).toFixed(2) : distance;

    return `${displayValue} ${valueType}`;
  };

  onSubmit = () => {
    const { navigation, createNewPath } = this.props;
    createNewPath(navigation);
  };

  renderField = ({ input, label, meta, inputProps = {} }) => {
    return (
      <View>
        <FormLabel labelStyle={styles.formLabel}>{label}</FormLabel>
        <FormInput
          inputStyle={[
            styles.inputStyle,
            meta.active ? styles.inputActive : null
          ]}
          containerStyle={styles.inputContainer}
          onChangeText={input.onChange}
          onBlur={e => {
            input.onBlur(e);
          }}
          onFocus={input.onFocus}
          value={input.value}
          {...inputProps}
        />
        {!!inputProps.maxLength ? (
          <Text style={styles.inputLimit}>
            Limit {input.value.length} of {inputProps.maxLength}
          </Text>
        ) : null}
      </View>
    );
  };

  renderMap = () => {
    const { path } = this.props;
    const { draggingMarker, keyboardVisible } = this.state;

    return (
      <View>
        <MapElement
          editable
          style={{ height: !keyboardVisible ? 300 : 100 }}
          onMarkerDragStart={() => this.setState({ draggingMarker: true })}
          onMarkerDragEnd={this.onMarkerDrag}
          markers={path}
          onMapPress={this.onMapPress}
          draggingMarker={draggingMarker}
        />
        {!!path && !!path.length && (
          <Text style={styles.mapHelp}>
            Long press on Marker to start drag it
          </Text>
        )}
        <Icon name="map" />
        <Text h4 style={styles.pathDistance}>
          {" "}
          Length {this.getDistance()}
        </Text>
      </View>
    );
  };

  renderForm = () => {
    return (
      <View>
        <Field
          name="title"
          inputProps={{ placeholder: "Enter title..." }}
          component={this.renderField}
          label="Title"
        />
        <Field
          name="short_description"
          inputProps={{
            multiline: true,
            maxLength: 160,
            placeholder: "Enter short description..."
          }}
          component={this.renderField}
          label="Short description"
        />
        <Field
          name="full_description"
          inputProps={{
            multiline: true,
            placeholder: "Enter full description..."
          }}
          component={this.renderField}
          label="Full description"
        />
        <Button
          disabled={!this.props.valid || !this.props.path.length}
          containerViewStyle={{ marginTop: 20 }}
          title="Submit"
          backgroundColor="#2089dc"
          onPress={this.onSubmit}
        />
      </View>
    );
  };

  render() {
    const { keyboardAvoidingViewKey, addingMarker } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          scrollEnabled={!this.setState.draggingMarker}
          key={keyboardAvoidingViewKey}
          keyboardShouldPersistTaps={"always"}
          enableOnAndroid={true}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {this.renderMap()}
          {this.renderForm()}
          <View style={styles.addMarkerWrapper}>
            <Button
              disabled={addingMarker}
              onPress={() => this.setState({ addingMarker: true })}
              containerViewStyle={{ backgroundColor: "transparent" }}
              raised
              rounded
              backgroundColor="#2089dc"
              title="Add marker"
            />
          </View>
        </KeyboardAwareScrollView>
        <Loading visible={this.props.isSubmitting} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const path =
    state.form.newPath && state.form.newPath.values
      ? state.form.newPath.values.path
      : [];
  const distance =
    state.form.newPath && state.form.newPath.values
      ? state.form.newPath.values.distance
      : 0;

  return {
    path: path || [],
    distance: distance || 0,
    isSubmitting: state.paths.isSubmitting
  };
};

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = "Required";
  }

  if (!values.short_description) {
    errors.short_description = "Required";
  }

  if (!values.full_description) {
    errors.full_description = "Required";
  }

  return errors;
};

export default connect(
  mapStateToProps,
  { addMapMarker, createNewPath }
)(reduxForm({ form: "newPath", validate })(AddPath));

const styles = StyleSheet.create({
  formLabel: {
    marginHorizontal: 15
  },
  inputStyle: {
    color: "#4d4d4d",
    maxHeight: 100,
    minHeight: 35,
    borderBottomWidth: 2,
    paddingBottom: 5,
    borderColor: "#cccccc"
  },
  inputActive: {
    borderColor: "#2089dc"
  },
  inputContainer: {
    justifyContent: "flex-start"
  },
  inputLimit: {
    marginTop: 5,
    color: "#4d4d4d",
    fontSize: 12,
    paddingHorizontal: 15,
    textAlign: "right"
  },
  mapHelp: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    color: "#4d4d4d"
  },
  pathDistance: {
    textAlign: "center",
    color: "#4d4d4d"
  },
  addMarkerWrapper: {
    backgroundColor: "transparent",
    position: "absolute",
    top: 10,
    alignSelf: "center"
  }
});
