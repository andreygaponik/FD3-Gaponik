import React, { useEffect, useState } from 'react';
import mobileEvents from '../events';
import { produce } from 'immer';

import User from './User';
import AddUser from './AddUser';

const initialState = [
  {
    id: crypto.randomUUID(),
    lastname: 'Иванов',
    firstname: 'Иван',
    surname: 'Иванович',
    balance: 200,
  },
  {
    id: crypto.randomUUID(),
    lastname: 'Григорьев',
    firstname: 'Григорий',
    surname: 'Григорьевич',
    balance: -220,
  },
];

const MobileHook = () => {
  const [users, setUsers] = useState([...initialState]);
  const [filter, setFilter] = useState('all');
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [edittingUserId, setEdittingUserId] = useState(null);

  const emitFilterUsers = (filter) => {
    mobileEvents.emit('FILTER_USERS', filter);
  };

  const emitShowAddUser = (isShow) => {
    mobileEvents.emit('TOGGLE_ADDING_USER', isShow);
  };

  const toggleAddingUser = (isShow) => {
    setIsAddingUser(isShow);
  };

  const onFilterUsers = (filter) => {
    setFilter(filter);
  };

  const onDeleteUser = (id) => {
    console.log('Пользователь удален', id);

    setUsers((prevState) => {
      return produce(prevState, (draft) => {
        return (draft = draft.filter((user) => user.id !== id));
      });
    });
  };

  const onAddUser = (user) => {
    setUsers((prevState) => {
      return produce(prevState, (draft) => {
        draft.push(user);
      });
    });
  };

  const onEditUser = (id) => {
    setEdittingUserId(id);
  };

  const onSaveUser = (updatedUser) => {
    setUsers((prevState) =>
      produce(prevState, (draft) => {
        return (draft = draft.map((user) => {
          return user.id === updatedUser.id ? updatedUser : user;
        }));
      }),
    );
  };

  useEffect(() => {
    mobileEvents.addListener('TOGGLE_ADDING_USER', toggleAddingUser);
    mobileEvents.addListener('ADD_USER', onAddUser);
    mobileEvents.addListener('SAVE_USER', onSaveUser);
    mobileEvents.addListener('EDIT_USER', onEditUser);
    mobileEvents.addListener('DELETE_USER', onDeleteUser);
    mobileEvents.addListener('FILTER_USERS', onFilterUsers);

    return () => {
      mobileEvents.removeListener('TOGGLE_ADDING_USER', toggleAddingUser);
      mobileEvents.removeListener('ADD_USER', onAddUser);
      mobileEvents.removeListener('SAVE_USER', onSaveUser);
      mobileEvents.removeListener('EDIT_USER', onEditUser);
      mobileEvents.removeListener('DELETE_USER', onDeleteUser);
      mobileEvents.removeListener('FILTER_USERS', onFilterUsers);
    };
  }, []);

  console.log('Mobile rendered');

  const filteredUsers = users.filter((user) => {
    if (filter === 'active') {
      return user.balance >= 0;
    } else if (filter === 'blocked') {
      return user.balance < 0;
    }
    return true;
  });

  return (
    <div className="wrap">
      <div className="tabs">
        <button onClick={() => emitFilterUsers('all')}>Все</button>
        <button onClick={() => emitFilterUsers('active')}>Активные</button>
        <button onClick={() => emitFilterUsers('blocked')}>Заблокированные</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Баланс</th>
            <th>Статус</th>
            <th>Редактировать</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <User user={user} key={user.id} isEdit={edittingUserId === user.id} />
          ))}
          {isAddingUser && <AddUser />}
        </tbody>
      </table>
      {!isAddingUser && !edittingUserId && (
        <button onClick={() => emitShowAddUser(true)}>Добавить клиента</button>
      )}
    </div>
  );
};

export default React.memo(MobileHook);
