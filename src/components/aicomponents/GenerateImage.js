import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Select from "@material-ui/core/Select"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"
import TextField from "@material-ui/core/TextField"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import MenuItem from "@material-ui/core/MenuItem"
import { useImmer } from "use-immer"
import Button from "@material-ui/core/Button"
import Backdrop from "@material-ui/core/Backdrop"
import CircularProgress from "@material-ui/core/CircularProgress"
import { Gallery, Item } from "react-photoswipe-gallery"
import "photoswipe/dist/photoswipe.css"

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },

  boxTop: {
    display: "flex",
    alignItems: "baseline",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  formControl: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  formControlLong: {
    marginTop: theme.spacing(2),
  },
  imageList: {
    display: "flex",
    alignItems: "center",
    flexWrap: "nowrap",
    overflowX: "auto",
    margin: `${theme.spacing(4)}px 0`,
  },

  img: {
    width: "256px",
    height: "auto",
    cursor: 'pointer',
    marginRight: theme.spacing(2),
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    backgroundColor: "rgba(255, 255, 255, 0.7);",
  },
}))

const GenerateImage = () => {
  const classes = useStyles()
  const [form, setForm] = useImmer({
    n: 1,
    size: "512x512",
    content: "Cartoon boy avatar",
    response_format: "url",
    // response_format: "b64_json",
  })

  const [imgList, setImgList] = useState([])
  const [spin, setSpin] = useState(false)

  const postImages = async () => {
    setSpin(true)
    try {
      const js = await fetch(
        `https://serverless.ruoduan.cn/api/create_image?content=${form.content}&n=${form.n}&seze=${form.size}&response_format=${form.response_format}`
      )
      const res = await js.json()
      console.log(res)
      setImgList(res)
      setSpin(false)
    } catch (error) {
      setSpin(false)

    }

  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className={classes.boxTop}>
        <FormControl className={classes.formControl}>
          <TextField
            className={classes.selectEmpty}
            defaultValue={1}
            type="number"
            label="Image Count(1-10)"
            onChange={(e) =>
              setForm((draft) => {
                draft.n = e.target.value
              })
            }
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="images-size">Image Size</InputLabel>
          <Select
            className={classes.selectEmpty}
            defaultValue="512x512"
            value="512x512"
            onChange={(e) =>
              setForm((draft) => {
                draft.size = e.target.value
              })
            }
          >
            <MenuItem value="256x256">256x256</MenuItem>
            <MenuItem value="512x512">512x512</MenuItem>
            <MenuItem value="1024x1024">1024x1024</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => postImages()}
          >
            Submit
          </Button>
        </FormControl>
      </div>

      <FormControl fullWidth className={classes.formControlLong}>
        <OutlinedInput
          onChange={(e) =>
            setForm((draft) => {
              draft.content = e.target.value
            })
          }
          multiline
          maxRows={3}
          placeholder="Describe the content of the picture. ex: Cartoon boy avatar"
        />
      </FormControl>

      <div className={classes.imageList}>
        <Gallery withDownloadButton>
          {imgList.map((item) => (
            <Item
              original={item.url}
              thumbnail={item.url}
              width="256"
              height="256"
            >
              {({ ref, open }) => (
                <img
                  ref={ref}
                  onClick={open}
                  className={classes.img}
                  key={item.url}
                  src={item.url}
                  alt="fail"
                />
              )}
            </Item>
          ))}
        </Gallery>
      </div>

      <Backdrop className={classes.backdrop} open={spin}>
        <CircularProgress />
      </Backdrop>
    </form>
  )
}

export default GenerateImage
