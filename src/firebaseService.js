import fb from './firebase'

export const listenForUpdates = (refName, cb) => {
  let myRef = fb
    .database()
    .ref(refName)
    .orderByKey()
    .limitToLast(100)

  myRef.on('child_added', cb)
}

export const pushToDatabase = (refName, data) => {
  const myRef = fb
    .database()
    .ref(refName)
    .push()
  myRef.set(data)
  // for some reason I can only use `set`
  // `push` seems to append to the last item in the collection
  console.log('view your new data at ', myRef.toString())
}
