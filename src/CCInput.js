import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewPropTypes,
  Platform
} from "react-native";
import TextInput from 'react-native-textinput-with-icons';
import {
  widthPercentageToDP as width,
  heightPercentageToDP as height,
} from 'react-native-responsive-screen';

export default class CCInput extends Component {
  static propTypes = {
    field: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    keyboardType: PropTypes.string,

    status: PropTypes.oneOf(["valid", "invalid", "incomplete"]),

    containerStyle: ViewPropTypes.style,
    inputStyle: Text.propTypes.style,
    labelStyle: Text.propTypes.style,
    validColor: PropTypes.string,
    invalidColor: PropTypes.string,
    placeholderColor: PropTypes.string,

    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    onBecomeEmpty: PropTypes.func,
    onBecomeValid: PropTypes.func,
    additionalInputProps: PropTypes.shape(TextInput.propTypes),
  };

  static defaultProps = {
    label: "",
    value: "",
    status: "incomplete",
    containerStyle: {},
    inputStyle: {},
    labelStyle: {},
    onFocus: () => { },
    onChange: () => { },
    onBecomeEmpty: () => { },
    onBecomeValid: () => { },
    additionalInputProps: {},
  };

  componentWillReceiveProps = newProps => {
    const { status, value, onBecomeEmpty, onBecomeValid, field } = this.props;
    const { status: newStatus, value: newValue } = newProps;

    if (value !== "" && newValue === "") onBecomeEmpty(field);
    if (status !== "valid" && newStatus === "valid") onBecomeValid(field);
  };

  _onFocus = () => this.props.onFocus(this.props.field);
  _onChange = value => this.props.onChange(this.props.field, value);

  render() {
    const { label, value, placeholder, status, keyboardType,
      validColor, invalidColor,
      additionalInputProps } = this.props;
    return (
      <TextInput
        {...additionalInputProps}
        keyboardType={keyboardType}
        returnKeyType="next"
        autoCapitalise="words"
        autoCorrect={false}
        labelActiveColor={'#929292'}
        fontSize={height('2.8%')}
        labelActiveTop={-height('4%')}
        paddingBottom={4}
        underlineActiveHeight={2}
        labelFontSize={height('2.1%')}
        containerMaxWidth={'100%'}
        secureTextEntry={false}
        underlineColor={'#DDDDDD'}
        labelColor={'#929292'}
        placeholderColor={'#8A8A8A'}
        marginBottom={12}
        marginTop={12}
        labelTextStyle={{
          fontFamily: Platform.OS === 'ios' ? 'SFProDisplay-Light' : 'SF-Pro-Display-Light',
        }}
        textColor={'#333333'}
        label={label}
        rippleColor="transparent"
        refrance={this.refs.input}
        value={value}
        onFocus={this._onFocus}
        onChangeText={this._onChange}
        style={[
          ((validColor && status === "valid") ? { color: validColor } :
            (invalidColor && status === "invalid") ? { color: invalidColor } :
              {}),
        ]}
      />
    );
  }
}
