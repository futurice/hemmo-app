const PushNotification = require('react-native-push-notification');

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: token => {},

  // (required) Called when a remote or local notification is opened or received
  onNotification: notification => {},

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   */
  requestPermissions: true,
});

export default PushNotification;
