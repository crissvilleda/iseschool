const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
const auth = admin.auth();

exports.addUser = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "Debes iniciar sesión para realizar esta acción."
    );
  }

  const displayName = `${data.name} ${data.lastName}`;
  const { isUpdating, password, email, id } = data;
  const body = data;
  const success = { msg: "success" };
  const authBody = {};
  if (password && password !== "") authBody.password = password;
  if (email && email !== "") authBody.email = email;
  authBody.displayName = displayName;

  //Parse date
  if (body.bornDate) {
    const date = body.bornDate;
    body.bornDate = new admin.firestore.Timestamp(
      date.seconds,
      date.nanoseconds
    );
  }

  delete body.password;
  delete body.isUpdating;
  delete body.id;

  if (isUpdating) {
    return auth
      .updateUser(id, authBody)
      .then((user) => {
        return db
          .collection("users")
          .doc(user.uid)
          .update(body)
          .then(() => success);
      })
      .catch((e) => {
        if (e && e.code === "auth/email-already-exists") {
          throw new functions.https.HttpsError(
            "already-exists",
            "Ya existe un usuario con el correo ingresado."
          );
        } else {
          console.log(e);
          throw new functions.https.HttpsError(
            "internal",
            "Error interno, por favor comunicarse con soporte técnico."
          );
        }
      });
  } else {
    return auth
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
          .then(() => success);
      })
      .catch((e) => {
        if (e && e.code === "auth/email-already-exists") {
          throw new functions.https.HttpsError(
            "already-exists",
            "Ya existe un usuario con el correo ingresado."
          );
        } else {
          console.log(e);
          throw new functions.https.HttpsError(
            "internal",
            "Error interno, por favor comunicarse con soporte técnico."
          );
        }
      });
  }
});
