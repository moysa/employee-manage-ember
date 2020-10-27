import Service from '@ember/service';
import config from 'employee-manager/config/environment';

export default class PersistanceService extends Service {
  data = []

  read() {
    if (config.environment === 'test') {
      return this.data;
    }
    else {
      return JSON.parse(localStorage.getItem(config.storageKey) || '[]');
    }
  }

  write(input) {
    if (config.environment === 'test') {
      return this.data = input;
    }
    else {
      return localStorage.setItem(config.storageKey, JSON.stringify(input));
    }
  }

  clear() {
    if (config.environment === 'test') {
      this.data = [];
    }
    else {
      localStorage.removeItem(config.storageKey);
    }
  }
}
