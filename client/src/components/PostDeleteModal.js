import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, Form } from "reactstrap";
import { connect } from "react-redux";
import { deletePost } from "../actions/postActions";
const PostDeleteModal = ({ deletePost, postId, text }) => {
  const [modal, setModal] = useState(false);
  const handleToggle = () => setModal(!modal);
  const handleOnSubmit = (e) => {
    deletePost(postId);
    // Close modal
    handleToggle();
  };

  return (
    <div>
      <Button outline color="danger" onClick={handleToggle}>
        Delete
      </Button>
      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Are you sure?</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleOnSubmit}>
            <p>{text}</p>
            <Button outline color="danger" onClick={handleOnSubmit}>
              Delete Post
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { deletePost })(PostDeleteModal);
