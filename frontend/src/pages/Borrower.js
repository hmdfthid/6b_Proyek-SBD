
import React, { forwardRef, useState, useEffect } from "react";
import { Card, Button } from '@themesberg/react-bootstrap';
import MaterialTable from 'material-table';
import { Paper } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { Delete, AddBox, ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline, Edit, FilterList, FirstPage, LastPage, Remove, SaveAlt, Search, ViewColumn } from "@material-ui/icons";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default () => {

  const [datas, setDatas] = useState([]);
  let history = useHistory();

  function add() {
    history.push("/borrower/add");
  }

  function edit(id) {
    history.push(`/borrower/edit/${id}`);
  }

  function hapus(id) {
      axios.delete(`http://localhost:8000/peminjam/${id}`)
      .then(function (response) {
          alert("Berhasil menghapus ID "+id);
      })
  }

  useEffect(() => {
      axios.get('http://localhost:8000/peminjam')
      .then(function (response) {
        console.log(response);
        setDatas(response.data);
      })
  }, []);

  return (
    <>
      <Card border="light" className="shadow-sm mb-4">
        <MaterialTable
            components={{
                 Container: props => <Paper {...props} elevation={0}/>
            }}
            columns={[
            { title: 'ID', field: 'id' },
              { title: 'Nama', field: 'nama' },
              { title: 'Jenis Kelamin', field: 'jenis_kelamin' },
              { title: 'Nomor Telepon', field: 'nomor_telepon', type: 'numeric' },
              { title: 'Alamat', field: 'alamat' },
              // { title: 'Doğum Yeri', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } }
            ]}
            data={datas}
            title="Borrowers"
            icons={tableIcons}

            actions={[
              {
                icon: () => <Edit />,
                tooltip: 'Edit',
                onClick: (event, rowData) => edit(rowData.id)
              },
              rowData => ({
                icon: () => <Delete />,
                tooltip: 'Delete',
                onClick: (event, rowData) => hapus(rowData.id)
              }),
            {
              icon: () => <Button variant="outline-primary" className="m-1">New Data</Button>,
              tooltip: "new data",
              position: "toolbar",
              onClick: () => {
                add();
              }
            }
            ]}
              options={{
              actionsColumnIndex: -1,
              exportButton: true,
              filtering: true,
              headerStyle: {
                backgroundColor: '#f5f8fb',
                fontFamily: 'inherit',
                fontWeight: 700,
              },
              rowStyle: {
                fontFamily: 'inherit'
              },
              searchFieldStyle: {
                fontFamily: 'inherit'
              },
            }}
          />
      </Card>
    </>
  );
};
