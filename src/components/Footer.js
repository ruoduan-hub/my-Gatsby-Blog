import React from 'react'
import S from './styles/footer.module.scss'


const Footer = ({ theme }) => (
  <footer className={
    theme.dark ? S.footerDk : S.footerWh
  }>
    <span>{`© ${new Date().getFullYear()}, 滇ICP备19003866号`}</span>
    <span>本网站版权归本站作者Ruoduan所有</span>
    <span>原创文章遵循
      <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.zh">CC BY-SA 4.0</a>
       授权许可，转载请注明出处</span>
  </footer>
)

Footer.propTypes = {
  theme: {
    dark: Boolean
  }
}

export default Footer