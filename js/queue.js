'use strict'

// map processing states
const PxState = {
  UNKNOWN: 0,
  ADDED: 1
}

// FIFO queue that ignores duplicates and keeps timestamp of its last push
class Queue{
  pushedCount = 0
  addedCount = 0
  _lastInsert = 0
  _store = []

  constructor(size){
    if (!size)
      throw new Exception(`Invalid queue size ${size}`)

    this._map = []
    for (let i = 0; i < size; i++){
      this._map[i] = PxState.UNKNOWN
    }
  }

  push(val){
    this.pushedCount++
    const idx = val / 4
    switch(this._map[idx]){
      case PxState.UNKNOWN:
        this._store.push(val)
        this._map[idx] = PxState.ADDED
        this.addedCount++
        this._lastInsert = Date.now()
        break
      default:
        break
    }
  }

  shift(){
    return this._store.shift()
  }

  get lastInsert(){
    return this._lastInsert
  }

  get stats(){
    return {
      pushed: this.pushedCount,
      added: this.addedCount
    }
  }
}
