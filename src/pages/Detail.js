import { BiLeftArrowAlt } from "react-icons/bi";
import { BsPersonCircle, BsHeart, BsHeartFill } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineIosShare } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { carrotGetPost } from "../redux/modules/post";

function Detail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [heart, setHeart] = useState(false); // 찜하기
  const postDetail = useSelector((state) => state.post.post);
  const postPrice = postDetail.price;

  console.log(postDetail);

  // 금액 콤마(,) 찍어서 보여주기
  let carrotPrice = postPrice?.toLocaleString("ko-KR");
  //console.log(carrotPrice);

  useEffect(() => {
    dispatch(carrotGetPost());
  }, []);

  const likeHeart = () => {
    if (heart) {
      setHeart(false);
    } else {
      setHeart(true);
    }
  };

  return (
    <Wrap>
      <Header>
        <div>
          <BiLeftArrowAlt
            onClick={() => {
              navigate("/");
            }}
          />
          <AiOutlineHome />
        </div>
        <div>
          <MdOutlineIosShare />
          <FiMoreVertical />
        </div>
      </Header>

      <div>
        <img src={postDetail.postImg} />
      </div>

      <Container>
        <ProfileBar>
          <Profile>
            <BsPersonCircle size="35" />
            <div>
              <p>모모로</p>
              <p>성수동</p>
            </div>
          </Profile>

          <p>매너온도</p>
        </ProfileBar>

        <Contents>
          <p>{postDetail.title}</p>
          <p>{postDetail.category}</p>
          <p>{postDetail.content}</p>
        </Contents>
      </Container>
      <Footer>
        <Heart>
          {heart ? (
            <BsHeartFill size="35" color="red" onClick={likeHeart} />
          ) : (
            <BsHeart size="35" onClick={likeHeart} />
          )}
          {/* // <BsHeart size="35" onClick={likeHeart} /> */}
          {/* <BsHeartFill /> */}
        </Heart>
        <Price>
          <div>
            <p>{carrotPrice}원</p>
            <p>가격 제안하기</p>
          </div>
          <button>채팅하기</button>
        </Price>
      </Footer>
    </Wrap>
  );
}

const Wrap = styled.div`
  box-sizing: border-box;

  img {
    background-size: cover;
    background-position: center;
    height: 400px;
    width: 100%;
  }
`;

const Container = styled.div`
  padding: 16px 16px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 16px 16px;
  color: gray;
  font-size: 23px;
  position: absolute;
`;

const ProfileBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid #dadada;

  p {
    font-size: 13px;
  }
`;

const Profile = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100px;
  line-height: 20px;

  div > p:first-child {
    font-weight: 600;
    font-size: 16px;
  }
`;

const Contents = styled.div`
  padding-top: 35px;
  line-height: 30px;

  & p:first-child {
    font-weight: 600;
  }
  & p:nth-child(2) {
    font-size: 13px;
    text-decoration: underline;
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  height: 70px;
  position: absolute;
  width: 100%;
  bottom: 0;
  border-top: 1px solid #dadada;
`;

const Heart = styled.div`
  width: 20%;
  text-align: center;
  align-items: center;
`;

const Price = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  padding: 5px 16px;
  border-left: 1px solid #dadada;
  line-height: 25px;
  align-items: center;

  div :first-child {
    font-weight: 600;
  }
  div :last-child {
    color: #ff7e36;
    font-size: 14px;
  }
  button {
    background-color: #ff7e36;
    border: none;
    border-radius: 5px;
    width: 90px;
    height: 40px;
    color: white;
  }
`;

export default Detail;
