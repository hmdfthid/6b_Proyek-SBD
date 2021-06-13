import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  Form,
  Button,
  InputGroup,
} from "@themesberg/react-bootstrap";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

export default () => {
  const [datas, setDatas] = useState([]);
  const { id } = useParams();
  let history = useHistory();
  const [peminjaman, setPeminjaman] = React.useState("");
  const [pengembalian, setPengembalian] = React.useState("");

  useEffect(() => {
    axios.get(`http://localhost:8000/peminjaman/${id}`).then(function (response) {
      console.log(response.data[0]);
      setDatas(response.data[0]);
      setPeminjaman(response.data[0].tanggal_peminjaman);
      setPengembalian(response.data[0].tanggal_pengembalian);
    });
  }, []);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj);
    axios
      .put(`http://localhost:8000/peminjaman/${id}`, formDataObj)
      .then(function (response) {
        alert(response.data);
        history.push(`/history`);
      })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          alert(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Edit peminjaman {id}</h5>
        <Form onSubmit={onFormSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Kode Buku</Form.Label>
            <Form.Control required type="text" placeholder="kode buku" name="kode_buku" defaultValue={datas.kode_buku} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>ID Peminjam</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="id peminjam"
              name="id_peminjam"
              defaultValue={datas.id_peminjam}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tanggal Peminjaman</Form.Label>
            <Datetime
          timeFormat={false}
          closeOnSelect={false}
          onChange={setPeminjaman}
          renderInput={(props, openCalendar) => (
            <InputGroup>
              <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
              <Form.Control
                name="tanggal_peminjaman"
                required
                type="text"
                value={peminjaman ? moment(peminjaman).format("MM/DD/YYYY") : ""}
                placeholder="mm/dd/yyyy"
                onFocus={openCalendar}
                onChange={() => { }} />
            </InputGroup>
          )} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tanggal Pengembalian</Form.Label>
            <Datetime
          timeFormat={false}
          closeOnSelect={false}
          onChange={setPengembalian}
          renderInput={(props, openCalendar) => (
            <InputGroup>
              <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
              <Form.Control
                name="tanggal_pengembalian"
                required
                type="text"
                value={pengembalian ? moment(pengembalian).format("MM/DD/YYYY") : ""}
                placeholder="mm/dd/yyyy"
                onFocus={openCalendar}
                onChange={() => { }} />
            </InputGroup>
          )} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status Peminjaman</Form.Label>
            <Form.Control as="select" required name="status_peminjaman">
              <option value="Tersedia">Tersedia</option>
              <option value="Sedang dipinjam">Sedang dipinjam</option>
            </Form.Control>
          </Form.Group>
          <div className="mt-3">
            <Button variant="primary" type="submit">
              Update
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
