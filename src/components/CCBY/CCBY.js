import React from 'react'

// import { ReactComponent as BY } from 'images/by.svg'
// import { ReactComponent as CC } from 'images/cc.svg'
import by from 'images/by.svg'
import cc from 'images/cc.svg'

const CCBY = () => (
  <div style={{ display: 'flex' }}>
    <img src={cc} alt="" style={{ width: '50%' }} />
    <img src={by} alt="" style={{ width: '50%' }} />
  </div>
)

export default CCBY
