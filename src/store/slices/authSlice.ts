import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  userToken: string | null;
  isLoading: boolean;
  user: {
    phone?: string;
    fullName?: string;
    citizenship?: string;
    iin?: string;
    docNumber?: string;
    docIssuedBy?: string;
    isCarrier?: boolean;
    driverLicense?: string;
    driverCategory?: string;
    docIssueDate?: Date;
    birthDate?: Date;
    driverLicenseDate?: Date;
  } | null;
  draft?: {
    phone?: string;
    fullName?: string;
    citizenship?: string;
    iin?: string;
    docNumber?: string;
    docIssuedBy?: string;
    isCarrier?: boolean;
    driverLicense?: string;
    driverCategory?: string;
    docIssueDate?: Date;
    birthDate?: Date;
    driverLicenseDate?: Date;
    code?: string;
  };
}

const initialState: AuthState = {
  userToken: null,
  isLoading: true,
  user: null,
  draft: {
    phone: '',
    fullName: '',
    citizenship: '',
    iin: '',
    docNumber: '',
    docIssuedBy: '',
    isCarrier: false,
    driverLicense: '',
    driverCategory: '',
    docIssueDate: undefined,
    birthDate: undefined,
    driverLicenseDate: undefined,
    code: '',
  },
};

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
      action: PayloadAction<{
        token: string;
        phone: string;
        isNewUser?: boolean;
      }>,
    ) => {
      state.userToken = action.payload.token;
      state.user = { phone: action.payload.phone };
      if (action.payload.isNewUser) {
        state.user = { ...state.user, ...state.draft };
        state.draft = initialState.draft;
      }
      state.isLoading = false;
      AsyncStorage.setItem('userToken', action.payload.token);
    },
    signOut: state => {
      state.userToken = null;
      state.user = null;
      state.isLoading = false;
      state.draft = initialState.draft;
      AsyncStorage.removeItem('userToken');
    },
    updateUserForm: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    updateDraftForm: (state, action) => {
      state.draft = { ...state.draft, ...action.payload };
    },
    clearDraftForm: state => {
      state.draft = {
        phone: '',
        fullName: '',
        citizenship: '',
        iin: '',
        docNumber: '',
        docIssuedBy: '',
        isCarrier: false,
        driverLicense: '',
        driverCategory: '',
        docIssueDate: undefined,
        birthDate: undefined,
        driverLicenseDate: undefined,
      };
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

export const {
  signIn,
  signOut,
  updateDraftForm,
  clearDraftForm,
  updateUserForm,
} = authSlice.actions;
export default authSlice.reducer;
