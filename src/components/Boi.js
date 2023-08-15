/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
// import Image from 'gatsby-image'
import { GatsbyImage } from "gatsby-plugin-image"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import LocalCafeOutlinedIcon from "@material-ui/icons/LocalCafeOutlined"
import Accordion from "@material-ui/core/Accordion"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    alignItems: 'center'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}))

const Bio = () => {
  const classes = useStyles()

  const data = useStaticQuery(graphql`
    query BioQuery {
      wechat: file(absolutePath: { regex: "/we_p.png/" }) {
        childImageSharp {
          gatsbyImageData(width: 175, height: 175, layout: FIXED)
        }
      }
      alipay: file(absolutePath: { regex: "/al_p.png/" }) {
        childImageSharp {
          gatsbyImageData(width: 175, height: 175, layout: FIXED)
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `)
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        IconButtonProps={<LocalCafeOutlinedIcon />}
      >
        <Button
          className={classes.heading}
          startIcon={<LocalCafeOutlinedIcon />}
        >
          喝杯咖啡
        </Button>

        <Typography className={classes.secondaryHeading}>
          您的支持是我创作的最大动力
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <GatsbyImage image={data.wechat.childImageSharp.gatsbyImageData} />
        <GatsbyImage image={data.alipay.childImageSharp.gatsbyImageData} />
      </AccordionDetails>
    </Accordion>
  )
}

export default Bio
