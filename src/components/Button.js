import React, {PropTypes} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Button = React.createClass({

  propTypes: {
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    style: PropTypes.number.isRequired,
    highlightStyle: PropTypes.number.isRequired
  },

  render() {

    if (this.props.icon !== '') {
      var icon = <Icon size={20} name={this.props.icon}/>;
    }

    return (
      <View style={this.props.style}>
        <TouchableHighlight
          onPress={this.props.onPress}
          style={this.props.highlightStyle}>
          <View style={styles.button}>
            <Text style={styles.text}>
              {this.props.text}
            </Text>
            {icon}
          </View>
        </TouchableHighlight>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    paddingHorizontal: 5,
    textAlign: 'center',
    fontSize: 20
  }
});

export default Button;
