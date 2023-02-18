import firestore from '@react-native-firebase/firestore';

import { ISignal } from 'src/interfaces/ISignal';

type Props = {
  setSignalsAction: (value: ISignal[]) => void;
  setIsLoadingAction: (value: boolean) => void;
  daysToSearch: string;
}

export async function fetchSubscribedUserSignals({ setSignalsAction, setIsLoadingAction, daysToSearch }: Props) {
  try {
    const currentDay = new Date();
    const dayBefore = new Date(new Date().setDate(currentDay.getDate() - parseInt(daysToSearch)));

    const startDate = firestore.Timestamp.fromDate(dayBefore)
    const subscribe = firestore()
      .collection('signals')
      .orderBy('createdAt', 'asc')
      .where('createdAt', '>', startDate)
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as ISignal[];

        const sortByStatus = data.sort(signal => {
          if (signal.status === 'ativo')
            return -1;
          return 1

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