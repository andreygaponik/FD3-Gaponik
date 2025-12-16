import axios from 'axios';
import { onLoadClients } from './index';

export const loadClients = (dispatch) => {
  axios
    .get('https://fe.it-academy.by/Examples/mobile_company.json')
    .then((res) => {
      dispatch(onLoadClients(res.data));
    })
    .catch((err) => {
      console.error(err);
    });
};
