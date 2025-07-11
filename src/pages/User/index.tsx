import { dbOperations } from '@/db/database';
import { baseInfo } from '@/db/baseInfo';
import { Button, Input, Modal } from 'antd';
import { FC, useEffect, useState } from 'react';
import store from '@/store';
import styles from './index.module.less';

type UserProps = {
  setPlayer: (player: Player) => void;
};

const User: FC<UserProps> = ({ setPlayer }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [playerUuid, setPlayerUuid] = useState<number | null>(null);

  const getPlayers = () => {
    dbOperations.getAll().then((players) => {
      setPlayers(players as Player[]);
    });
  };

  useEffect(() => {
    getPlayers();
  }, []);

  const createPlayer = () => {
    if (!name.trim()) return;
    if (playerUuid) {
      dbOperations.updateField(playerUuid, name.trim(), 'name').then(() => {
        getPlayers();
        setOpen(false);
        setName('');
      });
    } else {
      const baseData = baseInfo(name.trim());
      dbOperations.add(baseData).then(() => {
        getPlayers();
        setOpen(false);
        setName('');
      });
    }
  };

  const deletePlayer = (uuid: number) => {
    Modal.confirm({
      title: '确定删除该角色吗？',
      onOk: () => {
        dbOperations.delete(uuid).then(() => {
          getPlayers();
        });
      },
    });
  };

  return (
    <div className={styles.playerContainer}>
      <div className={styles.playerList}>
        {players.map((player) => (
          <div
            className={styles.playerItem}
            key={player.uuid}
            onClick={() => {
              store.uuid = player.uuid;
              localStorage.setItem('currentUuid', String(player.uuid));
              setPlayer(player);
            }}
          >
            <div className={styles.playerName}>{player.name}</div>
            <Button
              style={{ marginRight: 10, marginLeft: 'auto' }}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(true);
                setPlayerUuid(player.uuid);
                setName(player.name);
              }}
            >
              修改名称
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                deletePlayer(player.uuid);
              }}
            >
              删除
            </Button>
          </div>
        ))}
        <Button
          type="primary"
          onClick={() => {
            setPlayerUuid(null);
            setOpen(true);
          }}
        >
          创建
        </Button>
      </div>
      <Modal
        title={playerUuid ? '修改名称' : '创建角色'}
        open={open}
        onCancel={() => {
          setOpen(false);
          setName('');
        }}
        onOk={createPlayer}
        okButtonProps={{ disabled: !name.trim() }}
      >
        <div className={styles.playerCreate}>
          <Input
            placeholder="请输入角色名称"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default User;
