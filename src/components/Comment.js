import React from "react"
import Valine from "gatsby-plugin-valine"

const CONFIG = {
  appId: process.env.VALINE_APPID,
  appKey: process.env.VALINE_APPKEY,
  avatar: "wavatar",
}

const Comment = props => {
  // console.log(process.env.VALINE_APPID, 'evn')
  // console.log(process.env.VALINE_APPKEY, 'evn')

  return (
    /* Page contents */
    <Valine
      requiredFields={["nick", "mail"]}
      enableQQ={true}
      {...CONFIG}
      path={props.path}
    />
  )
}

export default Comment
