import dayjs from 'dayjs';

// 数据库配置
const DB_NAME = 'wuxiaIdle';
const DB_VERSION = 1;

// 表名称常量
export const STORES = {
  PLAYER: 'player',
} as const;

// 数据库连接实例
let db: IDBDatabase | null = null;

// 初始化数据库
export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => {
      reject(new Error('数据库打开失败'));
    };
    request.onsuccess = (event) => {
      db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };
    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;
      // 创建用户信息表
      if (!database.objectStoreNames.contains(STORES.PLAYER)) {
        const playerStore = database.createObjectStore(STORES.PLAYER, {
          keyPath: 'uuid', // 主键
          autoIncrement: true, // 自增
        });
        playerStore.createIndex('uuid', 'uuid', { unique: true }); // 创建索引
        // playerStore.createIndex("name", "name", { unique: false }); // 创建索引
        // playerStore.createIndex("lv", "lv", { unique: false }); // 创建索引
        // playerStore.createIndex("exp", "exp", { unique: false }); // 创建索引
        // playerStore.createIndex("created_at", "created_at", { unique: false }); // 创建索引
        // playerStore.createIndex("updated_at", "updated_at", { unique: false }); // 创建索引
      }
    };
  });
};

/**
 * 获取对象中嵌套字段的值
 * @param obj 目标对象
 * @param fields 字段路径数组
 * @returns 字段值或undefined（如果路径不存在）
 */
const getNestedField = (obj: any, fields: string[]) => {
  let current = obj;
  for (const field of fields) {
    if (current === null || current === undefined || !(field in current)) {
      return undefined;
    }
    current = current[field];
  }
  return current;
};

/**
 * 更新指定对象的嵌套字段值
 * @param obj 要更新的对象
 * @param value 新值
 * @param fields 字段路径数组
 */
const updateNestedField = (obj: any, value: any, fields: string[]) => {
  let current = obj;
  for (let i = 0; i < fields.length - 1; i++) {
    if (!(fields[i] in current)) {
      current[fields[i]] = {};
    }
    current = current[fields[i]];
  }
  current[fields[fields.length - 1]] = value;
};

// 基本的数据库操作方法
export const dbOperations = {
  // 添加数据
  add: <T>(data: T): Promise<IDBValidKey> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(new Error('数据库未初始化'));
        return;
      }
      const transaction = db.transaction(STORES.PLAYER, 'readwrite');
      const store = transaction.objectStore(STORES.PLAYER);
      const request = store.add(data);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  // 获取数据
  get: <T>(id: IDBValidKey): Promise<T> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(new Error('数据库未初始化'));
        return;
      }
      const transaction = db.transaction(STORES.PLAYER, 'readonly');
      const store = transaction.objectStore(STORES.PLAYER);
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  /**
   * 获取指定记录的嵌套字段值
   * @param id 用户ID
   * @param ...fields 字段路径
   * @returns 字段值
   */
  getField: async (id: IDBValidKey, ...fields: string[]): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        throw new Error('数据库未初始化');
      }
      try {
        const transaction = db.transaction(STORES.PLAYER, 'readonly');
        const store = transaction.objectStore(STORES.PLAYER);
        const request = store.get(id);
        request.onsuccess = () => {
          const data = request.result;
          if (!data) {
            resolve(undefined);
            return;
          }
          // 如果没有指定字段路径，返回整个对象
          if (fields.length === 0) {
            resolve(data);
            return;
          }
          // 获取嵌套字段值
          const value = getNestedField(data, fields);
          resolve(value);
        };
        request.onerror = () => reject(request.error);
      } catch (error) {
        reject(error);
      }
    });
  },

  // 更新数据
  update: <T>(data: T): Promise<IDBValidKey> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(new Error('数据库未初始化'));
        return;
      }
      const transaction = db.transaction(STORES.PLAYER, 'readwrite');
      const store = transaction.objectStore(STORES.PLAYER);
      const request = store.put(data);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  /**
   * 更新指定记录的嵌套字段值
   * @param id 用户ID
   * @param value 新值
   * @param ...fields 字段路径
   */
  updateField: async (id: IDBValidKey, value: any, ...fields: string[]): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        throw new Error('数据库未初始化');
      }
      try {
        const transaction = db.transaction(STORES.PLAYER, 'readwrite');
        const store = transaction.objectStore(STORES.PLAYER);
        // 先获取原有数据
        const getRequest = store.get(id);
        getRequest.onsuccess = () => {
          const data = getRequest.result;
          if (!data) {
            reject(new Error('未找到指定记录'));
            return;
          }
          // 更新嵌套字段
          updateNestedField(data, value, fields);
          // 更新时间戳
          data.updated_at = dayjs().format('YYYY-MM-DD HH:mm:ss');
          // 保存更新后的数据
          const updateRequest = store.put(data);
          updateRequest.onsuccess = () => resolve();
          updateRequest.onerror = () => reject(updateRequest.error);
        };
        getRequest.onerror = () => reject(getRequest.error);
      } catch (error) {
        reject(error);
      }
    });
  },

  updateFieldAddNum: async (
    id: IDBValidKey,
    number: number,
    ...fields: string[]
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(new Error('数据库未初始化'));
        return;
      }
      try {
        const transaction = db.transaction(STORES.PLAYER, 'readwrite');
        const store = transaction.objectStore(STORES.PLAYER);
        const request = store.get(id);
        request.onsuccess = () => {
          const data = request.result;
          if (!data) {
            reject(new Error('未找到指定记录'));
            return;
          }
          // data中找到对应fields的值
          const value = getNestedField(data, fields);
          // 更新嵌套字段
          updateNestedField(data, value + number, fields);
          // 更新时间戳
          data.updated_at = dayjs().format('YYYY-MM-DD HH:mm:ss');
          // 保存更新后的数据
          const updateRequest = store.put(data);
          updateRequest.onsuccess = () => resolve();
          updateRequest.onerror = () => reject(updateRequest.error);
        };
        request.onerror = () => reject(request.error);
      } catch (error) {
        reject(error);
      }
    });
  },

  // 删除数据
  delete: (id: IDBValidKey): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(new Error('数据库未初始化'));
        return;
      }
      const transaction = db.transaction(STORES.PLAYER, 'readwrite');
      const store = transaction.objectStore(STORES.PLAYER);
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  },

  // 获取所有数据
  getAll: <T>(): Promise<T[]> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(new Error('数据库未初始化'));
        return;
      }
      const transaction = db.transaction(STORES.PLAYER, 'readonly');
      const store = transaction.objectStore(STORES.PLAYER);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },
};
