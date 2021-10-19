import React from "react";
import { Card, CardBody } from "reactstrap";

const Tag = ({ tag }) => {
  return (
    <Card >
      <CardBody>
              <h3>{tag.name}</h3>
      </CardBody>
    </Card>
  );
};

export default Tag;
