import { 
  Box, Button, CircularProgress, Grid, Paper, 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, TextField, Typography, MenuItem 
} from "@mui/material";
import React, { useEffect, useRef, ChangeEvent, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchResults, setPage, setQuery, setPageSize, setResults } from "./searchSlice";
import { RootState } from "../../app/store";
import Papa, { ParseResult } from "papaparse";

const Search = () => {
  const dispatch = useAppDispatch();
  const { query, results, loading, error, page, pageSize } = useAppSelector(
    (state: RootState) => state.search
  );

  const tableRef = useRef<HTMLDivElement | null>(null);

  // ✅ Local state for filtering
  const [filterField, setFilterField] = useState<string>("numberPlate");
  const [filterValue, setFilterValue] = useState<string>("");

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

  // ✅ Import CSV data
  const handleImportData = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse<any>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: ParseResult<any>) => {
        console.log("Imported Data:", results.data);
        dispatch(setResults(results.data)); // push into Redux
      },
    });

    e.target.value = ""; // reset file input
  };

  //  Export CSV
  const handleExportAll = () => {
    if (!results || results.length === 0) return;

    const headers = ["S No.", "Number Plate", "Location", "Parking No.", "Line No.", "Entry Time"];

    const rowsData = results.map((item, index) => [
      (page?.number ?? 0) * pageSize + index + 1,
      item.numberPlate || item["numberPlate"],
      item.location?.locationName || item["Location"],
      item.parkingNumber || item["Parking No."],
      item.lineNumber || item["Line No."],
      item.recordEntryTime
        ? new Date(item.recordEntryTime).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        : item["Entry Time"] || "",
    ]);

    const csvContent = [headers, ...rowsData]
      .map((row) => row.map((val) => `"${val ?? ""}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "parking_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (results.length > 0 && tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [results]);

  //  Apply filter before rendering
//  Apply filter before rendering
const filteredResults = results.filter((item: Record<string, any>) => {
  if (!filterValue) return true;
  const rawValue = item[filterField] ?? item[filterField as keyof typeof item] ?? "";
  const value = rawValue.toString().toLowerCase();
  return value.includes(filterValue.toLowerCase());
});

  return (
    <Grid container spacing={2} className="p-4 my-2">
      {/* Left image */}
      <Grid item xs={12} md={5} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} className="p-2">
        <img
          src="assets/technology.png"
          alt="technology"
          className="w-40 h-32 sm:w-60 sm:h-48 md:w-80 md:h-64 lg:w-96 lg:h-96 text-blue-600"
        />
      </Grid>

      {/* Search input */}
      <Grid item xs={12} md={7} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3 }}>
        <Typography variant="h4" align="center" sx={{ marginTop: -2, marginBottom: 2 }}>
          Enter Vehicle Number
        </Typography>

        <Box sx={{ display: "flex", gap: 2, width: "100%", maxWidth: 700 }}>
          <TextField
            id="vehicle-number"
            label="Vehicle Number"
            variant="outlined"
            sx={{ flex: 7 }}
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setQuery(e.target.value))}
          />

          <Button variant="contained" color="primary" sx={{ flex: 3 }} onClick={handleSearch}>
            Search &nbsp; <SearchIcon />
          </Button>
        </Box>
      </Grid>

      {/* Table */}
      <Box sx={{ mt: 10, mb: 10, width: "100%", textAlign: "center" }} ref={tableRef}>
        {loading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}
        {!loading && results.length === 0 && page && page.totalElements === 0 && (
          <Typography>No vehicle found</Typography>
        )}

        {results.length > 0 ? (
          <TableContainer component={Paper}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", p: 2, gap: 2 }}>
              
              {/* Rows dropdown */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Rows:
                </Typography>
                <TextField
                  select
                  size="small"
                  value={pageSize}
                  onChange={(e) => handlePageSizeChange(parseInt(e.target.value, 10))}
                  sx={{ width: 90, "& .MuiOutlinedInput-root": { borderRadius: "22px" } }}
                >
                  {[5, 10, 20, 50, 100].map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              {/*  Filter inputs */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <TextField
                  select
                  size="small"
                  label="Filter By"
                  value={filterField}
                  onChange={(e) => setFilterField(e.target.value)}
                  sx={{ minWidth: 150 }}
                >
                  <MenuItem value="numberPlate">Number Plate</MenuItem>
                  <MenuItem value="location">Location</MenuItem>
                  <MenuItem value="parkingNumber">Parking No.</MenuItem>
                  <MenuItem value="lineNumber">Line No.</MenuItem>
                </TextField>

                <TextField
                  size="small"
                  label="Filter Value"
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  sx={{ minWidth: 200 }}
                />
              </Box>

              {/* Import & Export buttons */}
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button variant="contained" component="label" color="primary">
                  Import CSV
                  <input type="file" accept=".csv" hidden onChange={handleImportData} />
                </Button>

                <Button variant="contained" color="primary" onClick={handleExportAll}>
                  Export All
                </Button>
              </Box>
            </Box>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>S No.</b></TableCell>
                  <TableCell><b>number Plate</b></TableCell>
                  <TableCell><b>Location</b></TableCell>
                  <TableCell><b>Parking No.</b></TableCell>
                  <TableCell><b>Line No.</b></TableCell>
                  <TableCell><b>Entry Time</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredResults.map((item, index) => (
                  <TableRow key={item.id || index}>
                    <TableCell>{(page?.number ?? 0) * pageSize + index + 1}</TableCell>
                    <TableCell>{item.numberPlate || item["numberPlate"]}</TableCell>
                    <TableCell>{item.location?.locationName || item["Location"]}</TableCell>
                    <TableCell>{item.parkingNumber || item["Parking No."]}</TableCell>
                    <TableCell>{item.lineNumber || item["Line No."]}</TableCell>
                    <TableCell>
                      {item.recordEntryTime
                        ? new Date(item.recordEntryTime).toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })
                        : item["Entry Time"] || ""}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography></Typography>
        )}

        {/* Pagination */}
        {page && page.totalPages > 1 && (
          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between", flexWrap: "wrap", alignItems: "center" }}>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}>
              <Button
                variant="outlined"
                disabled={(page?.number ?? 0) === 0}
                onClick={() => handlePageChange((page?.number ?? 0) - 1)}
              >
                Prev
              </Button>
              {Array.from({ length: page.totalPages }, (_, i) => (
                <Button
                  key={i}
                  variant={i === (page?.number ?? 0) ? "contained" : "outlined"}
                  onClick={() => handlePageChange(i)}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                variant="outlined"
                disabled={(page?.number ?? 0) >= page.totalPages - 1}
                onClick={() => handlePageChange((page?.number ?? 0) + 1)}
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
      