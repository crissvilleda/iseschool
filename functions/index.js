const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
const auth = admin.auth();

exports.addUser = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called " + "while authenticated."
    );
  }

  return new Promise((resolve, reject) => {
    const displayName = `${data.name} ${data.lastName}`;
    const { isUpdating, password, email, id } = data;
    const body = data;
    const success = { msg: "success" };

    delete body.password;
    delete body.isUpdating;

    if (isUpdating) {
      auth
        .updateUser(id, {
          email: email,
          password: password,
          displayName: displayName,
        })
        .then((user) => {
          return db
            .collection("users")
            .doc(user.uid)
            .update(body)
            .then(() => resolve(success));
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        });
    } else {
      console.log("creando usuario");
      auth
        .createUser({
          email: email,
          password: password,
          displayName: displayName,
        })
        .then((user) => {
          return db
            .collection("users")
            .doc(user.uid)
            .set(body)
            .then(() => resolve(success));
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        });
    }
  });
});
