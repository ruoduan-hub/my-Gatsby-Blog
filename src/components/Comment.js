import React, { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import MuiAlert from '@material-ui/lab/Alert'
import GitalkComponent from "gitalk/dist/gitalk-component";
import 'gitalk/dist/gitalk.css'

const Comment = (props) => {
  // console.log(process.env.VALINE_APPID, 'evn')
  // console.log(process.env.VALINE_APPKEY, 'evn')

  const [token, setToken] = useState(null)

  return (
    <div style={{ marginTop: "20px" }}>
      {token ? (
        <GitalkComponent
          options={{
            clientID: process.env.CLIENTID,
            clientSecret: process.env.CLIENTSECRET,
            repo: "GatsbtBlogCommentStore",
            owner: "ruoduan-hub",
            admin: "ruoduan-hub",
          }}
        />
      ) : (
        <div>
          <MuiAlert
            style={{ marginBottom: "2rem" }}
            elevation={6}
            variant="outlined"
            severity="info"
          >
            请连接外网，先进行Google人机验证在进行评论哦 ~
          </MuiAlert>

          <ReCAPTCHA
            sitekey={process.env.RECAPTCHA_KEY}
            onChange={(value) => setToken(value)}
          />
        </div>
      )}
    </div>
  )
}

export default React.memo(Comment)
