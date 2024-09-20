import React from 'react'
import {Row,Col} from 'react-bootstrap'

const MovieItems=(props)=>{

    return(
        <>
        <Row>
        <Col item xs="12" md="2">
        <img src={props.data.coverImage || "no Image"} style={{height:150, width:150}}/>
        </Col>
        <Col item xs="12" md="10">
        <div><b>{props.data.title}</b></div>
        <div>Actors{props.data.actors.map(x=>x.name).join(" , ")}</div>
        </Col>
        <Col>
        <hr></hr></Col>
        </Row>
        </>

    );
};

export default MovieItems