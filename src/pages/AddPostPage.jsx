import React from "react";
import PageContainer from "../components/wrapper/PageContainer";
import Headers from "../components/layout/Headers";
import AddPost from "../components/post/AddPost";
import Footers from "../components/layout/Footers";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getMyinfo } from "../redux/modules/myinfo";

const AddPostPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("ACCESS_TOKEN") !== null) {
      dispatch(getMyinfo()).then((response) => {
        // console.log(response.payload[0].interested);
        if (response.payload[0].interested === null) {
          navigate("/choice");
        }
      });
    }
  });

  return (
    <div>
      <PageContainer>
        <AddPost />
      </PageContainer>
    </div>
  );
};

export default AddPostPage;
