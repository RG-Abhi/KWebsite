import { EventEmitter } from 'events'

export const dataEvents = new EventEmitter()
dataEvents.setMaxListeners(100)

export function notifyDataChanged(meta = {}) {
  dataEvents.emit('change', { ts: Date.now(), ...meta })
}
