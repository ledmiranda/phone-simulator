import { createReducer, on } from '@ngrx/store';
import { ApplicationsActions } from './applications.actions';

const initialState: boolean = false;

export const applicationsReducer = createReducer(
  initialState,
  on(ApplicationsActions.enableLoading, () => {
    return true;
  }),
  on(ApplicationsActions.disableLoading, () => {
    return false;
  })
);
