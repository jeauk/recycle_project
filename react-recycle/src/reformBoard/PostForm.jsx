import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './PostForm.module.css';

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // 메인 이미지 미리보기
  const [videoLink, setVideoLink] = useState("");
  const [steps, setSteps] = useState([{ id: 1, content: "", image: null, imagePreview: null }]); // id와 미리보기 추가

  const [nextId, setNextId] = useState(2); 

  const jwt = sessionStorage.getItem("jwt");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file)); // 메인 이미지 미리보기 설정
  };

  // Step별 데이터 변경 핸들러
  const handleStepChange = (index, field, value) => {
    const newSteps = [...steps];
    if (field === "image") {
      newSteps[index].image = value;
      newSteps[index].imagePreview = URL.createObjectURL(value); // 스텝 이미지 미리보기 설정
    } else {
      newSteps[index][field] = value;
    }
    setSteps(newSteps);
  };

  // Step 추가 핸들러
  const handleAddStep = () => {
    setSteps([...steps, { id: nextId, content: "", image: null, imagePreview: null }]); // 새로운 step에 id와 미리보기 추가
    setNextId(nextId + 1);
  };

  const handleRemoveStep = (id) => {
    setSteps(steps.filter(step => step.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }
    formData.append("videoLink", videoLink);

    steps.forEach((step, index) => {
      formData.append(`steps`, step.content);
      if (step.image) {
        formData.append(`stepImages`, step.image);
      }
    });

    try {
      const response = await fetch("http://localhost:8080/api/posts", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${jwt}`,
        },
        body: formData,
      });

      const textResponse = await response.text();
      console.log("서버 응답 (텍스트):", textResponse);

      if (!response.ok) {
        throw new Error(`게시물을 업로드하는 데 실패했습니다. 상태 코드: ${response.status}`);
      }

      const result = JSON.parse(textResponse);
      alert("게시물이 성공적으로 업로드되었습니다!");
      navigate('/');
    } catch (error) {
      console.error("에러 발생:", error);
      alert(`게시물 업로드 중 문제가 발생했습니다: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
      <label className={styles.label}>제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={styles.inputField}
        />
      </div>
      <div>
      <label className={styles.label}>내용(여기에재료)</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className={styles.textareaField}
        ></textarea>
      </div>
      <div>
        <label>이미지 첨부(대표 완성 사진)</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
          className={styles.fileInput}
        />
        {imagePreview && <img src={imagePreview} alt="미리보기" style={{ width: '200px', marginTop: '10px' }} />}
      </div>
      <div>
        <label>동영상 링크 (유튜브 등)</label>
        <input
          type="text"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
          className={styles.textField}
        />
      </div>

      {steps.map((step, index) => (
        <div key={step.id} className={styles.stepContainer}> {/* 고유한 id를 key로 사용 */}
          <h3 className={styles.stepTitle}>STEP {index + 1}</h3>
          <div>
          <label className={styles.label}>내용</label>
            <textarea
              value={step.content}
              onChange={(e) =>
                handleStepChange(index, "content", e.target.value)
              }
              required
              className={styles.textareaField}
            ></textarea>
          </div>
          <div>
          <label className={styles.label}>이미지 첨부</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleStepChange(index, "image", e.target.files[0])
              }
              className={styles.fileInput}
            />
            {step.imagePreview && <img src={step.imagePreview} alt={`STEP ${index + 1} 미리보기`} className={styles.imagePreview} />}
          </div>
          {/* 스텝이 하나만 남아있을 경우 삭제 버튼 숨기기 */}
          {steps.length > 1 && (
      <button
        type="button"
        className={styles.deleteButton}
        onClick={() => handleRemoveStep(step.id)}
      >X</button>
    )}
        </div>
      ))}
      
      <button type="button" className={styles.addButton} onClick={handleAddStep}>
        + STEP 추가
      </button>

      <button type="submit" >올리기</button>
      <button type="button" className={styles.cancelButton} onClick={() => {
            navigate('/');
          }}>취소</button>
    </form>
  );
};

export default PostForm;
