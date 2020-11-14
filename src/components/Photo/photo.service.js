import * as firebase from "services";

const db = firebase.db.ref("/articles");

class PhotoService {
  storePhoto(file, uid) {
    const key = db.ref().child(uid).push().key;
    const img = firebase.storage.ref().child(uid).child(key);
    img.put(file).then((snap) => {
      db.ref().child(uid).child(key).set({
        url: snap.metadata.downloadURLs[0],
      });
    });
  }
}
export default new PhotoService();
