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
import { editPost } from "../actions/postActions";
const PostEditModal = ({ editPost, postId }) => {
  const [modal, setModal] = useState(false);
  const [text, setText] = useState("");
  const handleToggle = () => setModal(!modal);
  const handleChangeText = (e) => setText(e.target.value);
  const handleOnSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      text,
      id: postId,
    };

    // console.log(newComment);
    editPost(newPost);
    // Close modal
    handleToggle();
  };

  return (
    <div>
      <Button outline color="warning" size="sm" onClick={handleToggle}>
        Edit
      </Button>
      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Edit Post</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              <Label for="comment">Edit Post</Label>
              <Input
                type="text"
                name="text"
                id="comment"
                placeholder="Type Here"
                onChange={handleChangeText}
              />
              <Button
                color="dark"
                size="sm"
                style={{ marginTop: "2rem" }}
                block
              >
                Edit Post
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { editPost })(PostEditModal);
