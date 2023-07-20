import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../config";
import { doc, setDoc } from "firebase/firestore";

export const registerDB = async ({ avatar, login, email, password }) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );

    await setDoc(doc(FIREBASE_DB, `user/${user.uid}`), {
      avatar,
      name: login,
      email,
      uid: user.uid,
    });

    await updateProfile(user, {
      displayName: login,
      photoURL: avatar,
    });

    return user;
  } catch (error) {
    const errorText = error.message.split("auth/")[1];
    const formatText = errorText.replace(/[()]/g, "");
    alert(formatText);
  }
};

export const loginDB = async ({ email, password }) => {
  try {
    const { user } = await signInWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );

    return user;
  } catch (error) {
    const errorText = error.message.split("auth/")[1];
    const formatText = errorText.replace(/[()]/g, "");
    alert(formatText);
  }
};


export const logOutApi = async () => {
    try {
    await FIREBASE_AUTH.signOut()
    } catch (error) { alert(error) }

}