import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onDeleteUserAction, onAddUserAction, onSaveUserAction } from './store/index';

import User from './components/User';
import AddUser from './components/AddUser';

import { loadClients } from './store/loadClients';

import './App.css';

const App = () => {
  const clients = useSelector((state) => state.clients);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState('all');
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [edittingUserId, setEdittingUserId] = useState(null);

  useEffect(() => {
    loadClients(dispatch);
  }, [dispatch]);

  const toggleAddingUser = (isShow) => {
    setIsAddingUser(isShow);
  };

  const onFilterUsers = (filter) => {
    setFilter(filter);
  };

  const onDeleteUser = (id) => {
    dispatch(onDeleteUserAction(id));
  };

  const onAddUser = (user) => {
    dispatch(onAddUserAction(user));
  };

  const onEditUser = (id) => {
    setEdittingUserId(id);
  };

  const onSaveUser = (updatedUser) => {
    dispatch(onSaveUserAction(updatedUser));
  };

  console.log('Mobile rendered');

  const filteredUsers = clients.filter((user) => {
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
        <button onClick={() => onFilterUsers('all')}>Все</button>
        <button onClick={() => onFilterUsers('active')}>Активные</button>
        <button onClick={() => onFilterUsers('blocked')}>Заблокированные</button>
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
            <User
              user={user}
              key={user.id}
              isEdit={edittingUserId === user.id}
              onDeleteUser={onDeleteUser}
              onEditUser={onEditUser}
              onSaveUser={onSaveUser}
            />
          ))}
          {isAddingUser && <AddUser toggleAddingUser={toggleAddingUser} onAddUser={onAddUser} />}
        </tbody>
      </table>
      {!isAddingUser && !edittingUserId && (
        <button onClick={() => toggleAddingUser(true)}>Добавить клиента</button>
      )}
    </div>
  );
};

export default React.memo(App);
