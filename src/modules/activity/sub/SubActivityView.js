import React, {PropTypes} from 'react';
import {Map} from 'immutable';
import * as NavigationState from '../../../modules/navigation/NavigationState';
import * as UserState from '../../../modules/user/UserState';
import {getSizeByHeight, getSizeByWidth, getImage} from '../../../services/graphics';
import Hemmo from '../../../components/Hemmo';

import {
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Text
} from 'react-native';

var styles = require('./subStyles.js');

const SubActivityView = React.createClass({

  propTypes: {
    chosenMainActivity: PropTypes.instanceOf(Map),
    dispatch: PropTypes.func.isRequired,
    closeSubActivities: PropTypes.func.isRequired,
    activityIndex: PropTypes.number.isRequired,
    restartAudioAndText: PropTypes.func
  },

  restartAudioAndText() {
    this.props.restartAudioAndText();
  },

  closeSubActivities() {
    this.props.closeSubActivities();
  },

  chooseActivity(subActivity, subIndex) {
    this.props.dispatch(
      UserState.saveAnswer(this.props.activityIndex, 'sub', subIndex)
    );

    if (subActivity === 'Muuta') {
      this.props.dispatch(NavigationState.pushRoute({key: 'Record', allowReturn: true}));
    }
    else {
      this.props.dispatch(NavigationState.pushRoute({key: 'Thumbs', allowReturn: true}));
    }
  },

  render() {
    var n = this.props.chosenMainActivity.get('subActivities').size;
    var ratio;
    var margin;

    if (n < 8) {
      ratio = 0.27; margin = 10;
    }
    else {ratio = 0.23;}

    const subActivityViews = this.props.chosenMainActivity.get('subActivities').map((subActivity, index) => (
      <View
        key={subActivity}
        style={styles.activityBlock}>
          <TouchableHighlight
            style={{borderRadius: getSizeByWidth('ympyra_keski', ratio).height / 2}}
            onPress={this.chooseActivity.bind(this, subActivity, index)}>
            <Image
              source={getImage('ympyra_keski')}
              style={[styles.activityCircle, getSizeByHeight('ympyra_keski', ratio)]}>
                  <Text style={styles.activityFont}>
                    {subActivity}
                  </Text>
            </Image>
          </TouchableHighlight>
      </View>
    ));

    return (
      <View style={styles.container}>
      <Image
        source={getImage('tausta_levea')}
        style={[styles.subActivityContainer, getSizeByWidth('tausta_levea', 0.98)]}>
          <View style={styles.titleBar}>
            <Text style={styles.title}>{this.props.chosenMainActivity.get('key')}</Text>
          </View>
          <View style={styles.activityBar}>
            <View style={[styles.subActivities, {marginHorizontal: margin}]}>
              {subActivityViews}
            </View>
            <View style={styles.hemmo}>
              <Hemmo image={'hemmo_keski'} size={0.5} restartAudioAndText={this.restartAudioAndText}/>
            </View>
          </View>
          <TouchableOpacity
            onPress={this.closeSubActivities}
            style={[styles.closeButton, getSizeByHeight('nappula_rasti', 0.1)]}>
              <Image
                source={getImage('nappula_rasti')}
                onPress={this.closeSubActivities}
                style={[getSizeByHeight('nappula_rasti', 0.1)]}/>
          </TouchableOpacity>
      </Image>
      </View>
    );
  }
});

export default SubActivityView;
