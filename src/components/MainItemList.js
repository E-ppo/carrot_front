import "../public/css/listForm.css";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadMainposts } from "../redux/modules/post";

function MainItemList() {
  const dispatch = useDispatch();
  const [boardList, setBoardList] = useState();

  const mainPostList = useSelector((state) => state.post.postList);
  const user = useSelector((state) => state.user);


  React.useEffect(() => {
    dispatch(loadMainposts());
  }, [boardList]);

  const navigate = useNavigate();
  return (
    <div className="MainListBox">
      {mainPostList.posts &&
        mainPostList.posts.map((list, index) => (
          <div key={index}>
            {user.userLocation === list.userLocation ? (
              <CardBox className="card">
                <div
                  style={{ display: "flex" }}
                  onClick={() => {
                    navigate("/detail/" + list.postId);
                  }}
                >
                  <Img src={list.postImg} />
                  <TextArea>
                    <span style={{ fontSize: "15px", marginBottom: "5px" }}>
                      {list.title}
                    </span>
                    <span
                      style={{
                        fontSize: "12px",
                        padding: "5px",
                        color: "#AAAAAA",
                      }}
                    >
                      {list.userLocation}
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        padding: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      {list.price}
                    </span>
                  </TextArea>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  ❤️ {list.likeNum}
                </div>
              </CardBox>
            ) : (
              ""
            )}
          </div>
        ))}

      <FixedButton>
        <FaPlus
          onClick={() => {
            navigate("/add");
          }}
        />
      </FixedButton>
    </div>
  );
}

const CardBox = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  border-bottom: 1px solid #DDDDDD;
`;

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  padding: 10px;
`;

const FixedButton = styled.div`
  display: flex;
  position: fixed;
  bottom: 120px;
  right: 30px;
  width: 70px;
  height: 70px;
  font-size: 30px;
  background-color: ${props => props.theme.color.orange};
  color: ${props => props.theme.color.white};
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 6px 0 #999;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
`;

export default MainItemList;
