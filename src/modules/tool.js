import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import * as api from '../library/api';

const INIT_TOOL = 'tool/INIT_TOOL';
const CHANGE_FIELD = 'tool/CHANGE_FIELD';
const LOADING = 'tool/LOADING';

const PERFORMANCE_START = 'tool/PERFORMANCE_START';
const PERFORMANCE_END = 'tool/PERFORMANCE_END';

const GET_API = 'tool/GET_API';
const GET_API_SUCCESS = 'tool/GET_API_SUCCESS';
const GET_API_FAILURE = 'tool/GET_API_FAILURE';

const PAGING = 'tool/PAGING';
const PAGING_LOADED = 'tool/PAGING_LOADED';

const initialState = {
  loaded: true,
  form: {
    apiType: 'general',
    tableType: 'vertical',
    apiUrl: 'http://192.168.140.5:8081/api/v1/server',
    duplicateData: 1,
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
  performance: {
    start: 0,
    end: 0,
    time: 0,
  }
}

export const loading = createAction(LOADING);
export const initTool = createAction(INIT_TOOL);

export const performanceStart = createAction(PERFORMANCE_START);
export const performanceEnd = createAction(PERFORMANCE_END);

export const changeField = createAction(
  CHANGE_FIELD,
  ({ key, value }) => ({
    key,
    value,
  })
)

export const paging = ({ current, currentPage }) => dispatch => {

  dispatch(
    performanceStart()
  );

  dispatch({
    type: PAGING,
  });

  dispatch({
    type: PAGING_LOADED,
    payload: {current, currentPage},
  });

  dispatch(
    performanceEnd()
  );
}

export const getApi = ({ duplicateData, apiUrl }) => async dispatch => {

  dispatch({
    type: GET_API,
  });

  dispatch(loading());

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
    [LOADING]: (state) => ({
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
    [PAGING_LOADED]: (state, { payload: { current, currentPage } }) =>
      produce(state, draft => {
        draft.paging.current = current;
        draft.paging.currentPage = currentPage;
      }),
    [PERFORMANCE_START]: (state) =>
      produce(state, draft => {
        draft.performance.start = Date.now();
        draft.performance.end = draft.performance.start;
        draft.performance.time = 0;
      }),
    [PERFORMANCE_END]: (state) =>
      produce(state, draft => {
        draft.performance.end = Date.now();
        draft.performance.time = draft.performance.end - draft.performance.start;
      })
  },
  initialState,
)

export default tool;