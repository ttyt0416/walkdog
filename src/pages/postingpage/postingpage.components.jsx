import React, {useState} from 'react';
import './postingpage.styles.scss';

import { v4 as uuidv4 } from "uuid";

import {storageService, dbService} from '../../firebase/firebase.utility';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const PostingPage = ({ userObj }) => {
    const [posting, setPosting] = useState('');
    const [attachment, setAttachment] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        if (posting === '') {
            return;
        }
        let attachmentUrl = '';
        if (attachment !== '') {
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, 'data_url');
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

    return (
        <form onSubmit={onSubmit} className='postingForm'>
            <div className='postingInput__container'>
                <input className='postingInput__input' value={posting} onChange={onChange} type='text'/>
                <input type='submit' value='&rarr;' className='postingInput__arrow' />
            </div>
            <label for='attach-file' className='postingInput__label'>
                <span>사진 추가</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input id='attach-file' type='file' accept='image/*' onChange={onFileChange} />
        </form>
    )
}

export default PostingPage;