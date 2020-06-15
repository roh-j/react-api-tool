import axios from 'axios';

export const getApi = ({ apiUrl }) => (
  axios({
    method: 'GET',
    url: `${apiUrl}`,
  }).then(response => { return response })
)