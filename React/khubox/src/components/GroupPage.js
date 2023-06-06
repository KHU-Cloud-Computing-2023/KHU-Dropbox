import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GroupQuery from './GroupQuery';
import JoinedGroups from './JoinedGroups';
import InviteForm from './InviteForm';
import '../css/GroupPage.css';
import Navbar from './Navbar';
import imageSrc from './image9.png';

function GroupPage() {
    const [queryKeyword, setQueryKeyword] = useState('');

  const handleQuery = (keyword) => {
    setQueryKeyword(keyword);
  };

  const GrouphandleClick = () => {
    // image clicked event handler
    console.log('image clicked!');
  };

  return (
    <>
    <Navbar/>
    <div className='grouppage'>
      <div className="header">
        <h1>Groups</h1>
        <img src={imageSrc} alt="Image" onClick={GrouphandleClick} />
        </div>
      <GroupQuery onQuery={handleQuery} />
      <JoinedGroups queryKeyword={queryKeyword} />
      <InviteForm />
      {/* Other */}
    </div>
    </>
  );
}

export default GroupPage;