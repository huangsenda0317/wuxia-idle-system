import { items } from '@/constants/items';
import { formatNumber } from './formatNumber';
import styles from './index.module.less';
import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { QiaoFuList, toastColor } from '@/constants';
import store from '@/store';

interface MessageProps {
  content: React.ReactNode;
  duration?: number;
  onClose?: () => void;
}

interface MessageItem extends MessageProps {
  id: string;
  key?: string;
}

interface ItemInfo {
  name: string;
  id: number;
  cd: number;
  quality: number;
  description: string;
  xp: number;
  [key: string]: any;
}

let messageContainer: HTMLDivElement | null = null;
let root: ReturnType<typeof createRoot> | null = null;
const messages: Map<string, MessageItem> = new Map();

// Toast 组件
const Toast: React.FC<MessageProps> = ({ content, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return <>{content}</>;
};

// 创建容器
const createMessageContainer = () => {
  const container = document.createElement('div');
  container.className = styles.messageContainer;
  document.body.appendChild(container);
  root = createRoot(container);
  return container;
};

// 显示消息的方法
export const showMessage = (
  key: keyof typeof items,
  add: number,
  sum: number,
  duration?: number,
) => {
  if (!messageContainer) {
    messageContainer = createMessageContainer();
  }

  const itemInfo = QiaoFuList.find((i: ItemInfo) => i.name === key);
  const borderColor = toastColor[store.page as keyof typeof toastColor];

  const messageItem: MessageItem = {
    id: String(Date.now()),
    key: key,
    content: (
      <div
        className={styles.messageContent}
        style={
          {
            '--border-color': borderColor,
            '--bg-color': `${borderColor}80`, // 80 是十六进制的0.5
          } as React.CSSProperties
        }
      >
        <img className={styles.messageContentImg} src={itemInfo?.itemImg} alt={itemInfo?.name} />
        <span className={styles.messageContentAdd}>
          +{formatNumber(add)} {itemInfo?.name}
        </span>
        <span className={styles.messageContentSum}>({formatNumber(sum)})</span>
      </div>
    ),
    duration,
    onClose: () => {
      messages.delete(key);
      render();
    },
  };

  // 如果已存在相同key的消息，先移除它
  if (messages.has(key)) {
    messages.delete(key);
  }

  // 添加新消息
  messages.set(key, messageItem);
  render();
};

// 渲染所有消息
const render = () => {
  if (!root) return;

  root.render(
    <>
      {Array.from(messages.values()).map((msg) => {
        return <Toast {...msg} />;
      })}
    </>,
  );
};
