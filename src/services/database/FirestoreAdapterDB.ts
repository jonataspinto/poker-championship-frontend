import {
  collection,
  getDocs,
  getDoc,
  updateDoc,
  addDoc,
  doc,
  where,
  query,
  getFirestore,
  deleteDoc
} from "firebase/firestore/lite";
import { firebaseClient } from "../clients/firebaseClient";

const DATABASE = getFirestore(firebaseClient);

const basePath = "/root_collection/document";

export class FirestoreAdapterDB<T, DTO> implements IDBProvider<T, DTO> {
  private path: string;

  constructor(reference: string) {
    this.path = reference;
  }

  async save(data: T): Promise<DTO> {
    const newData = await addDoc(
      collection(DATABASE, `${basePath}/${this.path}`),
      data as Record<string, unknown>
    );

    const response = await getDoc(newData).then((snapshot) => ({
      ...(snapshot.data() as DTO),
      id: snapshot.id
    }));

    return response as DTO;
  }

  async getAll(
    key: string = "",
    queryParam: string | number | Array<unknown> = ""
  ) {
    const list: DTO[] = [];

    let collectionQuery;

    if (key && queryParam) {
      const isQueryArray = Array.isArray(queryParam);

      collectionQuery = query(
        collection(DATABASE, `${basePath}/${this.path}`),
        where(`${key}`, isQueryArray ? "array-contains-any" : "==", queryParam)
      );
    } else {
      collectionQuery = query(collection(DATABASE, `${basePath}/${this.path}`));
    }

    const collectionSnapshot = await getDocs(collectionQuery);

    collectionSnapshot.forEach((snapshot) => {
      list.push({
        ...(snapshot.data() as DTO),
        id: snapshot.id,
        createdAt: snapshot.data()?.createdAt?.toDate?.(),
        updatedAt: snapshot.data()?.updatedAt?.toDate?.()
      });
    });

    return list;
  }

  async getById(id: string) {
    const docRef = doc(DATABASE, `${basePath}/${this.path}`, id);

    const docSnap = await getDoc(docRef).then((snapshot) => {
      return {
        ...(snapshot.data() as DTO),
        id: snapshot.id,
        createdAt: snapshot.data()?.createdAt?.toDate?.(),
        updatedAt: snapshot.data()?.updatedAt?.toDate?.()
      };
    });

    return docSnap as DTO;
  }

  async getByEmail(email: string) {
    const list: DTO[] = [];

    const collectionQuery = query(
      collection(DATABASE, `${basePath}/${this.path}`),
      where(`email`, "==", email)
    );

    const collectionSnapshot = await getDocs(collectionQuery);

    collectionSnapshot.forEach((snapshot) => {
      list.push({
        ...(snapshot.data() as DTO),
        id: snapshot.id,
        createdAt: snapshot.data().createdAt?.toDate(),
        updatedAt: snapshot.data().updatedAt?.toDate()
      });
    });

    return list[0];
  }

  async update(id: string, newData: T) {
    const docRef = doc(DATABASE, `${basePath}/${this.path}`, id);

    const docSnap = await updateDoc(
      docRef,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      newData as Record<string, any>
    ).then(() =>
      getDoc(docRef).then((snapshot) => ({
        ...(snapshot.data() as DTO),
        id: snapshot.id,
        createdAt: snapshot.data()?.createdAt?.toDate(),
        updatedAt: snapshot.data()?.updatedAt?.toDate()
      }))
    );

    return docSnap;
  }

  async delete(id: string) {
    const docRef = doc(DATABASE, `${basePath}/${this.path}`, id);

    await deleteDoc(docRef);

    return id;
  }
}
