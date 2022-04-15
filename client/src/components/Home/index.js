import React, { Component } from "react";
import {
  HomeStyle,
  TextStyle,
  CardTitle,
  DishName,
  DishDescription,
  CardGroup,
  CardBody,
  DishImg,
  Card,
} from "./styles";

import ReactLoading from "react-loading";

import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import FadeIn from "react-fade-in";

import { connect } from "react-redux";
import { Creators as RestaurantsCreator } from "../../store/ducks/restaurants";

class Home extends Component {
  getCard(element) {
    return (
      <Card key={element.restId}>
        <DishImg src={element.dishPhoto}></DishImg>

        <CardBody>
          <CardTitle>{element.restName}</CardTitle>
          <DishName>{element.dishName}</DishName>
          <DishDescription>{element.dishDescription}</DishDescription>
          {/* Quando apertar esse botão, o usuário deve ser redirecionado a tela de fazer pedidos com esse restaurante selecionado */}
          <Link to={`/fazer_pedido?restaurant_id=${element.restId}`}>
            <Button variant="success" className="m-2">
              PEÇA JÁ!
            </Button>
          </Link>
        </CardBody>
      </Card>
    );
  }

  componentDidMount() {
    console.log("dale2");
    this.props.getRestaurants();
  }

  render() {
    const { restaurants } = this.props;
    console.log(restaurants);
    return (
      <HomeStyle>
        {restaurants.loading ? (
          <ReactLoading
            type={"spin"}
            style={{
              position: "absolute",
              width: "10vw",
              top: "40%",
              left: "0",
              right: "0",
              margin: "auto",
            }}
          />
        ) : (
          <div>
            <FadeIn transitionDuration={800}>
              <TextStyle>
                Saboreie as deliciosas comidas dos nossos restaurantes
                parceiros!
              </TextStyle>
            </FadeIn>
            <FadeIn transitionDuration={1000}>
              <CardGroup>
                {this.props.restaurants.data.map((restaurant) => {
                  const dish =
                    restaurant.menu.options[restaurant.menu.destaqueIndex];
                  return this.getCard({
                    restId: restaurant.id,
                    dishPhoto: dish.photo,
                    restName: restaurant.name,
                    dishName: dish.name,
                    dishDescription: dish.description,
                  });
                })}
              </CardGroup>
            </FadeIn>
          </div>
        )}
      </HomeStyle>
    );
  }
}

const mapStateToProps = ({ restaurants }) => ({ restaurants });

export default connect(mapStateToProps, { ...RestaurantsCreator })(Home);
