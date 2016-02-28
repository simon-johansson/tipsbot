
import nodeValidator from 'node-validator';

const childrenObjects = nodeValidator.isObject()
  .withRequired('heading', nodeValidator.isString())
  .withRequired('details', nodeValidator.isString());

const JSON_TIPS_FORMAT = nodeValidator.isArray(childrenObjects);

export default (json) => {
  return new Promise((resolve, reject) => {
    nodeValidator.run(JSON_TIPS_FORMAT, json, (errorCount, errors) => {
      if (errorCount) reject(errors)
      else resolve();
    });
  });
};
