import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserProfile {
  _id: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  profileImage: string;
  role: string;
  level: string;
  loyaltyPoints: number;
  targetPoints: number;
  verified: boolean;
}

interface IUserState {
  profile: IUserProfile | null;
}

const initialState: IUserState = {
  profile: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<IUserProfile>) => {
      state.profile = action.payload;
    },
    clearUserProfile: (state) => {
      state.profile = null;
    },
  },
});

export const { setUserProfile, clearUserProfile } = userSlice.actions;
export default userSlice.reducer;
