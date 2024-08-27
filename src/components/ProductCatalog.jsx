import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Alert, Spinner, Card } from "react-bootstrap";

const ProductCatalog = () => {
  const fetchProducts = async () => {
    const response = await axios.get("https://fakestoreapi.com/products");

    // response.data gives us direct access to the json data that we need
    return response.data;
  };

  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products"], // unique key for our query.  react query keeps track of this key to know if data was fetched or not
    queryFn: fetchProducts, // function to run in order to receive our data
    enabled: false, // set to false in order to not run the query function automatically.  can run manually with refetch()
    retry: 3, // retries our api call until it hits 3 failures.  used to ensure that the API is down/something is wrong with it
    staleTime: 5000, //time in milliseconds that specifies how long we need to wait in order to refetch our data
    gcTime: 5000, 
  });

  if (isLoading) {
    return <Spinner animation="grow" />;
  }

  if (isError) {
    return <Alert>{error.message}</Alert>;
  }

  return (
    <div>
      <button onClick={refetch}>Get Data</button>

        {/* Conditional Rendering && method
        checks the defined status/conditional of the left hand side of the &&, if it exists render what is on the right-hand side
        */}
        {/* if products is undefined, don't display anything
        if products DOES have data, go through the .map process
        */}
        {/* prevents us from getting an error */}
      {products && products.map((product) => (
        <Card key={product.id} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
                <Card.Title>{product.title}</Card.Title>
            </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default ProductCatalog;
