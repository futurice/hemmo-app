var options = {
  title: 'Valitse kuvake', // specify null or empty string to remove the title
  cancelButtonTitle: 'Peruuta',
  takePhotoButtonTitle: 'Ota valokuva...', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: 'Valitse galleriasta...',
  customButtons: {
    'Poista kuva': 'remove'
  },
  cameraType: 'back', // 'front' or 'back'
  mediaType: 'photo', // 'photo' or 'video'
  videoQuality: 'high', // 'low', 'medium', or 'high'
  durationLimit: 10, // video recording max time in seconds
  maxWidth: 100, // photos only
  maxHeight: 100, // photos only
  aspectX: 2, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  quality: 1, // 0 to 1, photos only
  angle: 0, // android only, photos only
  allowsEditing: false, // Built in functionality to resize/reposition the image after selection
  noData: false
};

module.exports = options;
