import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ApplicationsActions = createActionGroup({
  source: 'Loading',
  events: {
    'Enable Loading': emptyProps(),
    'Disable Loading': emptyProps(),
  },
});
