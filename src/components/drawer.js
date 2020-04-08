import React, {useState}  from 'react'
import { Drawer } from 'antd';
import { WindowsFilled } from '@ant-design/icons';

const WithDrawer = (props) => {
    console.log(props)
    // 抽屉状态
    let [visible, setVisible] = useState(false)

    const showDrawer = () => {
        setVisible(true)
    };

    const onClose = () => {
        setVisible(false)
    };

    return (<>
    <div className="leftController">
        {/* eslint-disable */}
        <span role="button" tabIndex="0"   onClick={showDrawer} style={{position: 'fixed',top:'1rem',left:'2rem', cursor: 'pointer'}}>
        {props.button ? props.button : <WindowsFilled style={{fontSize: '2rem'}} /> }
        </span>
        <Drawer
          placement="left"
          closable={false}
          onClose={onClose}
          visible={visible}
          closable={true}
          mask={false}
        >
          {/*<MyNav small={true} />
          <p>还没想好要放什么 ...</p>
    <p> ...</p>*/}
        
        {props.data}
        
            
        </Drawer>
    </div>
        </>)
}

export default WithDrawer