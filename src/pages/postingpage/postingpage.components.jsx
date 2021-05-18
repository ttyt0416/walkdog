import React, {useState} from 'react';
import './postingpage.styles.scss';

import { useHistory } from 'react-router-dom'

import { v4 as uuidv4 } from "uuid";

import {storageService, dbService} from '../../firebase/firebase.utility';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const PostingPage = ({ userObj }) => {
    const [posting, setPosting] = useState('');
    const [attachment, setAttachment] = useState('');
    let history = useHistory();

    const onSubmit = async (event) => {
        event.preventDefault();
        if (posting === '') {
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
            text: posting,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        };
        await dbService.collection('postings').add(postingObj);
        setPosting('');
        setAttachment('');
        history.push('/');
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setPosting(value);
    };

    const onFileChange = (event) => {
        const {
            target: { files },
        } = event;
        const theFile = files[0];
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
    };
    
    const onClearAttachment = () => setAttachment('');

    return (
      <form onSubmit={onSubmit} className="postingPage__form">
        <div className="postingPage__container">
          <input
            className="postingPage__input"
            value={posting}
            onChange={onChange}
            type="text"
            maxLength={500}
          />
          <input type="submit" value="&rarr;" className="postingPage__arrow" />
        </div>
        <label for="attach-file" className="postingPage__label">
          <span>사진 추가</span>
          <FontAwesomeIcon icon={faPlus} />
        </label>
        <input
          id="attach-file"
          type="file"
          multiple
          accept="image/*"
          onChange={onFileChange}
        />

        <div className="postingPage__attachment">
          <img src={attachment} />
          <div className="postingPage__clear" onClick={onClearAttachment}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      </form>
    );
};

export default PostingPage;