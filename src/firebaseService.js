import fb from './firebase'

export const listenForUpdates = (refName, cb) => {
  let myRef = fb
    .database()
    .ref(refName)
    .orderByKey()

  myRef.on('child_added', cb)
  myRef.on('child_removed', cb)
}

export const pushToDatabase = (refName, data) => {
  const myRef = fb
    .database()
    .ref(refName)
    .push()
  // for some reason I can only use `set`
  // `push` seems to append to the last item in the collection
  console.log('view your new data at ', myRef.toString())
  return myRef.set(data)
}

export const removeFromDatabase = (refName, key) => {
  const myRef = fb.database().ref(refName)
  return myRef
    .child(key)
    .remove()
    .then(function() {
      console.log('Remove succeeded.')
    })
}
