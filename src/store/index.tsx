import { proxy } from 'valtio';
import { dbOperations } from '@/db/database';
import { get } from 'lodash';
// import { showMessage } from '@/utils/message';
interface DatabaseState {
  page: string;
  uuid: number;
  database: {
    [key: string]: {
      items: {
        [key: string]: number;
      };
    };
  } | null;
  activeTimers: { [key: string]: NodeJS.Timeout };
}

const store = proxy<DatabaseState>({
  page: '集市',
  uuid: Number(localStorage.getItem('currentUuid')) || 0,
  database: null,
  activeTimers: {},
});

export const actions = {
  changePage: (page: string) => {
    store.page = page;
  },
  // 更新数据库
  updateDatabase: async () => {
    const data = await dbOperations.get(store.uuid);
    store.database = data as DatabaseState['database'];
  },

  // 更新字段
  updateField: async (value: any, ...fields: string[]) => {
    await dbOperations.updateField(store.uuid, value, ...fields);
    await actions.updateDatabase(); // 更新后刷新数据
  },

  // 增加数量
  updateFieldAddNum: async (number: number, ...fields: string[]) => {
    await dbOperations.updateFieldAddNum(store.uuid, number, ...fields);
    await actions.updateDatabase(); // 更新后刷新数据
    const item = fields[fields.length - 1];
    const num = get(store.database, fields, 0);
    // showMessage(item, number, num);
  },
};

export default store;
