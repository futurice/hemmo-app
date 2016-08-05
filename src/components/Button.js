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
      var icon = <Icon size={25} name={this.props.icon}/>;
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
    // padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15
  }
});

export default Button;
