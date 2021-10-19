import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./../../assets/css/Style.css";

const GET_CARS = "http://localhost:8080/rest/car";

export default class CarList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
    };
    /*this.auth = useSelector((state) => state.auth);
    if(!this.auth.isLoggedIn) {
      return props.history.push("/login");
    }*/ 
  }
  componentDidMount() {
    this.fetchCar();
  }

  fetchCar() {
      axios.get(GET_CARS).then((response) => {
        this.setState({
          cars: response.data,
        });
      }).catch(err => {
        console.log(err);
      });
  }
  render() {
    const { cars } = this.state;
    return (
      cars.length === 0 ? (
        <div className="col-12">
          <h5 colSpan="7">Sem carros disponíveis.</h5>
        </div>
      ) : (
        <div className="row">
          {
            cars.map((car) => (
                <div className="col-sm-12 col-md-4">
                  <div className="card">
                    <img src={car.image} className="card-img-top" alt={car.model} />
                    <div className="card-body">
                      <h5 className="card-title">{car.model} {car.brand}</h5>
                      <p className="card-text">
                        <b>Cor: </b> {car.color} <br/>
                        <b>KM: </b> {car.km} <br/>
                        <b>Ano: </b> {car.year} <br/>
                      </p>
                      <Link to={{
                        pathname:'/booking/' + car.id}} 
                        className="btn btn-primary">
                        Reservar
                      </Link>
                    </div>
                  </div>
                </div>
            ))
          }
          </div>
      )
    );
  }
}
