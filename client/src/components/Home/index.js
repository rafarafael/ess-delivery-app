import React, { Component } from "react";
import { HomeStyle } from "./styles";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { connect } from "react-redux";
import { Creators as RestaurantsCreator } from "../../store/ducks/restaurants";

class Home extends Component {
  componentDidMount() {
    this.props.getRestaurants();
  }

  render() {
    return (
      <HomeStyle>
        <Container>
          <Row>
            <h1
              style={{
                textAlign: "center",
                fontWeight: 500,
                fontSize: "2.5rem",
                lineHeight: "94px",
                color: "#630606",
              }}
              className="m-1"
            >
              Saboreie as deliciosas comidas dos nossos restaurantes parceiros!
            </h1>
            {this.props.restaurants.data.map((restaurant) => (
              <Col>
                <Card
                  key={restaurant.id}
                  style={{
                    borderRadius: "50px",
                    alignItems: "center",
                    width: "370px",
                    background: "rgba(245, 245, 245, 0.8)",
                  }}
                  className="m-2"
                >
                  <Card.Img
                    variant="top"
                    src={
                      restaurant.menu.options[restaurant.menu.destaqueIndex]
                        .photo
                    }
                    style={{
                      borderRadius: "50px",
                    }}
                  />
                  <Card.Body
                    style={{
                      textAlign: "center",
                      
                    }}
                  >
                    <Card.Title style={{ color: "#E83A14" }}>
                      {restaurant.name}
                    </Card.Title>
                    <Card.Text style={{ color: "#1B1A17" }}>
                      {
                        restaurant.menu.options[restaurant.menu.destaqueIndex]
                          .name
                      }
                    </Card.Text>
                    <Card.Text style={{ color: "#05595B" }}>
                      {
                        restaurant.menu.options[restaurant.menu.destaqueIndex]
                          .description
                      }
                    </Card.Text>
                  </Card.Body>
                  {/* Quando apertar esse botão, o usuário deve ser redirecionado a tela de fazer pedidos com esse restaurante selecionado */}
                  <Link to={`/fazer_pedido?restaurant_id=${restaurant.id}`}>
                    <Button variant="success" className="m-2">
                      PEÇA JÁ!
                    </Button>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </HomeStyle>
    );
  }
}

const mapStateToProps = ({ restaurants }) => ({ restaurants });

export default connect(mapStateToProps, { ...RestaurantsCreator })(Home);
