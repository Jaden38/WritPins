// src/pinService.ts
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';

interface Pin {
  id?: string;
  title: string;
  text: string;
  userId: string;
}

const pinsCollection = collection(db, 'pins');

export const addPin = async (pin: Pin) => {
  await addDoc(pinsCollection, pin);
};

export const getPins = async (userId: string): Promise<Pin[]> => {
  const q = query(pinsCollection, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return { id: doc.id, title: data.title, text: data.text, userId: data.userId } as Pin;
  });
};

export const deletePin = async (pinId: string) => {
  await deleteDoc(doc(db, 'pins', pinId));
};
