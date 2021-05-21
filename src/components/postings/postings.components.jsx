import React, {useState} from 'react';
import './postings.styles.scss';

import { dbService, storageService } from '../../firebase/firebase.utility';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt, faTimes, faThumbsUp as thumbSolid } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as thumbLight } from '@fortawesome/free-regular-svg-icons'

const Postings = ({ postingObj, isLoggedIn, isOwner, userObj }) => {
    const [editing, setEditing] = useState(false);
    const [like, setLike] = useState(false);
    let [newLiked, setNewLiked] = useState(postingObj.liked);
    const [newAttach, setNewAttach] = useState(postingObj.attachmentUrl);
    const [newPosting, setNewPosting] = useState(postingObj.description);
    const [newTime, setNewTime] = useState(postingObj.time);
    const [newSatisfy, setNewSatisfy] = useState(postingObj.satisfy);

    const onDeleteClick = async () => {
        const ok = window.confirm("이 글을 삭제하시겠습니까?");
        if (ok) {
          await dbService.doc(`postings/${postingObj.id}`).delete();
          await storageService.refFromURL(postingObj.attachmentUrl).delete();
        }
    };

    const toggleEditing = () => setEditing((prev) => !prev);
    
    const toggleLike = () => setLike((prev) => !prev);

    const onSubmit = async (event) => {
        event.preventDefault();
        if (newAttach === '' || newPosting === '' || newTime === '' || newSatisfy === '') {
          return;
        }
        await dbService.doc(`postings/${postingObj.id}`).update({
            attachmentUrl: newAttach,
            description: newPosting,
            time: newTime,
            satisfy: newSatisfy
        });
        setEditing(false);
    };

    const onChange = (event) => {
      const {
        target: { value },
      } = event;

      setNewPosting(value);
    };

    const onTimeChange = (event) => {
      const {
        target: { value },
      } = event;

      setNewTime(value);
    }

    const onFileChange = (event) => {
      const {
          target: { files },
      } = event;
      const theFile = files[0];
      // const theFile = [files];
      const reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
          const {
              currentTarget: { result },
          } = finishedEvent;
          setNewAttach(result);
      };
      if (Boolean(theFile)) {
          reader.readAsDataURL(theFile);
      }
      // if (theFile) {
      //       reader.readAsDataURL(theFile);
      //   }  
  };

  const onClearNewAttachment = () => setNewAttach('');

  const onLike = async () => {
    setNewLiked(newLiked += 1)
    await dbService.doc(`postings/${postingObj.id}`).update({
      liked: newLiked
    });
    toggleLike();
    
    // await firebase.dbService.collection('postings').doc(`${postingObj.id}`).update({
    //   liked: firebase.dbService.FieldValue.arrayUnion(userObj.uid),
    // });
    // toggleLike();
    // console.log([postingObj.liked]);
  }

  const onUnlike = async() => {
    setNewLiked(newLiked -= 1)
    await dbService.doc(`postings/${postingObj.id}`).update({
      liked: newLiked
    });
    toggleLike();
  }
  
    return (
      <div className="posting">
        {editing ? (
          <>
            <form onSubmit={onSubmit} className="posting__edit">
              <div className="posting__edit-attachment">
                <label
                  className="posting__edit-clear"
                  onClick={onClearNewAttachment}
                >
                  <img
                    className="posting__edit-attachmentImg"
                    src={newAttach}
                    alt=""
                  />
                  <FontAwesomeIcon icon={faTimes} />
                </label>
                <input
                  type="file"
                  files
                  multiple
                  accept="image/*"
                  className="posting__edit-file"
                  onChange={onFileChange}
                />
              </div>
              <div className="posting__edit-inputs">
                <textarea
                  rows="7"
                  cols="40"
                  value={newPosting}
                  name="post"
                  required
                  autoFocus
                  onChange={onChange}
                  className="posting__edit-input"
                />
                <input
                  type="text"
                  value={newTime}
                  name="time"
                  required
                  autoFocus
                  onChange={onTimeChange}
                  className="posting__edit-input"
                />
                <div className="posting__edit-radios">
                  <label>
                    <input
                      className="posting__edit-radio"
                      value="매우 불만족"
                      name="satisfiction"
                      type="radio"
                      onClick={() => setNewSatisfy("매우 불만족")}
                    />
                    매우 불만족
                  </label>
                  <label>
                    <input
                      className="posting__edit-radio"
                      value="불만족"
                      name="satisfiction"
                      type="radio"
                      onClick={() => setNewSatisfy("불만족")}
                    />
                    불만족
                  </label>
                  <label>
                    <input
                      className="posting__edit-radio"
                      value="보통"
                      name="satisfiction"
                      type="radio"
                      onClick={() => setNewSatisfy("보통")}
                    />
                    보통
                  </label>
                  <label>
                    <input
                      className="posting__edit-radio"
                      value="만족"
                      name="satisfiction"
                      type="radio"
                      onClick={() => setNewSatisfy("만족")}
                    />
                    만족
                  </label>
                  <label>
                    <input
                      className="posting__edit-radio"
                      value="매우 만족"
                      name="satisfiction"
                      type="radio"
                      onClick={() => setNewSatisfy("매우 만족")}
                    />
                    매우 만족
                  </label>
                </div>

                <input
                  type="submit"
                  value="글 수정"
                  className="posting__edit-btn"
                />
                <span
                  onClick={toggleEditing}
                  className="posting__edit-btn posting__edit-cancel"
                >
                  취소
                </span>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="posting__posts">
              {postingObj.attachmentUrl && (
                <img
                  className="posting__img"
                  src={postingObj.attachmentUrl}
                  alt=""
                />
              )}
              <div className="posting__content">
                <div className="posting__strings">
                  <div className="posting__description">
                    {postingObj.description}
                  </div>
                  <span>시간: {postingObj.time}분</span>
                  <span>만족도: {postingObj.satisfy}</span>
                </div>
                {isOwner ? (
                  <div class="posting__actions">
                    <span onClick={onDeleteClick}>
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                    <span onClick={toggleEditing}>
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </span>
                  </div>
                ) : (
                  isLoggedIn && (
                    <div className="posting__like">
                      {like ? (
                        <div onClick={ onUnlike }>
                          <FontAwesomeIcon icon={thumbSolid} />
                        </div>
                      ) : (
                        <div onClick={ onLike }>
                          <FontAwesomeIcon icon={thumbLight} />
                        </div>
                      )}
                      <div className='posting__liked-num'>
                        {postingObj.liked}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
};

export default Postings;