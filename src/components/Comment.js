import React, { useState } from "react"
import Valine from "gatsby-plugin-valine"
import ReCAPTCHA from "react-google-recaptcha"
import MuiAlert from "@material-ui/lab/Alert"

const CONFIG = {
  appId: process.env.VALINE_APPID,
  appKey: process.env.VALINE_APPKEY,
  avatar: "wavatar",
  recordIP: true,
  serverURLs: "https://lean.ruoduan.cn", // leanCloud API 自定义域名
}

const Comment = (props) => {
  // console.log(process.env.VALINE_APPID, 'evn')
  // console.log(process.env.VALINE_APPKEY, 'evn')

  const [token, setToken] = useState(null)

  return (
    <>
      {token ? (
        <Valine
          requiredFields={["nick", "mail"]}
          enableQQ={true}
          {...CONFIG}
          path={props.path}
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
    </>
  )
}

export default Comment
