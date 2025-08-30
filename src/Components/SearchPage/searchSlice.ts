import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface FetchParams {
  query: string;
  page: number;
  pageSize: number;
}

interface PageInfo {
  number: number;
  size: number;
  totalPages: number;
  totalElements: number;
}

// ✅ Record supports both API + CSV imports
export interface Record {
  id?: string;
  numberPlate?: string;
  parkingNumber?: string;
  lineNumber?: number | string;
  batchEntryTime?: string;
  recordEntryTime?: string;
  createdAt?: string;
  location?: {
    locationId?: number;
    locationName?: string;
  };

  // Extra optional keys from CSV
  Location?: string;
  ["Parking No."]?: string;
  ["Line No."]?: string;
  ["Entry Time"]?: string;
}

interface SearchState {
  query: string;
  results: Record[];
  page: PageInfo | null;
  pageSize: number;
  loading: boolean;
  error: string | null;
}

export const fetchResults = createAsyncThunk(
  "search/fetchResults",
  async ({ query, page, pageSize }: FetchParams, thunkAPI) => {
    try {
      const response = await fetch(
        `https://rssbvehicleparking-cfebhed4eaawbyay.centralindia-01.azurewebsites.net/vehicles/${encodeURIComponent(
          query
        )}?page=${encodeURIComponent(page)}&size=${encodeURIComponent(pageSize)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa("rssb:rssb"),
          },
        }
      );

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

const initialState: SearchState = {
  query: "",
  results: [],
  page: null,
  pageSize: 5,
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setPage: (state, action) => {
      if (state.page) {
        state.page.number = action.payload;
      } else {
        state.page = {
          number: action.payload,
          size: state.pageSize,
          totalPages: 0,
          totalElements: 0,
        };
      }
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    // ✅ New Action for CSV Import
    setResults: (state, action) => {
      state.results = action.payload;
      state.page = {
        number: 0,
        size: state.pageSize,
        totalPages: 3,
        totalElements: action.payload.length,
      };
    },
    clearResults: (state) => {
      state.results = [];
      state.page = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.results = [];
        state.page = null;
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.content || [];
        state.page = action.payload.page || null;
      })
      .addCase(fetchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

//  export all actions including setResults
export const { setQuery, setPage, setPageSize, setResults, clearResults } =
  searchSlice.actions;

export default searchSlice.reducer;
