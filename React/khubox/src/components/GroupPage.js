import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GroupQuery from './GroupQuery';
import JoinedGroups from './JoinedGroups';
import InviteForm from './InviteForm';
import '../css/GroupPage.css';
// import Navbar from './Navbar'; 

function GroupPage() {
    const [queryKeyword, setQueryKeyword] = useState('');

  const handleQuery = (keyword) => {
    setQueryKeyword(keyword);
  };
  return (
    <div className='grouppage'>
      <h1>Group Page</h1>
      <GroupQuery onQuery={handleQuery} />
      <JoinedGroups queryKeyword={queryKeyword} />
      <InviteForm />
      {/* Other */}
    </div>
  );
}

export default GroupPage;