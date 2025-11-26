import React from 'react';
import mobileEvents from '../events';

class AddUser extends React.PureComponent {
  refInputLastname = React.createRef();
  refInputFirstname = React.createRef();
  refInputSurname = React.createRef();
  refInputBalance = React.createRef();

  emitAddUser = () => {
    const newUser = {
      id: crypto.randomUUID(),
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

    mobileEvents.emit('ADD_USER', newUser);
    mobileEvents.emit('TOGGLE_ADDING_USER', false);

    this.refInputLastname.current.value = '';
    this.refInputFirstname.current.value = '';
    this.refInputSurname.current.value = '';
    this.refInputBalance.current.value = '';
  };

  render() {
    console.log('AddUser rendered');

    return (
      <tr>
        <th>
          <input placeholder="Lastname" ref={this.refInputLastname} />
        </th>
        <td>
          <input placeholder="Firstname" ref={this.refInputFirstname} />
        </td>
        <td>
          <input placeholder="Surname" ref={this.refInputSurname} />
        </td>
        <td>
          <input placeholder="Balance" ref={this.refInputBalance} />
        </td>
        <td></td>
        <td>
          <button onClick={() => this.emitAddUser()}>Сохранить</button>
        </td>
        <td>
          <button onClick={() => mobileEvents.emit('TOGGLE_ADDING_USER', false)}>Отменить</button>
        </td>
      </tr>
    );
  }
}

export default AddUser;
