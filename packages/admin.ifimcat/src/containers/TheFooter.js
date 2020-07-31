import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="http://ifimcat.com" rel="noopener noreferrer">Ifimcat.com</a>
        <span className="ml-1">&copy; 粤ICP备17044077号</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="https://github.com/MoGoethe" target="_blank" rel="noopener noreferrer">MoGoethe</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
