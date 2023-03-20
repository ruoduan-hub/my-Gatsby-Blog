#!/bin/bash
set -e

echo -e "RECAPTCHA_KEY=${{secrets.RECAPTCHA_key}}\nVALINE_APPID=${{secrets.VALINE_APPID}}\nVALINE_APPKEY=${{secrets.VALINE_APPKEY}}\nALGOLIA_APP_ID=${{secrets.ALGOLIA_APP_ID}}\nALGOLIA_API_KEY=${{secrets.ALGOLIA_API_KEY}}\nALGOLIA_INDEX_NAME=blog" > .env.production