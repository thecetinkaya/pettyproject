import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:5135/api/Auth"; // Backend adresini buraya yaz

// Async thunk'lar:

// Veterinarian register
export const registerVeterinarian = createAsyncThunk(
  "auth/registerVeterinarian",
  async (vetData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/register-veterinarian`,
        vetData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.errors || ["Veterinarian registration failed"]
      );
    }
  }
);

// Owner register
export const registerOwner = createAsyncThunk(
  "/register-owner",
  async (ownerData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/register-owner`,
        ownerData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.errors || ["Pet owner registration failed"]
      );
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });
      // genellikle backend token + user bilgisi gönderir
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Logout (örnek, backend logout endpoint varsa)
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${API_BASE_URL}/logout`);
      return true;
    } catch (error) {
      return rejectWithValue("Logout failed");
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  registerSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearRegisterSuccess(state) {
      state.registerSuccess = false;
    },
    resetAuthState(state) {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.registerSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // registerVeterinarian
    builder
      .addCase(registerVeterinarian.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registerSuccess = false;
      })
      .addCase(registerVeterinarian.fulfilled, (state) => {
        state.loading = false;
        state.registerSuccess = true;
      })
      .addCase(registerVeterinarian.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || ["Veterinarian registration failed"];
      });

    // registerOwner
    builder
      .addCase(registerOwner.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registerSuccess = false;
      })
      .addCase(registerOwner.fulfilled, (state) => {
        state.loading = false;
        state.registerSuccess = true;
      })
      .addCase(registerOwner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || ["Pet owner registration failed"];
      });

    // loginUser
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });

    // logoutUser
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.token = null;
        state.user = null;

        localStorage.removeItem("token");
        localStorage.removeItem("user");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Logout failed";
      });
  },
});

export const { clearError, clearRegisterSuccess, resetAuthState } =
  authSlice.actions;
export default authSlice.reducer;
