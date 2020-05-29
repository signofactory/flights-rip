// Next & React
import { useState } from 'react'

// Components
import { Space, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Emoji from '../Emoji';
import { LoginModal } from 'shared/components/LoginModal'

// Custom styles
import { StyledSpace, Logo } from './Styles'

//Recoil
import {useRecoilState} from 'recoil'
import {currentUser} from 'shared/store/recoilState' 

//Api
import Api from 'shared/utils/Api'



// Main functional component
export const HeaderNav = () => {
  const [loginOpen, setLoginOpen] = useState(false)
  const [user, setUser] = useRecoilState(currentUser)

  const handleLogin = () => {
    if (user) {
      Api.logoutCurrentUser().then(() => {
        setUser(null)
      })
    } else {
      setLoginOpen(true)
    }
  }


  return(
    <>
      <StyledSpace>
        <a href='/'><Logo><Emoji symbol='✈️'/> Fligths.rip</Logo></a>

        <Space>
          <Button
            type="primary"
            icon={<UserOutlined />}
            onClick={() => handleLogin()}
          >
            {user ? 'Logout' : 'Login'}
          </Button>
        </Space>
      </StyledSpace>
      
      <LoginModal
        visible={loginOpen}
        setVisible={setLoginOpen}
      />
    </>
  )
}