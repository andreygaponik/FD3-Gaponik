import React from 'react';
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

class Mobile extends React.PureComponent {
  state = {
    users: [...initialState],
    filter: 'all',
    isAddingUser: false,
    edittingUserId: null,
  };

  emitFilterUsers = (filter) => {
    mobileEvents.emit('FILTER_USERS', filter);
  };

  emitShowAddUser = (isShow) => {
    mobileEvents.emit('TOGGLE_ADDING_USER', isShow);
  };

  toggleAddingUser = (isShow) => {
    this.setState({
      isAddingUser: isShow,
    });
  };

  onFilterUsers = (filter) => {
    this.setState({ filter });
  };

  onDeleteUser = (id) => {
    console.log('Пользователь удален');

    this.setState((prevState) => {
      return produce(prevState, (draft) => {
        draft.users = draft.users.filter((user) => user.id !== id);
      });
    });
  };

  onAddUser = (user) => {
    this.setState((prevState) => {
      return produce(prevState, (draft) => {
        draft.users.push(user);
      });
    });
  };

  onEditUser = (id) => {
    this.setState({
      edittingUserId: id,
    });
  };

  onSaveUser = (updatedUser) => {
    this.setState((prevState) =>
      produce(prevState, (draft) => {
        draft.users = draft.users.map((user) => {
          console.log(user);
          return user.id === updatedUser.id ? updatedUser : user;
        });
      }),
    );
  };

  componentDidMount() {
    mobileEvents.addListener('TOGGLE_ADDING_USER', this.toggleAddingUser);
    mobileEvents.addListener('ADD_USER', this.onAddUser);
    mobileEvents.addListener('SAVE_USER', this.onSaveUser);
    mobileEvents.addListener('EDIT_USER', this.onEditUser);
    mobileEvents.addListener('DELETE_USER', this.onDeleteUser);
    mobileEvents.addListener('FILTER_USERS', this.onFilterUsers);
  }

  componentWillUnmount() {
    mobileEvents.removeListener('TOGGLE_ADDING_USER', this.toggleAddingUser);
    mobileEvents.removeListener('ADD_USER', this.onAddUser);
    mobileEvents.removeListener('SAVE_USER', this.onSaveUser);
    mobileEvents.removeListener('EDIT_USER', this.onEditUser);
    mobileEvents.removeListener('DELETE_USER', this.onDeleteUser);
    mobileEvents.removeListener('FILTER_USERS', this.onFilterUsers);
  }

  render() {
    console.log('Mobile rendered');

    const filteredUsers = this.state.users.filter((user) => {
      if (this.state.filter === 'active') {
        return user.balance >= 0;
      } else if (this.state.filter === 'blocked') {
        return user.balance < 0;
      }
      return true;
    });

    return (
      <div className="wrap">
        <div className="tabs">
          <button onClick={() => this.emitFilterUsers('all')}>Все</button>
          <button onClick={() => this.emitFilterUsers('active')}>Активные</button>
          <button onClick={() => this.emitFilterUsers('blocked')}>Заблокированные</button>
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
              <User user={user} key={user.id} isEdit={this.state.edittingUserId === user.id} />
            ))}
            {this.state.isAddingUser && <AddUser />}
          </tbody>
        </table>
        {!this.state.isAddingUser && !this.state.edittingUserId && (
          <button onClick={() => this.emitShowAddUser(true)}>Добавить клиента</button>
        )}
      </div>
    );
  }
}

export default Mobile;
