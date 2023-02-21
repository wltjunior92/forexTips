import firestore from '@react-native-firebase/firestore';

import { ISignal } from 'src/interfaces/ISignal';

type Props = {
  setSignalsAction: (value: ISignal[]) => void;
  setIsLoadingAction: (value: boolean) => void;
}

export async function fetchSubscribedUserSignals({ setSignalsAction, setIsLoadingAction }: Props) {
  try {
    const currentDay = new Date();
    const daysBefore = new Date(new Date().setDate(currentDay.getDate() - 10));

    const startDate = firestore.Timestamp.fromDate(daysBefore)
    const subscribe = firestore()
      .collection('signals')
      .orderBy('createdAt', 'desc')
      .where('createdAt', '>', startDate)
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => {
          return ({
            id: doc.id,
            ...doc.data(),
          })
        }) as ISignal[];

        const sortByStatus = data.sort((a, b) => {
          if (a.status === 'ativo' && b.status !== 'ativo') {
            return -1;
          } else if (a.status !== 'ativo' && b.status === 'ativo') {
            return 1;
          }
          return 0;
        })

        setSignalsAction(sortByStatus);
      });

    return () => subscribe();
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoadingAction(false);
  }
}