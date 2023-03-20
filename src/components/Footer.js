import React from 'react'
import * as S from './styles/footer.module.scss'

const STYLE = {
  position: 'absolute',
  bottom: 0,
}

const Footer = ({ theme, count = 3 }) => {
  return (
    <footer
      style={count > 2 ? {} : STYLE}
      className={theme.dark ? S.footerDk : S.footerWh}
    >
      <div>
        <span>关注本站 RSS</span>
        {typeof window !== 'undefined' && (
          <a
            target="_blank"
            href={`${window.location.origin}/rss.xml`}
            rel="noreferrer"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fad"
              data-icon="rss"
              className="svg-inline--fa fa-rss fa-w-14 "
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <g className="fa-group">
                <path
                  className="fa-secondary"
                  fill="currentColor"
                  d="M303.74 463.21c-8.35-154.6-132.18-278.59-286.95-286.95A16 16 0 0 0 0 192.25v48.07a16 16 0 0 0 14.89 16c111.83 7.28 201.47 96.7 208.77 208.77a16 16 0 0 0 16 14.89h48.07a16 16 0 0 0 16-16.79zM16.5 32A16 16 0 0 0 0 48v48.08a16 16 0 0 0 15.45 16c191.18 7.84 344.63 161.32 352.47 352.47a16 16 0 0 0 16 15.45H432a16 16 0 0 0 16-16.5C439.6 229.68 251.46 40.45 16.5 32z"
                ></path>
                <path
                  className="fa-primary"
                  fill="currentColor"
                  d="M0 416a64 64 0 1 1 64 64 64 64 0 0 1-64-64z"
                ></path>
              </g>
            </svg>
          </a>
        )}
      </div>
      <div>{`© ${new Date().getFullYear()}, 滇ICP备19003866号`}</div>
      <div>本网站版权归本站作者Ruoduan所有</div>
      <div>
        原创文章遵循
        <a
          target="_blank"
          href="https://creativecommons.org/licenses/by-sa/4.0/deed.zh"
          rel="noreferrer"
        >
          CC BY-SA 4.0
        </a>
        授权许可，转载请注明出处
      </div>
    </footer>
  )
}

export default Footer
