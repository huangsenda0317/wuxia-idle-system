type Player = {
  uuid: number;
  name: string;
  lv: number;
  exp: number;
  created_at: string;
  updated_at: string;
};

type CardInfo = {
  id: number;
  name: string;
  cd: number;
  quality: number;
  growthArea: string;
  description: string;
  count: number;
};

// 在一个新文件，如 src/types/index.ts 中定义
type TaskName =
  | 'qiaoFu'
  | 'anQu'
  | 'jiShi'
  | 'zhuangBei'
  | 'jingMai'
  | 'zhanDou'
  | 'tiaoZhan'
  | 'tiGuan';

interface TaskInfo {
  name: TaskName;
  item: CardInfo;
}

// 修改 WxContentProps 中的 setTask 类型
interface WxContentProps {
  selectedKeys: string[];
  database: Database;
  setTask: (selected: boolean, name: TaskName, item: CardInfo) => void;
  currentTask: TaskInfo | null;
}

// 数据库项目类型
interface DatabaseItem {
  items: {
    [key: string]: number;
  };
}

interface Database {
  [key: string]: {
    items: {
      [key: string]: number;
    };
  };
}

// 添加一个通用的页面 Props 类型
interface CommonPageProps {
  database: Database;
  setTask: (selected: boolean, name: string, item: any) => (() => void) | undefined;
  currentTask: TaskInfo | null;
  isMobile: boolean;
}
