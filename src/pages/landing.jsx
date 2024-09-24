import React,{useState} from 'react';
import {Row,Col,Button} from 'react-bootstrap';
import MovieList from '../components/movie-list';
import CreateMovie from '../components/create-movie';
import EditMovie from '../components/edit-movie';


const Landing=()=>{

    const[show,setShow]=useState(false)


    return(
        <>
        <Row>
            <Col xs={12} md={10}>
            <h2>Movies</h2>
            </Col>
            <Col xs={12} md={10} className="align-self-center">
            <Button className="float-right" onClick={()=>setShow(true)}>Add New Movie</Button>
            </Col>
        </Row>
        <MovieList/>
        <CreateMovie  show={show} handleClose={()=> setShow(false)}/>

        </>
    );
};

export default Landing;