import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { sortMostComment, sortLatestPost } from "../actions/postActions";

const SortDropDown = ({ sortMostComment, sortLatestPost, post }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const mostComments = (e) => {
    sortMostComment(post.posts);
  };
  const latest = (e) => {
    sortLatestPost(post.posts);
  };
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} size="sm">
      <DropdownToggle caret>sort by</DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={latest}>Latest</DropdownItem>
        <DropdownItem onClick={mostComments}>Most comments</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
const mapStateToProps = (state) => ({ post: state.post });
export default connect(mapStateToProps, { sortMostComment, sortLatestPost })(
  SortDropDown
);
