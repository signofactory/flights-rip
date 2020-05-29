// Next & React
import { useState } from 'react'

// Components
import { Modal, Button } from 'antd';

// Styles
import { GoogleButtonBase } from './Styles'

// API routes
import {API_PATH} from 'shared/config/globals';


export const LoginModal = ({visible, setVisible}) => {
  const [loading, setLoading] = useState(false)

  const handleOk = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false);
      setVisible(false)
    }, 3000);
  };

  const GoogleButton = () => {
    return (
      <GoogleButtonBase>
        <div className="google-icon-wrapper">
          <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
        </div>
        <p className="btn-text"><b>Sign in with Google</b></p>
      </GoogleButtonBase>
    )
  }
  
  return (
    <div>
      <Modal
        visible={visible}
        title="Login"
        onOk={handleOk}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <a href={(API_PATH + "/auth/google")}><GoogleButton /></a>
      </Modal>
    </div>
  );
}