import { Messages } from '@/store/slices/AccountInformationSlice';

interface User {
  id: number;
  user_hash: string;
  first_name: string | null;
  last_name: string | null;
  direct_id: number | null;
  phone_number: number | null;
  last_message: Messages | null;
}

export function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('UserDB', 1);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore('users', { keyPath: 'id' });
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveOrGetUser(userId: number, userData?: Partial<Omit<User, 'id' | 'user_hash'>>): Promise<User> {
  if (!userId) {
    console.log('null');
    // throw new Error('User ID is null or undefined.');
  }

  const db = await openDatabase();
  const transaction = db.transaction('users', 'readwrite');
  const store = transaction.objectStore('users');

  return new Promise((resolve, reject) => {
    const getRequest = store.get(userId);

    getRequest.onsuccess = () => {
      const existingUser = getRequest.result as User;

      if (existingUser) {
        // به‌روزرسانی اطلاعات کاربر موجود
        const updatedUser: User = {
          ...existingUser,
          ...userData,
        };

        const putRequest = store.put(updatedUser);

        putRequest.onsuccess = () => resolve(updatedUser);
        putRequest.onerror = () => reject(putRequest.error);
      } else {
        // ساخت اطلاعات کاربر جدید
        const newUser: User = {
          id: userId,
          user_hash: crypto.randomUUID(),
          first_name: userData?.first_name ?? null,
          last_name: userData?.last_name ?? null,
          direct_id: userData?.direct_id ?? null,
          phone_number: userData?.phone_number ?? null,
          last_message: userData?.last_message ?? null,
        };

        const addRequest = store.add(newUser);

        addRequest.onsuccess = () => resolve(newUser);
        addRequest.onerror = () => reject(addRequest.error);
      }
    };

    getRequest.onerror = () => reject(getRequest.error);
  });
}
