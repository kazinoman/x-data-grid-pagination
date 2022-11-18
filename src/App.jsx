import React, { useState, useEffect } from "react";
import { Button, Divider } from "@mantine/core";
import { Container } from "@mantine/core";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Grid, Typography } from "@mui/material";
import "./App.css";

const apiEndPoint = "https://jsonplaceholder.typicode.com/posts";

function App() {
  const [count, setCount] = useState(0);
  const [getData, setData] = useState([]);

  const [page, setPage] = React.useState(1);
  console.log(page);
  const onPageChange = () => {};
  const [pageSize, setPageSize] = React.useState(10);
  console.log(pageSize);

  const getSomeData = async () => {
    const data = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${pageSize}`
    );
    setData(data?.data);
    //console.log(getData);
  };

  // add data handler

  const addHandler = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await axios.post(apiEndPoint, obj);
    const posts = [post, ...getData];
    setData(posts);
  };

  // update data

  const updatePost = async (data) => {
    // const post = { ...data, title: "asd" };
    data.title = "update";
    await axios.put(apiEndPoint + "/" + data.id, data);
    // console.log(updateData);

    const posts = [...getData];
    const index = posts.indexOf(data);
    posts[index] = { ...data };
    setData(posts);
  };

  useEffect(() => {
    getSomeData();
    console.log(getData);
  }, [page, pageSize]);

  if (!getData) {
    return (
      <>
        <h1>Loading..........</h1>
      </>
    );
  }

  const cols = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "title", headerName: "Title", width: 150 },
    { field: "body", headerName: "Body", flex: 1 },
  ];

  return (
    <div className="App">
      <h1>Hello world !!!</h1>
      {/* <button>get data</button> */}
      <Container size={200} px={0}>
        <Button
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan" }}
          onClick={addHandler}
        >
          Add data
        </Button>
      </Container>
      <Grid container>
        <Grid item xs={8}>
          <Typography>Title</Typography>
        </Grid>
        <Grid item xs={2}>
          Update
        </Grid>
        <Grid item xs={2}>
          Delete
        </Grid>
      </Grid>
      <Divider
        sx={{
          marginTop: "1.5rem",
          marginBottom: "1.5rem",
          height: "0.2rem",
          background: "#0057",
        }}
      />

      {/* {getData?.map((data) => (
        <div style={{ borderBottom: "1px dotted black" }}>
          <Grid container spacing={3} sx={{ my: 1 }} alignItems="center">
            <Grid item xs={8}>
              <Typography>{data.title}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Button
                onClick={() => {
                  updatePost(data);
                }}
              >
                Update
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button color="red">Delete</Button>
            </Grid>
            <Divider />
          </Grid>
        </div>
      ))} */}
      <h1>{page}</h1>
      <div style={{ height: 700, width: "100%", padding: "2rem 0px 2rem 0px" }}>
        <DataGrid
          getRowId={(x) => x?.id}
          autoHeight
          rows={getData ? getData : []}
          columns={cols}
          rowsPerPageOptions={[10, 20, 50]}
          rowCount={100}
          pagination
          paginationMode="server"
          page={page - 1}
          pageSize={pageSize}
          onPageChange={(newPage) => setPage(newPage + 1)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        />
      </div>

      <Divider />
    </div>
  );
}

export default App;
