import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Spinner, Alert, Card } from "react-bootstrap";
import axios from "axios";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  // keep track of the product data we get back from the API
  // set to null so it is undefined and will only be defined when we set our product data.  prevents us from getting an empty card with empty object data
  const [product, setProduct] = useState(null);

  const addProduct = async () => {
    const response = await axios.post("https://fakestoreapi.com/products", {
      title: title,
      price: 13.5,
      description: "lorem ipsum set",
      image: "https://i.pravatar.cc",
      category: "electronic",
    });
    return response.data;
  };

  //useMutation is for Post/Put/Delete/any API method where we want to modify our data
  //mutate calls our mutationFn (like refetch for useQuery).  our useMutation doesn't run by default so we need to run it manually with this function
  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: addProduct, //calls the addProduct function when we call mutate()
    // onSuccess runs whenever our mutation Function succeeds
    onSuccess: (data) => {
      console.log(data);
      // set our product state to our data after our mutation function runs
      setProduct(data);
    },
  });

  if (isLoading) {
    return <Spinner animation="grow" />;
  }

  if (isError) {
    return <Alert>{error.message}</Alert>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    mutate();
  };

  return (
    <>
      {product && (
        <Card key={product.id} style={{ width: "18rem" }}>
          <Card.Img variant="top" src={product.image} />
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
          </Card.Body>
        </Card>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          placeholder="Title"
          value={title} // connected to our title state after we do our onChange
          onChange={(event) => setTitle(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default AddProduct;
