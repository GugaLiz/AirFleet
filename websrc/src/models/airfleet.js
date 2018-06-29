import { queryMonitor } from '../services/api';

export default {
    namespace: 'airfleet',
  
    state: {
      data: {
        list: [],
        pagination: {},
      },
    },
  
    effects: {
      *fetchMonitor({ payload }, { call, put }) {
        const response = yield call(queryMonitor,payload);
        yield put({
          type: 'save',
          payload: response,
        });
      }
    },
  
    reducers: {
      save(state, action) {
        return {
          ...state,
          data: action.payload,
        };
      },
    },
  };