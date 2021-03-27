import React, { useCallback, useState, useEffect } from 'react'
import S from './styles/footer.module.scss'

const STYLE = {
  position: 'absolute',
  bottom: 0,
}

const Footer = ({ theme }) => {

  const [is, setIS] = useState(false)

  // 是否出现滚动条
  const isScroll = useCallback(() => typeof window !== 'undefined' && document.body.scrollHeight === window.innerHeight, [])

  useEffect(() => {
    setIS(isScroll())
  }, [isScroll])

  return (
    <footer style={is ? {} : STYLE} className={theme.dark ? S.footerDk : S.footerWh}>
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
