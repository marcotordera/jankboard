import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, Form } from "reactstrap";
import { connect } from "react-redux";
import { deleteComment } from "../actions/postActions";
const CommentDeleteModal = ({ deleteComment, postId, commentId, text }) => {
  const [modal, setModal] = useState(false);
  const handleToggle = () => setModal(!modal);
  const handleOnSubmit = (e) => {
    const post = {
      postId: postId,
      commentId: commentId,
    };
    deleteComment(post);
    // Close modal
    handleToggle();
  };

  return (
    <div>
      <Button outline color="danger" size="sm" onClick={handleToggle}>
        Delete
      </Button>
      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Are you sure?</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleOnSubmit}>
            <p>{text}</p>
            <Button outline color="danger" size="sm" onClick={handleOnSubmit}>
              Delete Reply
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { deleteComment })(CommentDeleteModal);
