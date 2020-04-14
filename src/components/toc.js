import React from "react"

const Toc = props => {
  const html = { __html: String(props.tocHtml) }
  return (
    <>
      <div>
        <div dangerouslySetInnerHTML={html}></div>
      </div>
    </>
  )
}

export default Toc
