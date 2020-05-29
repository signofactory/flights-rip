//Layout
import { Layout } from 'antd';
const { Footer } = Layout;

export function ReusableFooter(props) {
  return (
    <>
      <Footer style={{ textAlign: 'center' }}>Project made for fun. Created by <a href='https://signofactory.it'>Signofactory</a></Footer>
    </>
  )
}