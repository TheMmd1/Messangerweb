import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  userInformation: string | null;
  countryCode: string | null;
  data: string | null;
}

const initialState: InitialState = {
  userInformation: null,
  countryCode: null,
  data: null,
};

const LoginFormSlice = createSlice({
  name: 'LoginForm',
  initialState: initialState,
  reducers: {
    userData(state, { payload }) {
      return {
        ...state,
        userInformation: payload.userInformation,
        countryCode: payload.countryCode,
      };
    },
    getOtpCode: (state, { payload }) => {
      state.data = payload;
    },
  },
});

export const { userData, getOtpCode } = LoginFormSlice.actions;
export default LoginFormSlice.reducer;
