
import React from 'react';
import { Row, Col, Card, Container } from '@themesberg/react-bootstrap';

export default () => {
  return (
    <Container className="px-0">
      <Row>
        <Col xs={12} className="p-3">
          <Card>
            <Card.Body>
              <article>
                <h1 className="h2" id="quick-start">Selamat datang ke Libra! </h1>
                <p className="fs-5 fw-light">Mulai mengorganisir perpustakaan</p>

                <p>
                  <b>Book</b> - atur data buku-buku perpustakaan
                </p>
                <p>
                    <b>Borrower</b> - atur data peminjam buku
                </p>
                <p>
                      <b>History</b> - atur dan lihat riwayat peminjaman
                  </p>

              </article>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
