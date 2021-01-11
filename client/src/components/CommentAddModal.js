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
import { addComment } from "../actions/postActions";
const CommentAddModal = ({ isAuthenticated, addComment, postId }) => {
  const [modal, setModal] = useState(false);
  const [text, setText] = useState("");

  const handleToggle = () => setModal(!modal);

  const handleChangeText = (e) => setText(e.target.value);
  const handleOnSubmit = (e) => {
    e.preventDefault();

    const newComment = {
      text,
      id: postId,
    };

    // console.log(newComment);
    addComment(newComment);
    // Close modal
    handleToggle();
  };

  return (
    <div>
      {isAuthenticated ? (
        <Button outline color="secondary" size="sm" onClick={handleToggle}>
          Reply
        </Button>
      ) : (
        ""
      )}

      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Add Reply</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              <Label for="comment">Enter Reply</Label>
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
                Add reply
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
export default connect(mapStateToProps, { addComment })(CommentAddModal);
