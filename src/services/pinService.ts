// src/pinService.ts
import { collection, addDoc, getDocs, query, where, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '.././firebaseConfig';
import { Pin } from '.././interfaces/Pin';

const pinsCollection = collection(db, 'pins');

export const addPin = async (pin: Pin) => {
  const newPin = {
    ...pin,
    createdAt: new Date().toISOString()
  };
  await addDoc(pinsCollection, newPin);
};

export const getPins = async (userId: string): Promise<Pin[]> => {
  const q = query(pinsCollection, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return { 
      id: doc.id, 
      title: data.title, 
      text: data.text, 
      userId: data.userId, 
      tags: data.tags,
      source: data.source,
      createdAt: data.createdAt,
      public: data.public
    } as Pin;
  });
};

export const getPublicPins = async (): Promise<Pin[]> => {
  const q = query(pinsCollection, where('public', '==', true));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return { 
      id: doc.id, 
      title: data.title, 
      text: data.text, 
      userId: data.userId, 
      tags: data.tags,
      source: data.source,
      createdAt: data.createdAt,
      public: data.public
    } as Pin;
  });
};

export const getPin = async (id: string): Promise<Pin | null> => {
  const docRef = doc(db, 'pins', id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Pin : null;
};

export const updatePin = async (pin: Pin) => {
  const docRef = doc(db, 'pins', pin.id!);
  await updateDoc(docRef, pin as any);
};

export const deletePin = async (pinId: string) => {
  const pinDoc = doc(db, 'pins', pinId);
  await deleteDoc(pinDoc);
};
