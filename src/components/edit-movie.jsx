import React, { useState } from "react";
import { Form, Image, Button } from "react-bootstrap";
import AsyncSelect from 'react-select/async';

const EditMovie = () => {
  const [movie, setMovie] = useState({});
  const [actors, setActors] = useState(null);
  const [validated, setValidated] = useState(false);

  const handleFileUpload = (event) => {
    event.preventDefault();
    var file = event.target.files[0];
    const form = new FormData();
    form.append("imageFile", file);

    fetch(process.env.REACT_APP_API_URL + "/Movie/upload", {
      method: "POST",
      body: form,
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((res) => {
        console.log("res", res);
        var da = movie;
        da.coverImage = res.ProfileImage;
        setMovie((oldData) => {
          return { ...oldData, ...da };
        });
      })
      .catch((err) => err);
  };

  const handleSave = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
    let movieToPost = movie;
    movieToPost.actors = movieToPost.actors.map((x) => x.id);
    if (movie && movie.id > 0) {
      //Put Method

      fetch(process.env.REACT_APP_API_URL + "/Movie/", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Cointent-Type": "application/json",
        },
        body: JSON.stringify(movieToPost),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === true && res.data) {
            setMovie(res.data);
            alert("Updated Sucessfully");
          }
        })
        .catch((err) => err);
    } else {
      //create method
      fetch(process.env.REACT_APP_API_URL + "/Movie", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieToPost),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === true && res.data) {
            setMovie(res.data);
            alert("Created Sucessfully");
          }
        })
        .catch((err) => err);
    }
  };

  //Handling the field change
  const handlingFieldChange = (event) => {
    var da = movie;
    da[event.target.name] = event.target.value;
    setMovie((oldData) => {   
      return { ...oldData, ...da };
    });
  };

  const promiseOptions = (inputValue) => {
   
    return fetch(process.env.REACT_APP_API_URL + "/Person/search/" + inputValue)
      .then((res) => res.json())
      .then((res) => {
        
        if (res.status === true && res.data.length > 0) {
          return res.data.map((x) => {
            return { value: x.id, label: x.name };
          });
        }
        if (res.data.count === 0) {
          alert("There is no actor matching this name");
        }
      })
      .catch((err) => err);
  };

  const multiSelectChange = (data) => {
    setActors(data);
    var people = data.map((x) => {
      return { id: x.value, name: x.label };
    });
    var da = movie;
    da.actors = people;
    setMovie((oldData) => {
      return { ...oldData, ...da };
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSave}>
        <Form.Group className="d-flex justify-content-center">
          <Image
            width="200"
            height="200"
            src={(movie && movie.coverImage) || ""}
          />
        </Form.Group>
        <Form.Group className="d-flex justify-content-center">
          <div>
            <input type="file" onChange={handleFileUpload} />
          </div>
        </Form.Group>
        <Form.Group controlId="formovieTitle">
          <Form.Label>Movie Title</Form.Label>
          <Form.Control
            name="title"
            value={(movie && movie.title) || ""}
            required
            type="text"
            autoComplete="off"
            placeholder="Enter Movie Name"
            onChange={handlingFieldChange}
          />
          <Form.Control.Feedback type="invalid">
            please enter movie name
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formovieDescription">
          <Form.Label>Movie Description</Form.Label>
          <Form.Control
            name="description"
            value={(movie && movie.description) || ""}
            type="textarea"
            rows={3}
            placeholder="Enter Movie Description"
            onChange={handlingFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="formovieReleaseDate">
          <Form.Label>Release Date</Form.Label>
          <Form.Control
            name="relaseDate"
            value={(movie && movie.relaseDate) || ""}
            required
            type="date"
            onChange={handlingFieldChange}
          />
          <Form.Control.Feedback type="invalid">
            please enter movie Release Date
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formovieActors">
          <Form.Label>Actors</Form.Label>
          <AsyncSelect
            cacheOptions
            isMulti
            value={actors}
            loadOptions={promiseOptions}
            onChange={multiSelectChange}
          />
        </Form.Group>

        <Form.Group controlId="formovieLanguage">
          <Form.Label>Movie Language</Form.Label>
          <Form.Control
            name="language"
            value={(movie && movie.language) || ""}
            type="text"
            placeholder="Enter Movie Language"
            onChange={handlingFieldChange}
          />
        </Form.Group>
        <Button type="submit">
          {movie && movie.id > 0 ? "Update" : "Create"}
        </Button>
      </Form>
    </>
  );
};

export default EditMovie;
