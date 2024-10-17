import React from "react"
import { Container, Row, Col } from "react-bootstrap"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>
              <b
                style={{
                  border: "1px solid",
                  borderRadius: "2px",
                  padding: "2px 4px",
                  marginRight: "4px"
                }}
              >
                E
              </b>
              <span
                style={{
                  paddingBottom: "2px",
                  borderBottom: "1px solid"
                }}
              >
                shop
              </span>{" "}
              &copy; {currentYear}
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
