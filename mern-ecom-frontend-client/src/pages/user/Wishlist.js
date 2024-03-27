import React, { useEffect, useState } from "react";
import Meta from "../../components/Meta";
import BreadCrumb from "../../components/BreadCrumb";
import Container from "../../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getUserWishlist } from "../../features/user/userSlice";
import { addProductToWishlist } from "../../features/product/productSlice";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Spinner } from "react-bootstrap";

const Wishlist = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState({});

  useEffect(() => {
    dispatch(getUserWishlist());
  }, []);

  const wishlist = useSelector((state) => state?.user?.wishlist?.wishlist);

  const handleRemove = (productId) => {
    setLoading((prev) => ({ ...prev, [productId]: true })); // Set loading state to true for this product

    dispatch(addProductToWishlist(productId))
      .unwrap()
      .then(() => setLoading((prev) => ({ ...prev, [productId]: false }))) // Set loading state to false on success
      .catch(() => setLoading((prev) => ({ ...prev, [productId]: false }))); // Set loading state to false on failure
  };

  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title={"Wishlist"} />

      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          {wishlist?.map((product) => {
            return (
              <Card key={product._id} className="mb-5">
                <Card.Img
                  variant="top"
                  src={product.images[0].url}
                  style={{
                    objectFit: "contain",
                    width: "262px",
                    height: "230px",
                  }}
                />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>${product.price}</Card.Text>
                  <Button
                    onClick={() => handleRemove(product._id)}
                    variant="danger"
                    disabled={loading[product._id]}
                  >
                    {loading[product._id] ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      "Remove"
                    )}
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
