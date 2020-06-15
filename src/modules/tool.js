import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import * as api from '../library/api';

const INIT_TOOL = 'tool/INIT_TOOL';
const CHANGE_FIELD = 'tool/CHANGE_FIELD';
const LOADED = 'tool/LOADED';

const GET_API = 'tool/GET_API';
const GET_API_SUCCESS = 'tool/GET_API_SUCCESS';
const GET_API_FAILURE = 'tool/GET_API_FAILURE';

const PAGING = 'tool/PAGING';

const initialState = {
  loaded: true,
  form: {
    apiType: 'general',
    tableType: 'vertical',
    apiUrl: 'http://192.168.140.10:8080/getServers',
    duplicateData: 100,
  },
  paging: {
    viewSize: 10,
    navViewSize: 10,
    navSize: 0,
    current: 0,
    currentPage: 1,
  },
  data: [],
  dataCount: 0,
  status: false,
}

export const loaded = createAction(LOADED);
export const initTool = createAction(INIT_TOOL);

export const changeField = createAction(
  CHANGE_FIELD,
  ({ key, value }) => ({
    key,
    value,
  })
)

export const paging = createAction(
  PAGING,
  ({ current, currentPage }) => ({
    current,
    currentPage,
  })
);

export const getApi = ({ duplicateData, apiUrl }) => async dispatch => {

  dispatch({
    type: GET_API,
  });

  dispatch(loaded());

  try {
    const response = await api.getApi({ apiUrl });

    let data = [];
    let i = 0;

    for (i = 0; i < parseInt(duplicateData); i++) {
      data = data.concat(response.data);
    }

    dispatch({
      type: GET_API_SUCCESS,
      payload: data,
    });

  } catch (e) {
    dispatch({
      type: GET_API_FAILURE,
      payload: e,
      error: true,
    });
    throw e;
  }
}

const tool = handleActions(
  {
    [INIT_TOOL]: (state) => ({
      ...state,
      paging: initialState['paging'],
    }),
    [CHANGE_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, draft => {
        draft['form'][key] = value;
      }),
    [LOADED]: (state) => ({
      ...state,
      loaded: false,
    }),
    [GET_API_SUCCESS]: (state, { payload: data }) =>
      produce(state, draft => {
        draft.loaded = true;
        draft.data = data;
        draft.status = true;
        draft.dataCount = data.length;
        draft.paging.navSize = parseInt((data.length - 1) / draft.paging.viewSize) + 1;
      }),
    [PAGING]: (state, { payload: { current, currentPage } }) =>
      produce(state, draft => {
        draft.paging.current = current;
        draft.paging.currentPage = currentPage;
      })
  },
  initialState,
)

export default tool;