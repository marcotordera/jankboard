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
import { addComment } from "../actions/postActions";
const CommentAddModal = ({ addComment, postId }) => {
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
      const newComment = {
        text,
        id: postId,
      };

      // console.log(newComment);
      addComment(newComment);
      // Close modal
      handleToggle();
    } else {
      setMsg("Please enter a message");
    }
  };

  return (
    <div>
      <Button outline color="secondary" size="sm" onClick={handleToggle}>
        Reply
      </Button>

      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Add Reply</ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
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
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { addComment })(CommentAddModal);
