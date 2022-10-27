import "./style.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { instance } from "../../shared/api";
import Swal from "sweetalert2";
import closeModal from "../../asset/closeModal.png";

const PostReportModal = (props) => {
  const { close, postId } = props;
  const navigate = useNavigate();
  const reportList = [
    { id: 0, content: "영리목적의 광고" },
    { id: 1, content: "음란성/선정성 게시글" },
    { id: 2, content: "도배 게시글" },
    { id: 3, content: "개인정보 노출/사생활 침해" },
    { id: 4, content: "기타" },
  ];
  const [checkedItem, setCheckedItem] = useState(new Set());

  const checkHandler = (e) => {
    checkedItemHandler(e.target.value, e.target.checked);
  };
  const checkedItemHandler = (id, isChecked) => {
    if (isChecked) {
      checkedItem.add(id);
      setCheckedItem(checkedItem);
      if (!isChecked && checkedItem.has(id)) {
        checkedItem.delete(id);
        setCheckedItem(checkedItem);
      }
    }
    return checkedItem;
  };

  const onReport = async () => {
    const data = await instance.post(`/api/report/${postId}`, checkedItem);

    if (data.data.success === true) {
      Swal.fire({
        text: "신고 완료 되었습니다.",

        confirmButtonColor: "#47AFDB",
        confirmButtonText: "확인",
      });
      return navigate(-1);
    } else if (data.data.success === false) {
      Swal.fire({
        text: "이미 신고한 게시물입니다.",
        confirmButtonColor: "#47AFDB",
        confirmButtonText: "확인",
      });
    }
  };

  return (
    <div className="report-modal">
      <div className="report-box">
        <button className="close-report" onClick={close}>
          <img className="x-button" src={closeModal} loading="lazy" alt="" />
        </button>
        <div className="report-title">
          <h3>신고 사유</h3>
        </div>
        {reportList.map((item) => (
          <label className="report-label" content={item} key={item.id}>
            <input
              className="report-input"
              type="checkbox"
              name="content"
              id={item.id}
              value={item.content}
              onChange={(e) => checkHandler(e)}
            />
            <div className="report-list">{item.content}</div>
          </label>
        ))}
        <button className="report-button" onClick={onReport}>
          신고하기
        </button>
      </div>
    </div>
  );
};

export default PostReportModal;
