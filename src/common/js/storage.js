import storage from "good-storage"

const SELLER_KEY = '__seller__'

// @example
 // var __seller__ = {
  //   "id:2":{
  //     "favorite":false,
  //     "isMoney":true
  //   }
  // }

export function saveToLocal(id, key, val) {
  let obj = storage.get(SELLER_KEY, {})
  if (!obj[id]) {
    obj[id] = {}
  }
  obj[id][key] = val
  storage.set(SELLER_KEY, obj)
}

export function readToLocal(id, key, def) {
  let obj = storage.get(SELLER_KEY, {})
  if (!obj[id]) {
    return def
  }
  return obj[id][key] || def
}