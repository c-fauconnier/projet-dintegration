import React, { Component } from "react";
import AuthService from "../services/auth.service";
import '../Login/Login.css';
import './Profile.css';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {},
      isLoaded: false,
      points: 0
    };
  }
  getPoints() {
    AuthService.getCurrentUser()
        .then(() => {
        });
  }
  componentDidMount() {
    AuthService.getCurrentUser()
        .then((result) => {
            this.setState({
                currentUser: result.data,
                isLoaded:true
            });
        });
    this.intervalPoints = setInterval(this.getPoints, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalPoints);
  }
  delete() {
    AuthService.deleteUser()
      .then(() => {
        window.location.href = "/Articles";
      })
  }
  disconnect() {
    AuthService.deleteCurrentUser()
      .then(() => {
        window.location.href = "/Login";
      })
  }

  render() {
    const { currentUser } = this.state;
    const ColoredLine = ({ color }) => (
      <hr
        style={{
          color,
          backgroundColor: color,
          height: 1
        }}
      />
    );
    if(!this.state.isLoaded){
      return (
        <div>chargement...</div>
      )
    }
    return (
      <div className="profil">
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.name}</strong>
          </h3>
        </header>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.mail}
        </p>
        <p>
          <strong>Role:</strong>{" "}
          {currentUser.role}
        </p>
        <p>
          <strong>Points:</strong>{" "}
          {currentUser.points}
        </p>
        <p>
          <strong>Mes cadeaux</strong>{" "}
          <div>
            {currentUser.userOffers.map((offer) => (
                <p>
                <div>{offer.name}</div>
                <div>{offer.description}</div>
                <ColoredLine color="grey"/>
                </p>
            ))}
          </div>
        </p>
      </div>
      <div className="d-flex justify-content-around">
        <button
                //type="submit"
                className="btn btn-dark btn-bg"
                id="Déconnexion"
                onClick={this.disconnect}
                >
                    Déconnexion
          </button>
          <button
                //type="submit"
                className="btn btn-dark btn-bg"
                id="Historique"
                onClick={this.disconnect}
                >
                    Historique des commandes
          </button>
        </div>
        <div className="d-flex justify-content-center">
          <button
                //type="submit"
                className="btn btn-dark btn-bg"
                id="Suppression"
                onClick={this.delete}
                >
                    Supprimer mon compte
          </button>
        </div>
      </div>
    );
  }
}