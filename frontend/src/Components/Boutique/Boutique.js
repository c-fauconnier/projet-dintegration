import React, { Component } from 'react'
import axios from 'axios'
//import { Link } from 'react-router-dom';
import './Boutique.css'
import {Button} from 'react-bootstrap'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthService from "../services/auth.service";

const API = 'https://bangoo-deploy.herokuapp.com/api/'

class Boutique extends Component {
    constructor(props) {
        super(props);
        this.state = {
          items: [],
          userPoints : 0.0,
          isLoaded: false,
        };
    }
    getPoints() {
        AuthService.getCurrentUser()
            .then((result) => {
                let points = result.data.points;
                document.getElementById('vosPoints').innerHTML = points;
        });
    }
    componentDidMount() {
        axios.get(API+'offers')
            .then((result) => {
            this.setState({
                isLoaded: true,
                items: result.data
            });
        });
        
        AuthService.getCurrentUser() 
                .then((result) => {
                    this.setState({
                        userPoints: result.data.points,
                    });
                });
        this.intervalPoints = setInterval(this.getPoints, 1000);
    }
          
    componentWillUnmount() {
        clearInterval(this.intervalPoints);
    }

    add_to_user = (e) =>{
        let nameOffer = e.currentTarget.name
        axios.get(API+'user/add_offer/'+e.currentTarget.id,{
            withCredentials:true,
            })
        .then(res => {
                let msg = res.data.msg
                let points = res.data.points
            if (msg === "OK"){
              toast('Le cadeau : '+ nameOffer +' a été ajouté à votre compte !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                });
                document.getElementById("vosPoints").innerHTML = points;
               }


            else if (msg === "ERROR"){
                    toast.error("Vous n'avez pas assez de points", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        });
            }
            
        })
    }
    
    render() {
        const { items } = this.state;

        if (!this.state.isLoaded) {
          return <div id='vosPoints'> Chargement ... </div>;
        } else {
          return (
            <div class="container py-5 my-5">
                <div className="mb-5">
                    <h1 className='title'>Notre boutique</h1>
                    <h2 className='title' >Votre nombre de points : <span id="vosPoints">{this.state.userPoints}</span></h2>
                </div>
                
                <div class="row">
                    <div class="col-lg-7 mx-auto">
                    <ul className="list-group shadow">
                    {items.map((offer) => (
                        <li className="list-group-item">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-lg-6">
                                    <h3 className="mt-4 font-weight-bold mb-2">{offer.name}</h3>
                                    <p className="text-muted">{offer.description}</p>
                                    <h5 className="font-weight-bold my-2">{offer.price} Points</h5>
                                </div>
                                <div className="col-lg-6 text-center">
                                    <div className='box "my-3'>
                                    </div>
                                    <div className="my-3">
                                        <Button type="button" name={offer.name} id={offer._id} variant="btn btn-outline-success"  onClick={this.add_to_user}>Ajouter au compte</Button>                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    ))}
                    </ul>
                    </div>
                </div>
            </div>
          );
        }
    }
}

export default Boutique;