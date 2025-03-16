import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { callFilterActions } from '../api/callFilter.slice';
import { callsListActions } from '../api/callsList.slice';
import { dateFilterActions } from '../api/dateFilter.slice';
import { audioRecordActions } from '../api/audioRecord.slice';

const actions = {
  ...callFilterActions,
  ...callsListActions,
  ...dateFilterActions,
  ...audioRecordActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
