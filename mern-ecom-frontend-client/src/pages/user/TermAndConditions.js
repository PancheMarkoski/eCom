import React from "react";
import Meta from "../../components/Meta";
import BreadCrumb from "../../components/BreadCrumb";
import Container from "../../components/Container";
const TermAndConditions = () => {
  return (
    <>
      <Meta title={"Term And Conditions"} />
      <BreadCrumb title={"Term And Conditions"} />
      <Container class1="policy-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="policy">TermAndConditions</div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default TermAndConditions;
