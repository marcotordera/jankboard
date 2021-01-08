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
import { editComment } from "../actions/postActions";
const CommentEditModal = ({ editComment, postId, commentId }) => {
  const [modal, setModal] = useState(false);
  const [text, setText] = useState("");
  const handleToggle = () => setModal(!modal);
  const handleChangeText = (e) => setText(e.target.value);
  const handleOnSubmit = (e) => {
    e.preventDefault();

    const newComment = {
      text,
      postId: postId,
      commentId: commentId,
    };

    // console.log(newComment);
    editComment(newComment);
    // Close modal
    handleToggle();
  };

  return (
    <div>
      <Button outline color="warning" onClick={handleToggle}>
        Edit
      </Button>
      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Edit Comment</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              <Label for="comment">Enter Comment</Label>
              <Input
                type="text"
                name="text"
                id="comment"
                placeholder="Type Here"
                onChange={handleChangeText}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
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
export default connect(mapStateToProps, { editComment })(CommentEditModal);
