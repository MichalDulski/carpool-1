import {
  takeLatest,
  put,
  select,
  call,
  take,
  putResolve,
  delay,
} from 'redux-saga/effects';
import * as actions from '../../actions';
import instance from '../../../axios/instance';
import authInstance from '../../../axios/authInstance';
import jwt_decode from 'jwt-decode';
import {
  rejectPromiseAction,
  resolvePromiseAction,
} from '@adobe/redux-saga-promise';
import {readData, STORAGE_KEYS} from '../../../storage';

export function* getGroupsAsync() {
  try {
    const token = yield select(state => state.authReducer.tokens.data.token);
    const userId = jwt_decode(token).sub.toString();

    if (token) {
      yield put(actions.getGroupsLoading());

      const res = yield instance.get(`/users/${userId}/groups`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      yield put(actions.getGroupsSuccess(res.data.result));
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        yield put(actions.refreshToken());
        yield take(actions.GetToken.Success);
        yield put(actions.getGroups());
        return;
      }
    }
    yield put(actions.getGroupsError(err));
  }
}

export function* getInvitationsAsync() {
  try {
    const token = yield select(state => state.authReducer.tokens.data.token);
    const userId = jwt_decode(token).sub.toString();

    if (token) {
      yield put(actions.getInvitationsLoading());

      const res = yield instance.get(`/users/${userId}/group-invites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      yield put(actions.getInvitationsSuccess(res.data.result));
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        yield put(actions.refreshToken());
        yield take(actions.GetToken.Success);
        yield put(actions.getInvitations());
        return;
      }
    }
    yield put(actions.getInvitationsError(err));
  }
}

export function* acceptInvitationAsync(action) {
  try {
    const token = yield select(state => state.authReducer.tokens.data.token);

    if (token) {
      yield instance.put(
        `/GroupInvites/${action.payload}`,
        {
          isAccepted: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      yield put(actions.getInvitations());
      yield put(actions.getGroups());

      yield call(resolvePromiseAction, action);
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        yield put(actions.refreshToken());
        yield take(actions.GetToken.Success);
        try {
          yield putResolve(actions.acceptInvitation(action.payload));
          yield call(resolvePromiseAction, action);
        } catch (err) {
          yield call(rejectPromiseAction, action, err.response);
        }
        return;
      }
    }
    yield call(rejectPromiseAction, action, err.response);
  }
}

export function* declineInvitationAsync(action) {
  try {
    const token = yield select(state => state.authReducer.tokens.data.token);

    if (token) {
      yield instance.put(
        `/GroupInvites/${action.payload}`,
        {
          isAccepted: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      yield put(actions.getInvitations());
      yield put(actions.getGroups());

      yield call(resolvePromiseAction, action);
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        yield put(actions.refreshToken());
        yield take(actions.GetToken.Success);
        try {
          yield putResolve(actions.declineInvitation(action.payload));
          yield call(resolvePromiseAction, action);
        } catch (err) {
          yield call(rejectPromiseAction, action, err.response);
        }
        return;
      }
    }
    yield call(rejectPromiseAction, action, err.response);
  }
}

export function* getUserAsync() {
  try {
    const token = yield select(state => state.authReducer.tokens.data.token);
    const userId = jwt_decode(token).sub.toString();

    if (token) {
      yield put(actions.getUserLoading());

      const res = yield instance.get(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      yield put(actions.getUserSuccess(res.data.result));
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        yield put(actions.refreshToken());
        yield take(actions.GetToken.Success);
        yield put(actions.getUser());
        return;
      }
    }
    yield put(actions.getUserError(err));
  }
}

export function* editUserAsync(action) {
  try {
    const token = yield select(state => state.authReducer.tokens.data.token);
    const userId = jwt_decode(token).sub.toString();

    if (token) {
      yield authInstance.put(
        `/Users/${userId}`,
        {
          ...action.payload,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      yield put(actions.getUser());

      yield call(resolvePromiseAction, action);
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        yield put(actions.refreshToken());
        yield take(actions.GetToken.Success);
        try {
          yield putResolve(actions.editUser(action.payload));
          yield call(resolvePromiseAction, action);
        } catch (err) {
          yield call(rejectPromiseAction, action, err.response);
        }
        return;
      }
    }
    yield call(rejectPromiseAction, action, err.response);
  }
}

export function* deleteAccountAsync(action) {
  try {
    const token = yield select(state => state.authReducer.tokens.data.token);
    const userId = jwt_decode(token).sub.toString();

    if (token) {
      yield authInstance.delete(`/Users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      yield call(resolvePromiseAction, action);
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        yield put(actions.refreshToken());
        yield take(actions.GetToken.Success);
        try {
          yield putResolve(actions.deleteAccount());
          yield call(resolvePromiseAction, action);
        } catch (err) {
          yield call(rejectPromiseAction, action, err.response);
        }
        return;
      }
    }
    yield call(rejectPromiseAction, action, err.response);
  }
}

export function* leaveGroupAsync(action) {
  try {
    const token = yield select(state => state.authReducer.tokens.data.token);
    const userId = jwt_decode(token).sub.toString();

    if (token) {
      yield instance.delete(`/Groups/${action.payload}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      yield put(actions.getGroups());

      yield call(resolvePromiseAction, action);
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        yield put(actions.refreshToken());
        yield take(actions.GetToken.Success);
        try {
          yield putResolve(actions.leaveGroup(action.payload));
          yield call(resolvePromiseAction, action);
        } catch (err) {
          yield call(rejectPromiseAction, action, err.response);
        }
        return;
      }
    }
    yield call(rejectPromiseAction, action, err.response);
  }
}

export function* watchInvitationsAsync() {
  while (true) {
    const token = yield call(readData, STORAGE_KEYS.token);

    if (token) {
      yield put(actions.getInvitations());
    }

    yield delay(60000);
  }
}

export function* getGroupRidesAsync(action) {
  try {
    const token = yield select(state => state.authReducer.tokens.data.token);

    if (token) {
      const res = yield instance.get(`/Rides?groupId=${action.payload}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      yield call(resolvePromiseAction, action, res.data.result);
    }
  } catch (err) {
    console.log(err);
    if (err.response) {
      if (err.response.status === 401) {
        yield put(actions.refreshToken());
        yield take(actions.GetToken.Success);
        try {
          yield putResolve(actions.getGroupRides(action.payload));
          yield call(resolvePromiseAction, action);
        } catch (err) {
          yield call(rejectPromiseAction, action, err.response);
        }
        return;
      }
    }
    yield call(rejectPromiseAction, action, err.response);
  }
}

const accountSagas = [
  takeLatest(actions.GetGroups.Trigger, getGroupsAsync),
  takeLatest(actions.GetInvitations.Trigger, getInvitationsAsync),
  takeLatest(actions.GetInvitations.Watch, watchInvitationsAsync),
  takeLatest(actions.AcceptInvitation.PromiseTrigger, acceptInvitationAsync),
  takeLatest(actions.DeclineInvitation.PromiseTrigger, declineInvitationAsync),
  takeLatest(actions.GetUser.Trigger, getUserAsync),
  takeLatest(actions.EditUser.PromiseTrigger, editUserAsync),
  takeLatest(actions.DeleteAccount.PromiseTrigger, deleteAccountAsync),
  takeLatest(actions.LeaveGroup.PromiseTrigger, leaveGroupAsync),
  takeLatest(actions.GetGroupRides.PromiseTrigger, getGroupRidesAsync),
];

export default accountSagas;
