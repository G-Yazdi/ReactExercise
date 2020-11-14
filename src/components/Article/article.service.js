import * as firebase from "services";

const db = firebase.db.ref("/articles");

class ArticleService {
  getAll() {
    return db;
  }

  get(id) {
    return db.child(id);
  }

  create(article) {
    const myRef = db.push();
    const key = myRef.key;
    const img = firebase.storage.ref().child(key);
    img.put(article.image[0]).then((snap) => {
      snap.ref.getDownloadURL().then((url) => {
        db.child(key).set({
          imageUrl: url,
          title: article.title,
          body: article.body,
          id: key,
        });
      });
    });
    return myRef;
  }
  updateImage(key, image) {
    const img = firebase.storage.ref().child(key);
    return img.put(image);
  }
  update(key, article) {
    return db.child(key).update(article);
  }

  delete(key) {
    return db.child(key).delete();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new ArticleService();
