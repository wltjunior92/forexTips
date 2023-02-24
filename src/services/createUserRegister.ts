import firestore from '@react-native-firebase/firestore';
import Purchases from 'react-native-purchases';

export async function createNewUserRegister(userUid: string, userName: string, userEmail: string) {
  console.log('Configuring new User on Firebase')
  await firestore()
    .collection('users')
    .add({
      userUid,
      isAdmin: false,
      userName,
      userEmail,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
  console.log('Configuring new User Revenue Cat')
  await Purchases.logIn(userUid);
}