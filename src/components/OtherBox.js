import React, { useState, useEffect, useCallback } from "react"
import { MDXProvider } from "@mdx-js/react"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import SwipeableViews from "react-swipeable-views"

import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import GenerateImage from './aicomponents/GenerateImage'


function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box >
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  }
}

const OtherBox = () => {
  const [tabVal, setTabVal] = useState(0)

  return (
    <MDXProvider>
      <Tabs
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        centered
        value={tabVal}
        onChange={(event, newValue) => {
          setTabVal(newValue)
        }}
      >
        <Tab label="AI Image" {...a11yProps(0)} />
        <Tab label="AI Audio" {...a11yProps(1)} />
        <Tab label="AI Files" {...a11yProps(2)} />
      </Tabs>

      <SwipeableViews
        value={tabVal}
        index={tabVal}
        onChangeIndex={(v) => {
          setTabVal(v)
        }}
      >
        <TabPanel value={tabVal} index={0}>
          <GenerateImage />
        </TabPanel>
        <TabPanel value={tabVal} index={1}>
          AI Audio TODO ..
        </TabPanel>
        <TabPanel value={tabVal} index={2}>
          AI Files TODO ..
        </TabPanel>
      </SwipeableViews>
    </MDXProvider>
  )
}

export default OtherBox
