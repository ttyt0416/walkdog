import React, {useState} from 'react';

import { dbService, storageService } from '../../firebase/firebase.utility';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Postings = ({ postingObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newPosting, setNewPosting] = useState(postingObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("이 글을 삭제하시겠습니까?");
        if (ok) {
          await dbService.doc(`postings/${postingObj.id}`).delete();
          await storageService.refFromURL(postingObj.attachmentUrl).delete();
        }
    };

    const toggleEditing = () => setEditing((prev) => !prev);

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`postings/${postingObj.id}`).update({
            text: newPosting,
        });
        setEditing(false);
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewPosting(value);
    };

    return (
        <div className='posting'>
            {editing ? (
                <>
                <form onSubmit={onSubmit} className="posting__container">
                    <input
                    type="text"
                    value={newPosting}
                    required
                    autoFocus
                    onChange={onChange}
                    className="formInput"
                    />
                    <input type="submit" value="글 수정" className="formBtn" />
                </form>
                <span onClick={toggleEditing} className="formBtn cancelBtn">
                    Cancel
                </span>
                </>
            ) : (
                <>
                <h4>{postingObj.text}</h4>
                {postingObj.attachmentUrl && <img src={postingObj.attachmentUrl} alt=''/>}
                {isOwner && (
                    <div class="nweet__actions">
                    <span onClick={onDeleteClick}>
                        <FontAwesomeIcon icon={faTrash} />
                    </span>
                    <span onClick={toggleEditing}>
                        <FontAwesomeIcon icon={faPencilAlt} />
                    </span>
                    </div>
                )}
                </>
            )}
        </div>
    )
};

export default Postings;