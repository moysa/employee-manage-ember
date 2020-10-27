import Adapter from '@ember-data/adapter';
import { inject as service } from '@ember/service';

export default class ApplicationAdapter extends Adapter {
  @service persistance

  findAll() {
    return this.persistance.read()
  }

  findRecord(store, type, id) {
    const data = this.persistance.read()

    return data.find(datum => datum.id == id)
  }

  createRecord(store, type, snapshot) {
    const record = this.serialize(snapshot, { includeId: true }).data;

    const data = this.persistance.read()

    record.id = data.length + 1

    const newDatum = { ...record.attributes, id: record.id }

    this.persistance.write([...data, newDatum])

    return record
  }

  deleteRecord(store, type, snapshot) {
    const record = this.serialize(snapshot, { includeId: true }).data;
    const id = snapshot.id

    const data = this.persistance.read()

    const newData = data.filter(employee => employee.id != id)

    this.persistance.write(newData)

    return record
  }

  updateRecord(store, type, snapshot) {
    let record = this.serialize(snapshot, { includeId: true }).data;
    const { id, attributes } = record;

    const data = this.persistance.read()

    const newData = data.map(d => d.id == id ? { ...attributes, id } : d);

    this.persistance.write(newData)

    return record;
  }

  query(store, type, { page, perPage }) {
    const all = this.persistance.read()

    const start = (page - 1) * perPage
    const end = start + perPage

    const data = all.slice(start, end)

    return data
  }
}
