import { 
  Box, Button, CircularProgress, Grid, Paper, 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, TextField, Typography, MenuItem 
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchResults, setPage, setQuery, setPageSize } from "./searchSlice";
import { RootState } from "../../app/store";

const Search = () => {
  const dispatch = useAppDispatch();
  const { query, results, loading, error, page, pageSize } = useAppSelector(
    (state: RootState) => state.search
  );

  const tableRef = useRef<HTMLDivElement | null>(null);

  const handleSearch = () => {
    dispatch(setPage(0));
    dispatch(fetchResults({ query, page: 0, pageSize }));
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
    dispatch(fetchResults({ query, page: newPage, pageSize }));
  };

  const handlePageSizeChange = (newSize: number) => {
    dispatch(setPageSize(newSize));
    dispatch(setPage(0));
    dispatch(fetchResults({ query, page: 0, pageSize: newSize }));
  };

  // 👇 Auto-scroll to table when results change
  useEffect(() => {
    if (results.length > 0 && tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [results]);

  return (
    <Grid container spacing={2} className="p-4 my-2">
      {/* Left image */}
      <Grid
        item
        xs={12}
        md={5}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="p-2"
      >
        <img
          src="assets/parking-1641.svg"
          alt="Parking Icon"
          className="w-40 h-32 sm:w-60 sm:h-48 md:w-80 md:h-64 lg:w-96 lg:h-96 text-blue-600"
        />
      </Grid>

      {/* Search input */}
      <Grid
        item
        xs={12}
        md={7}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <Typography variant="h4" align="center" sx={{ marginTop: -2, marginBottom: 2 }}>
          Enter Vehicle Number
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            maxWidth: 700,
          }}
        >
          <TextField
            id="vehicle-number"
            label="Vehicle Number"
            variant="outlined"
            sx={{ flex: 7 }}
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch(setQuery(e.target.value))
            }
          />
         
          <Button
            variant="contained"
            color="primary"
            sx={{ flex: 3 }}
            onClick={handleSearch}
          >
            Search &nbsp; <SearchIcon />
          </Button>
        </Box>
      </Grid>

      <Box sx={{ mt: 20, mb:10,width: "100%", textAlign: "center" }} ref={tableRef}>
        {loading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}

        {!loading && results.length === 0 && page && page.totalElements === 0 && (
          <Typography>No results found</Typography>
        )}


        


        {results.length > 0 ? (

          
          <TableContainer component={Paper}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        &nbsp; Rows:
      </Typography>
      <TextField
        select
        size="small"
        value={pageSize}
        onChange={(e) =>
          handlePageSizeChange(parseInt(e.target.value, 10))
        }
        sx={{
          width: 90,
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
          },
        }}
      >
        {[5, 10, 20, 50, 100].map((size) => (
          <MenuItem key={size} value={size}>
            {size}
          </MenuItem>
        ))}
      </TextField>
    </Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>S No.</b></TableCell>
                  <TableCell><b>Number Plate</b></TableCell>
                  <TableCell><b>Location</b></TableCell>
                  <TableCell><b>Parking No.</b></TableCell>
                  <TableCell><b>Line No.</b></TableCell>
                  <TableCell><b>Entry Time</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((item, index) => (
                  <TableRow key={item.id || index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.numberPlate}</TableCell>
                    <TableCell>{item.location?.locationName}</TableCell>
                    <TableCell>{item.parkingNumber}</TableCell>
                    <TableCell>{item.lineNumber}</TableCell>
                    <TableCell>
                      {new Date(item.recordEntryTime).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography></Typography>
        )}

        {/* Pagination controls */}
        {page && page.totalPages > 1 && (
          <Box 
            sx={{ 
              mt: 3, 
              display: "flex", 
              justifyContent: "space-between", 
              flexWrap: "wrap", 
              alignItems: "center" 
            }}
          >
            {/* Page Size Selector (Left) */}
           

            {/* Pagination Buttons (Right) */}
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}>
              <Button
                variant="outlined"
                disabled={page.number === 0}
                onClick={() => handlePageChange(page.number - 1)}
              >
                Prev
              </Button>

              {Array.from({ length: page.totalPages }, (_, i) => (
                <Button
                  key={i}
                  variant={i === page.number ? "contained" : "outlined"}
                  onClick={() => handlePageChange(i)}
                >
                  {i + 1}
                </Button>
              ))}

              <Button
                variant="outlined"
                disabled={page.number >= page.totalPages - 1}
                onClick={() => handlePageChange(page.number + 1)}
              >
                Next
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Grid>
  );
};

export default Search;
