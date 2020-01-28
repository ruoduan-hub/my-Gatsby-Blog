// 导航栏组件
import React from "react"
import { Icon } from 'antd'
import { Nav, } from 'office-ui-fabric-react'
// 引入图标
import { initializeIcons } from '@uifabric/icons';
initializeIcons();


const MyNav = (props) => {
  
        if (props.small && typeof window !== 'undefined' && true) {
            return (<>
            {/* 导航栏 */}
            <Nav
            groups={[
              {
                links: [
                  {
                    name: 'Menu',
                    links: [
                      {
                        key: 'Home',
                        name: '首页',
                        url: '/',
                        icon:'HomeVerify'
                      },
                      {
                        key: 'Tag',
                        name: '标签',
                        url: '/tags',
                        icon:'BacklogList'
                      },
                      {
                        key: 'About',
                        name: '关于我',
                        url: '/about',
                        icon:'AccountBrowser'
                      }
                    ]
                  },
                ]
              }
            ]}
            />
            </>)
        } else {
            return (<>
            <ul style={{display: 'flex',justifyContent:'space-between', height: '2rem'}}>
                <li style={{display: 'flex',flexDirection: 'column'}} >
                    <Icon style={{fontSize: '3rem', marginBottom: '1rem'}} type="home"
                      onClick={() => window.location.pathname = '/'}
                    />
                </li>

                <li style={{display: 'flex',flexDirection: 'column'}}>
                    <Icon style={{fontSize: '3rem', marginBottom: '1rem'}} type="unordered-list"
                      onClick={() => window.location.pathname = '/tags'}
                    />
                </li>

                <li style={{display: 'flex',flexDirection: 'column'}}>
                    <Icon style={{fontSize: '3rem', marginBottom: '1rem'}} type="user" 
                      onClick={() => window.location.pathname = '/about'}
                    />
                </li>
            </ul>
            <br />
            <hr />
            
            </>)
        }
    
}


export default MyNav