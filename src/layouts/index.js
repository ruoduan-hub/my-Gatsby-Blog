import React from 'react'
import { TransitionProvider, TransitionViews } from 'gatsby-plugin-transitions'

const Layout = ({ location, children }) => {
  return (
    <TransitionProvider
      location={location}
      mode="immediate"
      // 进入
      enter={{
        opacity: 1,
        transform: 'translate3d(50vh,0vh,0) scale3d(1, 1, 1) rotate(0deg)',
        config: {
          duration: 600,
        },
      }}
      // 正常
      usual={{
        opacity: 1,
        transform: 'translate3d(0vh,0vh,0) scale3d(1, 1, 1) rotate(0deg)',
      }}
      // 切出
      // leave={{
      //   opacity: 0,
      //   transform: "translate3d(0vh,0vh,0vh) scale3d(0.5, 0.5, 0.5) rotate(0deg)",
      //   config: {
      //       duration: 1000
      //     }
      // }}
    >
      <TransitionViews>{children}</TransitionViews>
    </TransitionProvider>
  )
}

export default Layout
