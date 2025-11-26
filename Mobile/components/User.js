import React from 'react';
import PropTypes from 'prop-types';
import { EventEmitter } from 'events';
import mobileEvents from '../events';

class User extends React.PureComponent {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      firstname: PropTypes.string.isRequired,
      surname: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
    }).isRequired,
  };

  refInputLastname = React.createRef();
  refInputFirstname = React.createRef();
  refInputSurname = React.createRef();
  refInputBalance = React.createRef();

  emitSaveUser = () => {
    const newUser = {
      id: this.props.user.id,
      lastname: this.refInputLastname.current.value,
      firstname: this.refInputFirstname.current.value,
      surname: this.refInputSurname.current.value,
      balance: this.refInputBalance.current.value && +this.refInputBalance.current.value,
    };

    const isValid = Object.values(newUser).every((value) => value !== '');

    if (!isValid) {
      alert('Заполните все поля');
      return;
    }

    mobileEvents.emit('SAVE_USER', newUser);
    mobileEvents.emit('EDIT_USER', null);
  };

  render() {
    const { id, lastname, firstname, surname, balance } = this.props.user;
    const balanceStatus = balance >= 0 ? 'active' : 'blocked';

    console.log(`${lastname} rendered`);
    return (
      <tr>
        <td>
          {this.props.isEdit ? (
            <input defaultValue={lastname} ref={this.refInputLastname} />
          ) : (
            lastname
          )}
        </td>
        <td>
          {this.props.isEdit ? (
            <input defaultValue={firstname} ref={this.refInputFirstname} />
          ) : (
            firstname
          )}
        </td>
        <td>
          {this.props.isEdit ? (
            <input defaultValue={surname} ref={this.refInputSurname} />
          ) : (
            surname
          )}
        </td>
        <td>
          {this.props.isEdit ? (
            <input defaultValue={balance} ref={this.refInputBalance} />
          ) : (
            balance
          )}
        </td>
        <td className={balanceStatus}>{balanceStatus}</td>
        <td>
          {this.props.isEdit ? (
            <button onClick={this.emitSaveUser}>Сохранить</button>
          ) : (
            <button onClick={() => mobileEvents.emit('EDIT_USER', id)}>Редактировать</button>
          )}
        </td>
        <td>
          <button onClick={() => mobileEvents.emit('DELETE_USER', id)}>Удалить</button>
        </td>
      </tr>
    );
  }
}

export default User;
