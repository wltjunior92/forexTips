import firestore from '@react-native-firebase/firestore';


export async function createNewUserRegister(userUid: string, userName: string) {
  await firestore()
    .collection('users')
    .add({
      userUid,
      isAdmin: false,
      userName,
      createdAt: firestore.FieldValue.serverTimestamp(),
    })
}