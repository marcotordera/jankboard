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
import { editPost } from "../actions/postActions";
const PostEditModal = ({ editPost, postId }) => {
  const [modal, setModal] = useState(false);
  const [text, setText] = useState("");
  const [msg, setMsg] = useState(null);

  const handleChangeText = (e) => setText(e.target.value);
  const handleToggle = () => {
    setMsg(null);
    setModal(!modal);
    setText("");
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (text !== "") {
      const newPost = {
        text,
        id: postId,
      };

      // console.log(newComment);
      editPost(newPost);
      // Close modal
      handleToggle();
    } else {
      setMsg("Please enter a message");
    }
  };

  return (
    <div>
      <Button outline color="warning" size="sm" onClick={handleToggle}>
        Edit
      </Button>
      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Edit Post</ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
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
