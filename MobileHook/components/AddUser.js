import React, { useRef } from 'react';
import mobileEvents from '../events';

const AddUser = () => {
  const refInputLastname = useRef(null);
  const refInputFirstname = useRef(null);
  const refInputSurname = useRef(null);
  const refInputBalance = useRef(null);

  const emitAddUser = () => {
    const newUser = {
      id: crypto.randomUUID(),
      lastname: refInputLastname.current.value,
      firstname: refInputFirstname.current.value,
      surname: refInputSurname.current.value,
      balance: refInputBalance.current.value && +refInputBalance.current.value,
    };

    const isValid = Object.values(newUser).every((value) => value !== '');

    if (!isValid) {
      alert('Заполните все поля');
      return;
    }

    mobileEvents.emit('ADD_USER', newUser);
    mobileEvents.emit('TOGGLE_ADDING_USER', false);

    refInputLastname.current.value = '';
    refInputFirstname.current.value = '';
    refInputSurname.current.value = '';
    refInputBalance.current.value = '';
  };

  console.log('AddUser rendered');

  return (
    <tr>
      <th>
        <input placeholder="Lastname" ref={refInputLastname} />
      </th>
      <td>
        <input placeholder="Firstname" ref={refInputFirstname} />
      </td>
      <td>
        <input placeholder="Surname" ref={refInputSurname} />
      </td>
      <td>
        <input placeholder="Balance" ref={refInputBalance} />
      </td>
      <td></td>
      <td>
        <button onClick={() => emitAddUser()}>Сохранить</button>
      </td>
      <td>
        <button onClick={() => mobileEvents.emit('TOGGLE_ADDING_USER', false)}>Отменить</button>
      </td>
    </tr>
  );
};

export default React.memo(AddUser);
