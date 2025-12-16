import React, { useRef } from 'react';

const User = (props) => {
  const refInputLastname = useRef(null);
  const refInputFirstname = useRef(null);
  const refInputSurname = useRef(null);
  const refInputBalance = useRef(null);

  const saveUser = () => {
    const newUser = {
      id: props.user.id,
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

    props.onSaveUser(newUser);
    props.onEditUser(null);
  };

  const { id, lastname, firstname, surname, balance } = props.user;
  const balanceStatus = balance >= 0 ? 'active' : 'blocked';

  console.log(`${lastname} rendered`);
  return (
    <tr>
      <td>{props.isEdit ? <input defaultValue={lastname} ref={refInputLastname} /> : lastname}</td>
      <td>
        {props.isEdit ? <input defaultValue={firstname} ref={refInputFirstname} /> : firstname}
      </td>
      <td>{props.isEdit ? <input defaultValue={surname} ref={refInputSurname} /> : surname}</td>
      <td>{props.isEdit ? <input defaultValue={balance} ref={refInputBalance} /> : balance}</td>
      <td className={balanceStatus}>{balanceStatus}</td>
      <td>
        {props.isEdit ? (
          <button onClick={saveUser}>Сохранить</button>
        ) : (
          <button onClick={() => props.onEditUser(id)}>Редактировать</button>
        )}
      </td>
      <td>
        <button onClick={() => props.onDeleteUser(id)}>Удалить</button>
      </td>
    </tr>
  );
};

export default React.memo(User);
