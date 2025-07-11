// 数据类型定义
export interface UserInfo {
  id?: number;
  name: string;
  level: number;
  exp: number;
  created_at: Date;
}

export interface Item {
  id?: number;
  name: string;
  type: string;
  quality: number;
  owner_id: number;
  properties?: Record<string, any>;
}
