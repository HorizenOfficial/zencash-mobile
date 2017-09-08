# ZENCash Mobile

ZENCash mobile app built using Onsen UI, Redux, React and Webpack.

## Setup instructions

```
npm install -g yarn cordova
yarn install
cordova plugin add cordova-plugin-qrscanner cordova-plugin-file cordova-plugin-http cordova-clipboard cordova-plugin-inappbrowser
cordova platform add [android | ios]
cordova run [android | ios]
```