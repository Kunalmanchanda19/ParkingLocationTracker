import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchResults, setQuery } from "./searchSlice";
import { RootState } from "../../app/store";

const Search = () => {

    const dispatch = useAppDispatch();
  const { query, results, loading, error } = useAppSelector((state: RootState) => state.search);

   const handleSearch = () => {
    dispatch(fetchResults(query));
  };
  return (
    <Grid container spacing={2} className="p-4  my-2">
      <Grid
        item
        xs={12}
        md={5}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="  p-2"
      >
        <img
          src="assets/parking-1641.svg"
          alt="Parking Icon"
          className="w-40 h-32 sm:w-60 sm:h-48 md:w-80 md:h-64 lg:w-96 lg:h-96  text-blue-600 "
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={7}
        className=""
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <Typography variant="h4" align="center"sx={{marginTop:-2,marginBottom:2}}>
          Enter Vehicle Number
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            maxWidth: 700,
          }}
          className=""
        >
          <TextField
            id="vehicle-number"
            label="Vehicle Number"
            variant="outlined"
            sx={{ flex: 7 }}
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{ dispatch(setQuery(e.target.value));}}
          />
          <Button variant="contained" color="primary" sx={{ flex: 3 }} onClick={handleSearch}>
         Search &nbsp;  <SearchIcon/> 
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Search;
