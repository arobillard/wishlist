import React, { useEffect } from 'react';

const GroupsPage = ({ match, setPage }) => {

  useEffect(() => {
    setPage({
      current: `/groups`,
    })
  }, [setPage])

  return(
    <h1>Groups</h1>
  )
}

export default GroupsPage;