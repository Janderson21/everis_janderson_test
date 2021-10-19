import React, { Component } from "react";
import { connect } from "react-redux";
import {
  saveBooking,
  fetchBooking,
  updateBooking,
} from "../../services/index";

import { fetchCar } from "../../services/car/carActions";
import DatePicker from "react-datepicker";
import { Card, Form, Button, Col, Image, Alert} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-datepicker/dist/react-datepicker.css";
import {
  faSave,
  faPlusSquare,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

class Booking extends Component {

  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.car = {};
    this.state = {
      show: false,
    };
  }

  initialState = {
    id: "",
    dtini: "",
    dtfim: "",
    user: "",
    car: "", 
    currentDate: new Date()
  };

  componentDidMount() {
    const carId = +this.props.match.params.id;
    const userId = parseInt(this.props.authObject.id);
    if(isNaN(userId)) 
      this.props.history.push("/login");
    if (carId) {
      this.initialState.car = carId;
      this.findCarById(carId, userId);
    } else {
      this.props.history.push("/");
    }
  }

  findCarById = (carId, userId) => {
    this.props.fetchCar(carId);
    setTimeout(() => {
      let car = this.props.carObject.car;
      this.car = car;
      if (car != null) {
        this.setState({
          id: "",
          dtini: "",
          dtfim: "",
          user: userId,
          car: car.id,
        });
      }
    }, 1000);
  };

  submitBooking = (event) => {
    event.preventDefault();

    const booking = {
      dtini: this.state.dtini,
      dtfim: this.state.dtfim,
      car_id: this.state.car,
      user_id: this.state.user,
    };

    this.props.saveBooking(booking);
    setTimeout(() => {
      if (this.props.bookingObject.booking.id !== undefined) {
        this.setState({showError: false, showSuccess: true, message: "Reserva realizada com sucesso."});
        setTimeout(() => this.setState({ show: false }), 3000);
      } else {
        this.setState({showError: true, showSuccess: false, message: this.props.bookingObject.booking});
      }
      this.setState({user: parseInt(this.props.authObject.id)});
    }, 2000);
    this.setState(this.initialState);
  };

  bookingChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  bookingList = () => {
    return this.props.history.push("/list");
  };

  addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  render() {
    const {car, user} = this.state;

    return (
      <div className="col-sm-8 offset-2">
        {this.state.showSuccess && (
          <Alert variant="success" onClose={() => this.setState({showSucess:false})} dismissible>
            {this.state.message}
          </Alert>
        )}
        {this.state.showError && (
          <Alert variant="danger" onClose={() => this.setState({showError:false})} dismissible>
            {this.state.message}
          </Alert>
        )}
        <Card className={"border"}>
          <Card.Header>
            <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} />{" "}
            {this.state.id ? "Atualizar reserva" : "Nova reserva"}
          </Card.Header>
          <Form
            onReset={this.resetBooking}
            onSubmit={this.state.id ? this.updateBooking : this.submitBooking}
            id="bookFormId"
          >
            <Card.Body className="text-center">
              <h2 className="text-center">{this.car.model} {this.car.brand}</h2>
              <Image src={this.car.image} rounded fluid />
              <span className="col-sm-12 col-md-4"><b>Cor: </b> {this.car.color} </span>
              <span className="col-sm-12 col-md-4"><b>KM: </b> {this.car.km} </span>
              <span className="col-sm-12 col-md-4"><b>Ano: </b> {this.car.year} </span>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridTitle">
                  <Form.Label>Data Inicial</Form.Label>
                  <DatePicker 
                    selected={this.state.dtini} 
                    name="dtini" 
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => this.setState({dtini: date})}
                    minDate={this.state.currentDate} 
                    startDate={this.state.dtini}
                    endDate={this.state.dtfim} />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridTitle">
                  <Form.Label>Data Final</Form.Label>
                  <DatePicker 
                    selected={this.state.dtfim} 
                    name="dtfim" 
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => this.setState({dtfim: date})}
                    startDate={this.state.dtini}
                    endDate={this.state.dtfim}
                    minDate={this.state.dtini} 
                    maxDate={this.addDays(this.state.dtini,30)} />
                </Form.Group>
                <input type="hidden" name="user_id" value={user} />
                <input type="hidden" name="car_id" value={car} />
              </Form.Row>
            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
              <Button size="sm" variant="success" type="submit">
                <FontAwesomeIcon icon={faSave} />{" "}
                Salvar
              </Button>{" "}
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bookingObject: state.booking,
    carObject: state.car,
    authObject: state.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveBooking: (booking) => dispatch(saveBooking(booking)),
    fetchBooking: (bookingId) => dispatch(fetchBooking(bookingId)),
    fetchCar: (carId) => dispatch(fetchCar(carId)),
    updateBooking: (booking) => dispatch(updateBooking(booking)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
