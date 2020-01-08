// 导航栏组件
import React from "react"
import { CompoundButton } from 'office-ui-fabric-react/lib/Button';
import { Nav } from 'office-ui-fabric-react/lib/Nav';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
// 引入图标
import { initializeIcons } from '@uifabric/icons';
initializeIcons();


const MyNav = (props) => {
    
    {
        if (props.small) {
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
            <ul style={{display: 'flex',justifyContent:'space-between'}}>
                <li style={{display: 'flex',flexDirection: 'column'}} >
                    <Icon style={{fontSize: '3rem'}} iconName="HomeVerify" />
                    <CompoundButton style={{width:'6rem'}} secondaryText="Home Blog ." 
                    onClick={()=> window.location.pathname=`/`}
                    >
                        首页
                    </CompoundButton>  
                </li>

                <li style={{display: 'flex',flexDirection: 'column'}}>
                    <Icon style={{fontSize: '3rem'}} iconName="BacklogList" />
                    <CompoundButton style={{width:'6rem'}} secondaryText="Tags ."
                    onClick={()=> window.location.pathname=`/tags`}
                    >
                        标签
                        </CompoundButton>
                </li>

                <li style={{display: 'flex',flexDirection: 'column'}}>
                    <Icon style={{fontSize: '3rem'}} iconName="AccountBrowser" />
                    <CompoundButton style={{width:'6rem'}} secondaryText="About ."
                    onClick={()=> window.location.pathname=`/about/`}
                    >
                    作者
                    </CompoundButton>
                </li>
            </ul>
            <br />
            <hr />
            
            </>)
        }
    }
}


export default MyNav