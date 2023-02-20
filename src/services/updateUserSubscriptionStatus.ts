import firestore from '@react-native-firebase/firestore';

export async function updateUserSubscriptionStatus(userUid: string, value: boolean, setValidSubscriptionAction: (value: boolean) => void) {
  const userId = (await firestore()
    .collection('users')
    .where('userUid', '==', userUid)
    .limit(1)
    .get()).docs[0].id;
  await firestore()
    .collection('users')
    .doc(userId)
    .update({
      validSubscription: value,
    })
  setValidSubscriptionAction(value);
}