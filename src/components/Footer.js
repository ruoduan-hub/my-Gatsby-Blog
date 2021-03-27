import React from 'react'
import S from './styles/footer.module.scss'

const STYLE = {
  position: 'absolute',
  bottom: 0,
}

const Footer = ({ theme, count = 3 }) => {

  return (
    <footer style={count > 2 ? {} : STYLE} className={theme.dark ? S.footerDk : S.footerWh}>
      <span>{`© ${new Date().getFullYear()}, 滇ICP备19003866号`}</span>
      <span>本网站版权归本站作者Ruoduan所有</span>
      <span>
        原创文章遵循
        <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.zh">
          CC BY-SA 4.0
        </a>
        授权许可，转载请注明出处
      </span>
    </footer>
  )

}

export default Footer
