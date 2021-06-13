import React, { useState, useEffect } from "react";
import {
  Card,
  Form,
  Button,
} from "@themesberg/react-bootstrap";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

export default () => {
  const [datas, setDatas] = useState([]);
  const { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    axios.get(`http://localhost:8000/peminjam/${id}`).then(function (response) {
      console.log(response.data[0]);
      setDatas(response.data[0]);
    });
  }, []);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj);
    axios
      .put(`http://localhost:8000/peminjam/${id}`, formDataObj)
      .then(function (response) {
        alert(response.data);
        history.push(`/borrower`);
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
        <h5 className="mb-4">Edit peminjam {id}</h5>
        <Form onSubmit={onFormSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nama Peminjam</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="nama"
              name="nama"
              defaultValue={datas.nama}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Jenis Kelamin</Form.Label>
            <Form.Control
              as="select"
              required
              name="jenis_kelamin"
              defaultValue={datas.jenis_kelamin}
            >
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nomor Telepon</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="nomor telepon"
              name="nomor_telepon"
              defaultValue={datas.nomor_telepon}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Alamat</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="alamat"
              name="alamat"
              defaultValue={datas.alamat}
            />
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
