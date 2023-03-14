import React, { useState } from 'react'
import { ItemContext } from '../../../Contexts/Context';
import AddProfile from './AddProfile';

const Profiles = () => {
  const [profileId, profileSetId] = useState(0)
  return (
    <>
      <ItemContext.Provider value={{ profileId, profileSetId }}>
        <AddProfile />
      </ItemContext.Provider>
    </>
  )
}

export default Profiles