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
} from "reactstrap";
import { connect } from "react-redux";
import { addPost } from "../actions/postActions";
const PostAddModal = ({ isAuthenticated, addPost }) => {
  const [modal, setModal] = useState(false);
  const [text, setText] = useState("");

  const handleToggle = () => setModal(!modal);

  const handleChangeText = (e) => setText(e.target.value);
  const handleOnSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      text,
    };

    addPost(newPost);
    // Close modal
    handleToggle();
  };

  return (
    <div>
      {isAuthenticated ? (
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={handleToggle}
        >
          New Post
        </Button>
      ) : (
        <h4 className="mb-3 ml-4">Log in to add Post and replies</h4>
      )}

      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Add Post</ModalHeader>
        <ModalBody>
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
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};
const mapStateToProps = (state) => ({
  post: state.post,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { addPost })(PostAddModal);
