import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  userToken: string | null;
  isLoading: boolean;
  user: { email: string } | null;
  draft?: {
    phone?: string;
    password?: string;
    code?: string;
  };
}

const initialState: AuthState = {
  userToken: null,
  isLoading: true,
  user: null,
  draft: { phone: '', password: '', code: '' },
};

// Асинхронный экшен для восстановления токена при запуске приложения
export const bootstrapAsync = createAsyncThunk('auth/bootstrap', async () => {
  const token = await AsyncStorage.getItem('userToken');
  return token;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (
      state,
      action: PayloadAction<{ token: string; email: string }>,
    ) => {
      state.userToken = action.payload.token;
      state.user = { email: action.payload.email };
      state.isLoading = false;
      AsyncStorage.setItem('userToken', action.payload.token);
    },
    signOut: state => {
      state.userToken = null;
      state.user = null;
      state.isLoading = false;
      AsyncStorage.removeItem('userToken');
    },
    updateDraftForm: (state, action) => {
      state.draft = { ...state.draft, ...action.payload };
    },
    clearDraftForm: state => {
      state.draft = { phone: '', password: '', code: '' };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(bootstrapAsync.pending, state => {
        state.isLoading = true;
      })
      .addCase(bootstrapAsync.fulfilled, (state, action) => {
        state.userToken = action.payload;
        state.isLoading = false;
      });
  },
});

export const { signIn, signOut, updateDraftForm, clearDraftForm } =
  authSlice.actions;
export default authSlice.reducer;
