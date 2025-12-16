import React, { useRef } from 'react';

const AddUser = (props) => {
  const refInputLastname = useRef(null);
  const refInputFirstname = useRef(null);
  const refInputSurname = useRef(null);
  const refInputBalance = useRef(null);

  const addUser = () => {
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

    props.onAddUser(newUser);
    props.toggleAddingUser(false);

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
        <button onClick={addUser}>Сохранить</button>
      </td>
      <td>
        <button onClick={() => props.toggleAddingUser(false)}>Отменить</button>
      </td>
    </tr>
  );
};

export default React.memo(AddUser);
