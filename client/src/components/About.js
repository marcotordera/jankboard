import React from "react";
import { CardBody, Card } from "reactstrap";

const About = () => {
  return (
    <div>
      <Card>
        <CardBody>
          <h2>About</h2>
          <p>This is a simple message board developed using MERN</p>
          <p>
            Vieweing the board doesn't need an account. To post,log in with an
            existing account or sign up for an account using a fake e-mail (such
            as tim@tim.com or something).
          </p>
          <p>What I used to make this:</p>
          <ul>
            <li>react</li>
            <li>redux</li>
            <li>axios</li>
            <li>reactstrap</li>
            <li>react router</li>
            <li>node</li>
            <li>express</li>
            <li>mongoDB</li>
            <li>jsonwebtokens</li>
          </ul>
          <a href="https://github.com/marcotordera/jankboard">Repo Link</a>
        </CardBody>
      </Card>
    </div>
  );
};
export default About;
