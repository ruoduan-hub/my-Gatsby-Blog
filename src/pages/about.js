import React  from 'react'
import { Skeleton, Card, Icon, Avatar } from 'antd';
// 导入公共样式
import { rhythm } from "../utils/typography"
import { FontSizes } from 'office-ui-fabric-react';
const { Meta } = Card;



const About = () => {
  return (
    <>
       <div
       style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
       >
       <Card
          style={{ width: '35rem', marginTop: 16, }}
          actions={[
            <Icon style={{fontSize:'2rem'}} type="github" key="setting" />,
            <Icon style={{fontSize:'2rem'}} type="mail" key="edit" />,
            <Icon style={{fontSize:'2rem'}} type="weibo" key="ellipsis" />,
          ]}
        >
          <Skeleton loading={false} avatar active>
            <Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title="Ruoduan"
              description="我的介绍"
            />
          </Skeleton>
        </Card>
       </div>
    </>
  )
}


export default About