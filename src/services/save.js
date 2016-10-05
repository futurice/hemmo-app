
import {put, post, xhr} from '../utils/api';

var activities = require('../data/activities.js');

export async function save(attachmentPath, attachmentType, body) {
  var attachmentQuestion;

  try {
    var result = await post('/content', body);

    if (attachmentType === 'audio') {
      var contentId = result.contentId;
      var attachmentBody = new FormData();
      var file = {
        uri: `file://${attachmentPath}`,
        type: 'audio/mp4',
        name: 'file'
      };
      attachmentBody.append('file', file);

      try {
        var attachmentResult = await xhr('PUT', '/attachment/' + contentId, attachmentBody);

        var parsedResult = JSON.parse(attachmentResult);
        body.questions.push({question: attachmentQuestion, attachmentId: parsedResult.attachmentId});

        try {
          var updateResult = await put('/content/' + contentId, body);
          return {success: true};
        }
        catch (e) {
          return {success: false};
        }
      }
      catch (e) {
        return {success: false};
      }
    }
    else {
      return {success: true};
    }
  }
  catch (e) {
    return {success: false};
  }
}

export async function formRequestBody(phase, attachmentType, text, activityIndex, answers) {
  var questions = [];
  var moods = [];
  var body = {questions};
  var attachmentQuestion;

  if (phase === 'activities' || (phase === 'other' && activityIndex !== -1)) {
    questions = getActivities(activityIndex, answers);
    attachmentQuestion = 'Mikä siitä jäi mieleen?';
    body = {questions};
  }
  else if (phase === 'moods') {
    moods = getMoods(answers);
    attachmentQuestion = 'Miksi sinusta tuntui siltä?';
    body = {moods, questions};
  }
  else if (phase === 'general') {
    attachmentQuestion = 'Onko sinulla jotain muuta kerrottavaa?';
    body = {questions};
  }

  if (attachmentType === 'text') {
    body.questions.push({question: attachmentQuestion, answer: text});
  }
  else if (attachmentType === 'skipped') {
    body.questions.push({question: attachmentQuestion, answer: 'Ohitettu'});
  }

  return body;
}

export function getActivities(activityIndex, answers) {
  var questions = [];
  var curr = activityIndex;
  var mainIndex = answers.getIn(['activities', curr, 'main']);
  var subIndex = answers.getIn(['activities', curr, 'sub']);

  if (mainIndex !== null) {
    var main = activities[mainIndex].get('key');
    var sub = activities[mainIndex].getIn(['subActivities', subIndex, 'name']);
    var like = answers.getIn(['activities', curr, 'thumb']);

    if (main) {
      questions.push({question: 'Mitä teitte?', answer: main});
    }
    if (sub) {
      questions.push({question: 'Mitä teitte (tarkemmin)?', answer: sub});
    }
    if (like !== null) {
      questions.push({question: 'Millaista se oli?', like});
    }
  }
  else {
    questions.push({question: 'Mitä teitte', answer: 'Muuta'});
  }

  return questions;
}

export function getMoods(answers) {
  var moods = answers.get('moods');
  return moods;
}
