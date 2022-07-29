import React from "react";
import Container from "react-bootstrap/Container";

function Footer() {
  return (
    <footer className="py-3 my-5 bg-info ">
      <Container>
        <p className="text-cnter text-white">
          {" "}
          Copyright &copy; Merhaba online shopping for Construction and
          Agricultural tools @2022
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
