import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";
import { connect } from "react-redux";
import { addPost } from "../actions/postActions";
const PostAddModal = ({ addPost }) => {
  const [modal, setModal] = useState(false);
  const [text, setText] = useState("");
  const [msg, setMsg] = useState(null);

  const handleToggle = () => {
    setMsg(null);
    setModal(!modal);
    setText("");
  };

  const handleChangeText = (e) => setText(e.target.value);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (text !== "") {
      const newPost = {
        text,
      };

      addPost(newPost);
      // Close modal
      handleToggle();
    } else {
      setMsg("Please enter a message");
    }
  };

  return (
    <div>
      <Button
        color="dark"
        style={{ marginBottom: "2rem" }}
        onClick={handleToggle}
        size="sm"
      >
        New Post
      </Button>

      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Add Post</ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              <Label for="post">Enter Post</Label>
              <Input
                type="text"
                name="text"
                id="post"
                placeholder="Type Here"
                onChange={handleChangeText}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Add Post
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { addPost })(PostAddModal);
