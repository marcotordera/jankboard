import React, { useState } from "react";
import { ListGroupItem, Collapse, Button, CardBody, Card } from "reactstrap";
import { connect } from "react-redux";
import CommentAddModal from "./CommentAddModal";
import PostEditModal from "./PostEditModal";
import CommentEditModal from "./CommentEditModal";
import PostDeleteModal from "./PostDeleteModal";
import CommentDeleteModal from "./CommentDeleteModal";
const Post = ({ postId, text, comments, userName, userId, currentUserId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <ListGroupItem
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <div>
        {isShown ? (
          <div className="floatright">
            <Button outline color="primary" size="sm" onClick={toggle}>
              {isOpen ? "Hide" : "Show"}
            </Button>
            <CommentAddModal postId={postId} />
            {userId === currentUserId ? (
              <>
                <PostEditModal postId={postId} />
                <PostDeleteModal postId={postId} text={text} />
              </>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
        <p>{"Posted by: " + userName}</p>
        <p>{text}</p>

        <Collapse isOpen={isOpen}>
          <Card>
            <CardBody>
              {comments.length === 0
                ? "no replies :("
                : comments.map(({ _id, text, userName, userId }) => (
                    <div key={_id}>
                      <Card>
                        <CardBody>
                          {userId === currentUserId ? (
                            <div className="floatright">
                              <CommentEditModal
                                postId={postId}
                                commentId={_id}
                              />
                              <CommentDeleteModal
                                postId={postId}
                                commentId={_id}
                                text={text}
                              />
                            </div>
                          ) : (
                            ""
                          )}

                          <p>{"Posted by: " + userName}</p>
                          <p>{text}</p>
                        </CardBody>
                      </Card>
                    </div>
                  ))}
            </CardBody>
          </Card>
        </Collapse>
      </div>
    </ListGroupItem>
  );
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {})(Post);
