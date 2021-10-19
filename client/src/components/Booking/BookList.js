import React, { Component } from "react";

import { connect, useSelector } from "react-redux";
import { deleteBooking } from "../../services/index";

import "./../../assets/css/Style.css";
import {
  Card,
  Table,
  Image,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import MyToast from "../MyToast";
import axios from "axios";

class BookingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booking: [],
    };
    if(!auth.isLoggedIn) {
      return props.history.push("/login");
    } 
    this.auth = useSelector((state) => state.auth);
  }

  componentDidMount() {
    this.findUserBooking(this.auth.iduser);
  }

  findUserBooking(user) {
    axios
      .get(
        "http://localhost:8080/rest/bookings?user=" + user
      )
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          booking: data.content,
        });
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("jwtToken");
        this.props.history.push("/");
      });
  }

  deleteBooking = (bookingId) => {
    this.props.deleteBooking(bookingId);
    setTimeout(() => {
      if (this.props.bookingObject != null) {
        this.setState({ show: true });
        setTimeout(() => this.setState({ show: false }), 3000);
        return props.history.push("/cars");
      } else {
        this.setState({ show: false });
      }
    }, 1000);
  };

  searchChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { booking} = this.state;

    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={"Reserva cancelada."}
            type={"danger"}
          />
        </div>
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <div style={{ float: "left" }}>
              <FontAwesomeIcon icon={faList} /> Reserva
            </div>
          </Card.Header>
          <Card.Body>
            <Table bordered hover striped variant="dark">
              <thead>
                <tr>
                  <th>Início</th>
                  <th>Fim</th>
                  <th>Carro</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {booking.length === 0 ? (
                  <tr align="center">
                    <td colSpan="7">Sem reserva.</td>
                  </tr>
                ) : (
                  booking.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.dtini}</td>
                      <td>{booking.dtfim}</td>
                      <td>
                        <Image
                          src={booking.car.image} 
                          width="150"
                          height="150"
                        />{" "}
                      </td>
                      <td>
                        <ButtonGroup>
                          <Link
                            to={"edit/" + booking.id}
                            className="btn btn-sm btn-outline-primary"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>{" "}
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => this.deleteBooking(booking.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bookingObject: state.booking,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteBooking: (bookingId) => dispatch(deleteBooking(bookingId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingList);
