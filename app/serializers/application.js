import JSONAPISerializer from '@ember-data/serializer/json-api';
import { camelize } from '@ember/string';


export default class ApplicationSerializer extends JSONAPISerializer {

  keyForAttribute(attr) {
    return camelize(attr);
  }

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {

    const assignRecord = data => {
      const { id: dataId, ...rest } = data

      return {
        type: primaryModelClass.modelName,
        id: dataId,
        attributes: { ...rest }
      }
    }

    const response = {
      data: Array.isArray(payload) ?
        payload.map(p => assignRecord(p)) :
        assignRecord(payload),
    }

    return super.normalizeResponse(
      store,
      primaryModelClass,
      response,
      id,
      requestType
    );
  }
}
