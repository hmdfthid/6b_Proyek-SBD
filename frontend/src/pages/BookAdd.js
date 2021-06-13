import React from "react";
import { Card, Form, Button } from '@themesberg/react-bootstrap';
import axios from 'axios';
import { useHistory } from "react-router-dom";

export default () => {
  let history = useHistory();

    const onFormSubmit = e => {
            e.preventDefault()
            const formData = new FormData(e.target),
                  formDataObj = Object.fromEntries(formData.entries())
            console.log(formDataObj)
                axios.post(`http://localhost:8000/buku`, formDataObj)
                .then(function (response) {
                    alert(response.data);
                    history.push(`/book`);
                }).catch(function (error) {
              if (error.response) {
                // Request made and server responded
                alert(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              }
            });

          }
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Tambah buku</h5>
        <Form onSubmit={onFormSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Kode Buku</Form.Label>
            <Form.Control required type="text" placeholder="kode" name="kode" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Judul Buku</Form.Label>
            <Form.Control required type="text" placeholder="nama" name="nama" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tahun Terbit</Form.Label>
            <Form.Control required type="number" placeholder="Tahun Terbit" name="tahun_terbit" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Pengarang</Form.Label>
            <Form.Control required type="text" placeholder="pengarang" name="pengarang" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Genre</Form.Label>
            <Form.Control required type="text" placeholder="genre" name="genre" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Penerbit</Form.Label>
            <Form.Control required type="text" placeholder="penerbit" name="penerbit" />
          </Form.Group>
          <div className="mt-3">
            <Button variant="primary" type="submit">Add new</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
