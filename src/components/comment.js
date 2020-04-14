import React, { useEffect } from "react"
import md5 from "spark-md5"
import { Row, Col } from "antd"
import "gitalk/dist/gitalk.css"
import Gitalk from "gitalk"

const Comment = props => {
  console.log(props)
  useEffect(() => {
    let gitalk = new Gitalk({
      clientID: props.gitalkConfig.clientID, // github api
      clientSecret: props.gitalkConfig.clientSecret, // github api
      repo: "GatsbtBlogCommentStore",
      owner: "chad97",
      admin: ["chad97"],
      id: md5.hash(props.path),
      title: md5.hash(props.path + "?title"), // Ensure uniqueness and length less than 50
      distractionFreeMode: true, // Facebook-like distraction free mode
    })
    gitalk.render("gitalk-container")
  }, [props])

  return (
    <Row
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Col xs={24} sm={24} md={16}>
        <div
          style={{
            color: "#333",
            margin: "0 2rem",
          }}
          id="gitalk-container"
        ></div>
      </Col>
    </Row>
  )
}

export default Comment
