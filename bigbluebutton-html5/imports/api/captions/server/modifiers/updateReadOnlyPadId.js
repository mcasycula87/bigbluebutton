import Captions from '/imports/api/captions';
import Logger from '/imports/startup/server/logger';
import { check } from 'meteor/check';
import addPad from '/imports/api/captions/server/methods/addPad';

export default function updateReadOnlyPadId(padId, readOnlyPadId) {
  check(padId, String);
  check(readOnlyPadId, String);

  const selector = {
    padId,
  };

  const modifier = {
    $set: {
      readOnlyPadId,
    },
  };

  try {
    const numberAffected = Captions.update(selector, modifier, { multi: true });

    if (numberAffected) {
      addPad(padId, readOnlyPadId);
      Logger.verbose('Captions: added readOnlyPadId', { padId, readOnlyPadId });
    }
  } catch (err) {
    Logger.error('Captions: error when adding readOnlyPadId', { err });
  }
}
