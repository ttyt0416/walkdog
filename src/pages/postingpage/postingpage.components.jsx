import React, {useState} from 'react';
import './postingpage.styles.scss';

import { useHistory } from 'react-router-dom'

import { v4 as uuidv4 } from "uuid";

import {storageService, dbService} from '../../firebase/firebase.utility';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const PostingPage = ({ userObj }) => {
    const [posting, setPosting] = useState('');
    const [time, setTime] = useState('');
    const [satisfy, setSatisfy] = useState('');
    const [attachment, setAttachment] = useState('');
    let history = useHistory();

    const onSubmit = async (event) => {
        event.preventDefault();
        if (posting === '' || time === '' || satisfy === '') {
            return;
        }
        let attachmentUrl = '';
        if (attachment !== "") {
          const attachmentRef = storageService
            .ref()
            .child(`${userObj.uid}/${uuidv4()}`);
          const response = await attachmentRef.putString(
            attachment,
            "data_url"
          );
          attachmentUrl = await response.ref.getDownloadURL();
        }
        const postingObj = {
            liked: new Array,
            description: posting,
            time: time,
            satisfy: satisfy,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        };
        await dbService.collection('postings').add(postingObj);
        setPosting('');
        setTime('');
        setSatisfy('');
        setAttachment('');
        history.push('/');
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setPosting(value);
    };

    const onTimeChange = (event) => {
      const {
          target: { value },
      } = event;
      setTime(value);
  };

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
            setAttachment(result);
        };
        if (Boolean(theFile)) {
            reader.readAsDataURL(theFile);
        }
        // if (theFile) {
        //       reader.readAsDataURL(theFile);
        //   }  
    };
    
    const onClearAttachment = () => setAttachment('');

    return (
      <form onSubmit={onSubmit} className="postingPage__form">
        <div className="postingPage__attachment">
          <label className="postingPage__clear" onClick={onClearAttachment}>
            <img className="postingPage__attachedImg" src={attachment} alt="" />
            <FontAwesomeIcon icon={faTimes} />
          </label>
          
          <input
            className="postingPage__addImg"
            type="file"
            files
            multiple
            accept="image/*"
            onChange={onFileChange}
          />
        </div>
        <div className="postingPage__container">
          <div className="postingPage__inputs">
            <textarea
              className="postingPage__describe"
              value={posting}
              onChange={onChange}
              type="text"
              rows="7"
              cols="40"
              placeholder="???????????? ??????????????????"
            />
            <label>
              ?????? ??????
              <input
                className="postingPage__time"
                value={time}
                onChange={onTimeChange}
                type="number"
              />
              ???
            </label>
          </div>

          <div className="postingPage__radios">
            <span className="postingPage__radio--span">?????????</span>
            <label>
              <input
                className="postingPage__radio"
                value='?????? ?????????'
                name="satisfiction"
                type="radio"
                onClick={() => setSatisfy('?????? ?????????')}
              />
              ?????? ?????????
            </label>
            <label>
              <input
                className="postingPage__radio"
                value='?????????'
                name="satisfiction"
                type="radio"
                onClick={() => setSatisfy('?????????')}
              />
              ?????????
            </label>
            <label>
              <input
                className="postingPage__radio"
                value='??????'
                name="satisfiction"
                type="radio"
                onClick={() => setSatisfy('??????')}
              />
              ??????
            </label>
            <label>
              <input
                className="postingPage__radio"
                value='??????'
                name="satisfiction"
                type="radio"
                onClick={() => setSatisfy('??????')}
              />
              ??????
            </label>
            <label>
              <input
                className="postingPage__radio"
                value='?????? ??????'
                name="satisfiction"
                type="radio"
                onClick={() => setSatisfy('?????? ??????')}
              />
              ?????? ??????
            </label>
          </div>
          <input type="submit" value="&rarr;" className="postingPage__arrow" />
        </div>
      </form>
    );
};

export default PostingPage;