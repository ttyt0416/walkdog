import React, { useState, useEffect } from 'react';
import './homepage.styles.scss';

import { dbService } from '../../firebase/firebase.utility';

import Postings from '../../components/postings/postings.components';




const HomePage = ({ userObj }) => {
    const [postings, setPostings] = useState([]);
    useEffect(() => {
      dbService
        .collection("postings")
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
          const postingArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPostings(postingArray);
        });
    }, []);
    return (
      <div className="container">
        <div style={{ marginTop: 30 }}>
          {postings.map((postings) => (
            <Postings key={postings.id} postingObj={postings} isOwner={userObj == null ? false : postings.creatorId === userObj.uid} />
          ))}
        </div>
      </div>
    );
};

export default HomePage;