
import React, { useState, useEffect } from "react";
import { Card, Form, Button } from '@themesberg/react-bootstrap';
import axios from 'axios';
import { useParams, useHistory } from "react-router-dom";

export default () => {
  const [datas, setDatas] = useState([]);
  const { id } = useParams();
  let history = useHistory();

  useEffect(() => {
      axios.get(`http://localhost:8000/buku/${id}`)
      .then(function (response) {
        console.log(response.data[0]);
        setDatas(response.data[0]);
      })
  }, []);

    const onFormSubmit = e => {
            e.preventDefault()
            const formData = new FormData(e.target),
                  formDataObj = Object.fromEntries(formData.entries())
            console.log(formDataObj)
                axios.put(`http://localhost:8000/buku/${id}`, formDataObj)
                .then(function (response) {
                    alert(response.data);
                    history.push(`/borrower`);
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
        <h5 className="mb-4">Edit buku {id}</h5>
        <Form onSubmit={onFormSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Kode Buku</Form.Label>
            <Form.Control required type="text" placeholder="kode" name="kode" defaultValue={datas.kode} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Judul Buku</Form.Label>
            <Form.Control required type="text" placeholder="nama" name="nama" defaultValue={datas.nama} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tahun Terbit</Form.Label>
            <Form.Control required type="number" placeholder="Tahun Terbit" name="tahun_terbit" defaultValue={datas.tahun_terbit} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Pengarang</Form.Label>
            <Form.Control required type="text" placeholder="pengarang" name="pengarang" defaultValue={datas.pengarang} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Genre</Form.Label>
            <Form.Control required type="text" placeholder="genre" name="genre" defaultValue={datas.genre} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Penerbit</Form.Label>
            <Form.Control required type="text" placeholder="penerbit" name="penerbit" defaultValue={datas.penerbit} />
          </Form.Group>
          <div className="mt-3">
            <Button variant="primary" type="submit">Update</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
