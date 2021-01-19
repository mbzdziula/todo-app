import * as types from './actionTypes';

export function actionEditDrawer(open) {
  return { type: types.ACTION_EDIT_DRAWER, open };
}

export function actionMainDrawer(open) {
  return { type: types.ACTION_MAIN_DRAWER, open };
}
