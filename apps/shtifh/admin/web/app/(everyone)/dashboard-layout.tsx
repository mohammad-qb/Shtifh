import React, { ReactNode } from 'react'
import Sidebar from '../../libs/components/layout/sidebar/Sidebar'
import ModalContainer from '../../libs/components/containers/modal'

const DashboardLayout = ({children}: {children: ReactNode}) => {
  return (
    <Sidebar onClose={function (): void {
      throw new Error('Function not implemented.')
    } }>
      <ModalContainer />
      {children}
    </Sidebar>
  )
}

export default DashboardLayout
