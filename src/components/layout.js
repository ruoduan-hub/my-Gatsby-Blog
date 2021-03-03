// import React from 'react'
// import { Link } from 'gatsby'

import { rhythm, scale } from '../utils/typography'

// import Texty from 'rc-texty'
// import 'rc-texty/assets/index.css'
// import TweenOne from 'rc-tween-one'
import S from './styles/header.module.scss'

import ThemeContext from '../context/ThemeContext'

import * as React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Header from './header'


// class Layout extends React.Component {
//   state = {
//     isDk: true
//   }

//   isDarkAction = () => {
//     this.setState({
//       isDk: !this.state.isDk
//     }, () => {
//       sessionStorage.setItem('isDk', this.state.isDk)
//     })
//   }
//   render() {
//     const { location, title, children } = this.props
//     const rootPath = `${__PATH_PREFIX__}/`   
//     let header

//     if (location.pathname === rootPath) {
//       header = (
//         <div className={this.state.isDk ? S.isDk: S.isWh}>
//         <div style={{
//          marginLeft: `auto`,
//             marginRight: `auto`,
//             maxWidth: rhythm(35),
//             padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
//         }} 
//         onClick={this.isDarkAction} className={S.headerBox}>
//           <h1>
//             <Link
//               style={{
//                 boxShadow: `none`,
//                 textDecoration: `none`,
//                 color: `inherit`,
//               }}
//               to={`/`}
//             >
//               <Texty
//                 className={S.title}
//                 type="mask-top"
//                 delay={400}
//                 enter={this.getEnter}
//                 interval={this.geInterval}
//                 component={TweenOne}
//                 componentProps={{
//                   animation: [
//                     { x: 130, type: 'set' },
//                     { x: 100, delay: 500, duration: 450 },
//                     {
//                       ease: 'easeOutQuart',
//                       duration: 300,
//                       x: 0,
//                     },
//                     {
//                       letterSpacing: 0,
//                       delay: -300,
//                       scale: 0.9,
//                       ease: 'easeInOutQuint',
//                       duration: 1000,
//                     },
//                     {
//                       scale: 1,
//                       width: '100%',
//                       delay: -300,
//                       duration: 1000,
//                       ease: 'easeInOutQuint',
//                     },
//                   ],
//                 }}
//               >
//                 {title}
//               </Texty>
//               <Texty
//                 className={S.title}
//                 style={{ fontSize: '1.5rem', fontWeight: 700 }}
//                 type="bottom"
//                 split={this.getSplit}
//                 delay={2200}
//                 interval={30}
//                 mode="sync"
//               >
//                 Welcome to Ruoduan.com
//               </Texty>
//             </Link>
//           </h1>
//         </div>
//       </div>
//       )
//     } else {
//       header = (
//         <h3
//           className="blogName"
//           style={{
//             marginTop: 0,
//             padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
//             fontSize: '2.5rem',
//           }}
//         >
//           <Link
//             style={{
//               boxShadow: `none`,
//               textDecoration: `none`,
//               color: `inherit`,
//             }}
//             to={`/`}
//           >
//             <Texty>{title}</Texty>
//           </Link>
//         </h3>
//       )
//     }
//     return (
//       <div>
//         <header>{header}</header>

//         <main className={this.state.isDk ? S.isMainDk : S.isMainWh}>
//           <div 
//             style={{
//             marginLeft: `auto`,
//             marginRight: `auto`,
//             maxWidth: rhythm(35),
//             padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
//           }}
//           >
//             {children}
//           </div>
//         </main>

//         <footer style={{ color: '#ccc', textAlign: 'center' }}>
//           {/* TODO 授权文字 */}© {new Date().getFullYear()}, 滇ICP备19003866号
//           本网站版权归本站作者Ruoduan所有
//           {` `}
//         </footer>
//       </div>
//     )
//   }
// }

const Layout = ({ children, title, isHome }) => {

  // const rootPath = `${__PATH_PREFIX__}/`
  console.log(isHome, 'isHome')
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <ThemeContext.Consumer>
          {theme => (
            <div className={theme.dark ? 'dark' : 'light'}>

              <Header theme={theme} isHome={isHome} title={title} />

              <main className={theme.dark ? S.isMainDk : isHome ? S.isMainWh : S.isMainWhPost}>
                <div>
                  {children}
                </div>
              </main>

            </div>
          )}
        </ThemeContext.Consumer>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
