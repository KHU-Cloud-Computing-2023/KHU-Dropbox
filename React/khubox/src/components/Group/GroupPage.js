import React, { useState, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GroupQuery from './GroupQuery';
import JoinedGroups from './JoinedGroups';
// import InviteForm from './InviteForm';
import '../../css/GroupPage.css';
import Navbar from '../Navbar';
import imageSrc from '../image9.png';

function GroupPage() {
  const [queryKeyword, setQueryKeyword] = useState('');
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const newGroupNameRef = useRef('');

  const handleNewGroupSubmit = async (event) => {
    event.preventDefault();
    const newGroupName = newGroupNameRef.current.value;
    try {
      const response = await createGroup(newGroupName); // create group request
      if (response) {
        const newGroup = { name: newGroupName };
        setJoinedGroups([...joinedGroups, newGroup]);
      }
    } catch (error) {
      console.error('Error creating group:', error);
      // handle error
    }
    newGroupNameRef.current.value = '';
  };


  const createGroup = (groupName) => {
    return fetch(`http://34.234.42.198:8080/groups/makegroup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ groupName }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create group');
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error creating group:', error);
        // handle error
      });
  };


  const handlePopupToggle = () => {
    setShowPopup(!showPopup);
  };

  const handleQuery = (keyword) => {
    setQueryKeyword(keyword);
  };

  return (
    <>
      <Navbar tag="grouppage" />
      <div className='grouppage'>
        <div className="header">
          <h1>Groups</h1>

          <button onClick={handlePopupToggle}>
            <img src={imageSrc} alt="Add Group" />
          </button>

          {showPopup && (
            <div className="popup">
              <form onSubmit={handleNewGroupSubmit}>
                <input
                  type="text"
                  ref={newGroupNameRef}
                  placeholder="Enter Group Name"
                />
                <button type="submit">Create Group</button>
              </form>
            </div>
          )}
        </div>
        <GroupQuery onQuery={handleQuery} />
        <JoinedGroups queryKeyword={queryKeyword} />


        {/* Other */}
      </div>
    </>
  );
}

export default GroupPage;