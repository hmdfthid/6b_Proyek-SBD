
import React, { useState } from "react";
import {  Nav, Image, Navbar, Dropdown, Container } from '@themesberg/react-bootstrap';

import Profile3 from "../assets/img/team/profile-picture-3.jpg";


export default (props) => {
  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100">
          <h2 className="py-1">Libra</h2>
          <Nav className="align-items-center">
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                <div className="media d-flex align-items-center">
                  <Image src={Profile3} className="user-avatar md-avatar rounded-circle" />
                </div>
              </Dropdown.Toggle>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};
