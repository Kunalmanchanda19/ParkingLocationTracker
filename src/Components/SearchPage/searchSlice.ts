import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface FetchParams {
  query: string;
  page: number;
  pageSize:number;
}

interface PageInfo {
  number: number;
  size: number;
  totalPages: number;
  totalElements: number;
}

interface Record {
  id: string;
  numberPlate: string;
  parkingNumber: string;
  lineNumber: number;
  batchEntryTime: string;
  recordEntryTime: string;
  createdAt: string;
  location: {
    locationId: number;
    locationName: string;
  };
}

interface SearchState {
  query: string;
  results: Record[];
  page: PageInfo | null;
  pageSize:number;
  loading: boolean;
  error: string | null;
}

export const fetchResults = createAsyncThunk(
  "search/fetchResults",
  async ({ query, page,pageSize }: FetchParams, thunkAPI) => {
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
  pageSize:5,
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
          size: 5,
          totalPages: 0,
          totalElements: 0,
        };
      }
    },
    setPageSize: (state, action) => {
  state.pageSize = action.payload;
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

        // 🔹 Reset old data before new request
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

export const { setQuery, setPage,setPageSize, clearResults } = searchSlice.actions;
export default searchSlice.reducer;
