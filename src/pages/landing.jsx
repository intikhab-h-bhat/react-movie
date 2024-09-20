import React from 'react';
import {Row,Col,Button} from 'react-bootstrap';
import MovieList from '../components/movie-list';
import CreateMovie from '../components/create-movie';

const Landing=()=>{
    return(
        <>
        <Row>
            <Col xs={12} md={10}>
            <h2>Movies</h2>
            </Col>
            <Col xs={12} md={10} className="align-self-center">
            <Button className="float-right" onClick={()=>{}}>Add New Movie</Button>
            </Col>
        </Row>

        <MovieList/>
        <CreateMovie/>

        </>
    );
};

export default Landing;