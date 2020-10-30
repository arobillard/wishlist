import React, { useEffect } from 'react';

const GroupsPage = ({ match, setPage }) => {

  useEffect(() => {
    setPage({
      backBtn: false,
      fab: {
        icon: 'plus',
        link: '/groups/add'
      }
    })
  }, [setPage])

  return(
    <h1>Groups</h1>
  )
}

export default GroupsPage;