import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = [];

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    onLoadClients(state, action) {
      const clients = action.payload.clientsArr.map((client) => ({
        id: client.id,
        lastname: client.fam,
        firstname: client.im,
        surname: client.otch,
        balance: client.balance,
      }));

      return clients;
    },
    onDeleteUserAction(state, action) {
      return state.filter((user) => user.id !== action.payload);
    },
    onAddUserAction(state, action) {
      state.push(action.payload);
    },
    onSaveUserAction(state, action) {
      return state.map((user) => {
        return user.id === action.payload.id ? action.payload : user;
      });
    },
  },
});

export const store = configureStore({
  reducer: {
    clients: clientsSlice.reducer,
  },
});

export const { onLoadClients, onDeleteUserAction, onAddUserAction, onSaveUserAction } =
  clientsSlice.actions;
