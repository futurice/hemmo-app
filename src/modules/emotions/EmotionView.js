import React, {PropTypes} from 'react';
import {Map, List} from 'immutable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Hemmo from '../../components/Hemmo';
import {
  StyleSheet,
  Text,
  Alert,
  TouchableHighlight,
  View
} from 'react-native';

var emotions = require('./emotions.js');
var checkedEmotions = [];

const EmotionView = React.createClass({

  propTypes: {

  },

  getInitialState() {
    return {
      checkedEmotions: List()
    };
  },

  checkEmotion(emotion) {
    Alert.alert('CHECKED ', 'Checked ' + emotion);
    var uncheck = false;

    for (var j = 0; j < this.state.checkedEmotions.size; j++) {
      console.log('Verrataan ' + emotion + ' ja ' + this.state.checkedEmotions.get(j));
      if (emotion === this.state.checkedEmotions.get(j)) {
        console.log('Oli jo raksittu');
        var tmp = this.state.checkedEmotions.slice();
        console.log('tmp ' + tmp);
        tmp = tmp.filter(function deleteRoute(item) { return item !== emotion; });
        console.log('tmp jälkeen ' + tmp);
        this.setState({checkedEmotions: tmp});

        console.log('poiston jälkeen ' + this.state.checkedEmotions);
        uncheck = true;
      }
    }
    if (uncheck === false) {
      console.log('lisätään');
      this.setState({checkedEmotions: this.state.checkedEmotions.concat(emotion)});
    }
  },

  render() {

    var emotionViews = [];
    console.log('All the checked emotions ' + this.state.checkedEmotions);
    console.log('emotions length ' + emotions.length);
    console.log('checked length ' + this.state.checkedEmotions.size);

    for (var i = 0; i < emotions.length; i++) {
      var checked = null;
      for (var j = 0; j < this.state.checkedEmotions.size; j++) {
        console.log('emotions' + emotions[i]);
        console.log('checkedEmotions j ' + this.state.checkedEmotions.get(j));
        if (emotions[i] === this.state.checkedEmotions.get(j)) {
          checked = <Icon name={'check'} size={25} style={styles.check}/>;
        }
      }
      emotionViews.push(<View key={emotions[i]} style={styles.emotion}>
        <TouchableHighlight style={styles.highlight} onPress={this.checkEmotion.bind(this, emotions[i])}>
          <Text>
            {emotions[i]}
          </Text>
        </TouchableHighlight>
        {checked}
      </View>);
    }

    return (
      <View style={styles.container}>
        <View style={styles.emotionColumn}>
          {emotionViews}
        </View>
        <View style={styles.hemmoColumn}>
          <Hemmo x={0} y={80}/>
        </View>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  emotionColumn: {
    flex: 4,
    paddingVertical: 20,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  check: {
    position: 'absolute',
    top: 0,
    right: 10
  },
  hemmoColumn: {
    flex: 1,
    justifyContent: 'center'
  },
  emotion: {
    borderWidth: 1,
    backgroundColor: 'rgba(180, 180, 180, 0.66)',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    height: 100,
    width: 100
  },
  highlight: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    height: 100,
    width: 100
  }
});

export default EmotionView;
