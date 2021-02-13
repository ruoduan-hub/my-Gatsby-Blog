import Typography from 'typography'
import Wordpress2016 from 'typography-theme-wordpress-2016'
// import githubTheme from "typography-theme-github"
// import wordpressKubrickTheme from 'typography-theme-wordpress-kubrick'

Wordpress2016.baseFontSize = '14px'
// Wordpress2016.baseLineHeight = 1.666
// Wordpress2016.baseScaleRatio = '2.00'
// Wordpress2016.baseParagraphSpacing = '1.00'
// wikipediaTheme.baseParagraphSpacing = '1.00'

Wordpress2016.overrideThemeStyles = ({ rhythm }, options) => ({
  'section h1,h2,h3,h4,h5': {
    marginBottom: `${rhythm(1)} !important`,
    marginTop: `${rhythm(2)} !important`,
  },
  'section ul li': {
    margin: rhythm(0.5),
    fontSize: '1rem',
  },
  'section hr': {
    border: 'none',
    borderBottom: '1px solid hsl(0, 100%, 75%);',
    height: '1px',
    margin: `${rhythm(2)} auto`,
    width: rhythm(20),
  },
})

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
