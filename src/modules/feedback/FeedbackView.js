// import React, {PropTypes} from 'react';
// import {Map} from 'immutable';
// import Hemmo from '../../components/Hemmo';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import * as UserState from '../../modules/user/UserState';
// import * as NavigationState from '../../modules/navigation/NavigationState';
//
// // NOTE: NOT USED AT THE MOMENT
//
// import {
//   Text,
//   TextInput,
//   Alert,
//   TouchableHighlight,
//   View
// } from 'react-native';
//
// var styles = require('./styles.js');
// var activities = require('../activity/activities.js');
// var actionPanel;
// var buttonPanel;
//
// //TODO: Separate rendering to smaller components.
//
// const FeedbackView = React.createClass({
//
//   propTypes: {
//     answers: PropTypes.instanceOf(Map),
//     dispatch: PropTypes.func.isRequired,
//     // navigationState: PropTypes.object
//   },
//
//   getInitialState() {
//     return {
//       enableWriting: false
//     };
//   },
//
//   enableWriting() {
//     this.setState({enableWriting: true});
//   },
//
//   disableWriting() {
//     this.setState({enableWriting: false});
//   },
//
//   // TODO: How to get textInput value without having to save the value to state onChange?
//   saveText() {
//     Alert.alert('Hei!', 'Tallennetaan teksti');
//   },
//
//   vote(vote) {
//     this.props.dispatch(UserState.saveAnswer('Thumb', vote));
//     var layout = Map({
//       showTitle: true,
//       voteThumbs: false});
//     this.props.dispatch(NavigationState.pushRoute({key: 'Feedback', pageLayout: layout}));
//   },
//
//   renderTitlePanel() {
//     var i = this.props.answers.get('MainActivity');
//     var j = this.props.answers.get('SubActivity');
//     return (
//       <View style={styles.titleRow}>
//         <Text style={styles.mainTitle}>{activities[i].get('key')}</Text>
//         <Text style={styles.subtitle}>{activities[i].get('subActivities').get(j)}</Text>
//       </View>
//     );
//   },
//
//   renderThumbButtons() {
//     var thumbs = [];
//     var icons = [{icon: 'thumbs-up'}, {icon: 'meh-o'}, {icon: 'thumbs-down'}];
//
//     for (var i = 0; i <= 2; i++) {
//       thumbs.push(
//         <View key={i}>
//           <Icon
//             onPress={this.vote.bind(this, i)}
//             name={icons[i].icon}
//             size={100}
//             style={styles.voteButton}/>
//         </View>
//       );
//     }
//     return thumbs;
//   },
//
//   renderButtonPanel(icon, text, onPress) {
//     var saveOrWriteButton = this.renderButton(
//       styles.writeButton, styles.writeButtonHighlight,
//       onPress, text, icon);
//
//     var skipButton = this.renderButton(
//       styles.skipButton, styles.skipButtonHighlight,
//       this.enableWriting, 'Ohita', 'angle-right');
//
//     return (
//       <View style={styles.extraRow}>
//         {saveOrWriteButton}
//         {skipButton}
//       </View>
//     );
//   },
//
//   renderButton(style, highlightStyle, onPress, text, icon) {
//     return (
//       <View style={style}>
//         <TouchableHighlight
//           onPress={onPress}
//           style={highlightStyle}>
//           <View style={styles.button}>
//             <Text style={styles.text}>
//               {text}
//             </Text>
//             <Icon size={20} name={icon}/>
//           </View>
//         </TouchableHighlight>
//       </View>
//     );
//   },
//
//   renderWritingPanel() {
//     return (
//       <View style={styles.writingContainer}>
//         <View style={styles.textInput}>
//           <TextInput
//             multiline = {true}
//             numberOfLines = {30}
//             maxLength = {150}
//             underlineColorAndroid = 'transparent'
//             style={styles.textForm}/>
//         </View>
//         <Icon onPress={this.disableWriting} name='times-circle' size={40} style={styles.closeButton}/>
//
//       </View>
//     );
//   },
//
//   render() {
//
//     var pageLayout = this.props.navigationState.children[index].pageLayout;
//
//     // Check if the view is related to selected activities. If not
//     // and the user is giving feedback regarding something else, the activity title is not displayed
//     if (pageLayout.showTitle === true) {
//     var titlePanel = this.renderTitlePanel();
//     }
//
//     if (pageLayout.voteThumbs === true) {
//       var thumbs = this.renderThumbButtons();
//       actionPanel = (
//         <View style={styles.actionRow}>
//           {thumbs}
//         </View>
//       );
//       buttonPanel = null;
//     }
//     else {
//       actionPanel = (
//         <View style={styles.actionRow}>
//           <Text>Recording voice</Text>
//         </View>
//       );
//       // Check if the writing view should be displayed
//       if (this.state.enableWriting === true) {
//         var writingView = this.renderWritingPanel();
//         buttonPanel = this.renderButtonPanel('save', 'Tallenna', this.saveText);
//       }
//       else {
//         buttonPanel = this.renderButtonPanel('pencil', 'Kirjoita', this.enableWriting);
//       }
//     }
//
//     return (
//       <View style={styles.container}>
//         <View style={styles.leftColumn}>
//           {titlePanel}
//           {actionPanel}
//         </View>
//         <View style={styles.rightColumn}>
//           <View style={styles.hemmoRow}>
//             <Hemmo x={40} y={40}/>
//           </View>
//           {buttonPanel}
//         </View>
//         {writingView}
//       </View>
//     );
//   }
// });
//
// export default FeedbackView;
