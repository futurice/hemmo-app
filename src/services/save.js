
import { put, post, xhr } from '../utils/api';

const activities = require('../data/activities.js');

export async function save(attachmentPath, attachmentType, body) {
  let attachmentQuestion;

  try {
    const result = await post('/content', body);

    if (attachmentType === 'audio') {
      const contentId = result.contentId;
      const attachmentBody = new FormData();
      const file = {
        uri: `file://${attachmentPath}`,
        type: 'audio/mp4',
        name: 'file',
      };
      attachmentBody.append('file', file);

      try {
        const attachmentResult = await xhr('PUT', `/attachment/${contentId}`, attachmentBody);

        const parsedResult = JSON.parse(attachmentResult);
        body.questions.push({ question: attachmentQuestion, attachmentId: parsedResult.attachmentId });

        try {
          const updateResult = await put(`/content/${contentId}`, body);
          return { success: true };
        } catch (e) {
          return { success: false };
        }
      } catch (e) {
        return { success: false };
      }
    } else {
      return { success: true };
    }
  } catch (e) {
    return { success: false };
  }
}

export async function formRequestBody(phase, attachmentType, text, activityIndex, answers) {
  let questions = [];
  let moods = [];
  let body = { questions };
  let attachmentQuestion;

  if (phase === 'activities' || (phase === 'other' && activityIndex !== -1)) {
    questions = getActivities(activityIndex, answers);
    attachmentQuestion = 'Mikä siitä jäi mieleen?';
    body = { questions };
  } else if (phase === 'moods') {
    moods = getMoods(answers);
    attachmentQuestion = 'Miksi sinusta tuntui siltä?';
    body = { moods, questions };
  } else if (phase === 'general') {
    attachmentQuestion = 'Onko sinulla jotain muuta kerrottavaa?';
    body = { questions };
  }

  if (attachmentType === 'text') {
    body.questions.push({ question: attachmentQuestion, answer: text });
  } else if (attachmentType === 'skipped') {
    body.questions.push({ question: attachmentQuestion, answer: 'Ohitettu' });
  }

  return body;
}

export function getActivities(activityIndex, answers) {
  const questions = [];
  const curr = activityIndex;
  const mainIndex = answers.getIn(['activities', curr, 'main']);
  const subIndex = answers.getIn(['activities', curr, 'sub']);

  if (mainIndex !== null) {
    const main = activities[mainIndex].get('key');
    const sub = activities[mainIndex].getIn(['subActivities', subIndex, 'name']);
    const like = answers.getIn(['activities', curr, 'thumb']);

    if (main) {
      questions.push({ question: 'Mitä teitte?', answer: main });
    }
    if (sub) {
      questions.push({ question: 'Mitä teitte (tarkemmin)?', answer: sub });
    }
    if (like !== null) {
      questions.push({ question: 'Millaista se oli?', like });
    }
  } else {
    questions.push({ question: 'Mitä teitte', answer: 'Muuta' });
  }

  return questions;
}

export function getMoods(answers) {
  const moods = answers.get('moods');
  return moods;
}
