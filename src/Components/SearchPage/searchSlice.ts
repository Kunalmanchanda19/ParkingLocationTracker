import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchResults = createAsyncThunk(
  'search/fetchResults',
  async (query: string, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:3001/vehicles/${encodeURIComponent(query)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            btoa(
              "rssb" +
                ":" +
               "rssb")
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const result = await response.json(); 
      return result; 
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    results: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error';
      });
  },
});

export const { setQuery } = searchSlice.actions;
export default searchSlice.reducer;
