import React from "react";
import {
  Card,
  Form,
  Button,
} from "@themesberg/react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default () => {
  let history = useHistory();

  const onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj);
    axios
      .post(`http://localhost:8000/peminjam`, formDataObj)
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
        <h5 className="mb-4">Tambah peminjam</h5>
        <Form onSubmit={onFormSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nama Peminjam</Form.Label>
            <Form.Control required type="text" placeholder="nama" name="nama" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Jenis Kelamin</Form.Label>
            <Form.Control as="select" required name="jenis_kelamin">
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
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Alamat</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="alamat"
              name="alamat"
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
