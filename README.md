# ZENCash Mobile

ZENCash mobile app built using Onsen UI, Redux, React and Webpack.

## Setup instructions

```
yarn install
cordova plugin install
cordova platform add [android | ios]
cordova run [android | ios]
```

The app will run at [http://localhost:9000](http://localhost:9000).

## How to build it

You can build it using Cordova.

- [Install Cordova](https://cordova.apache.org/docs/en/latest/guide/cli/index.html#installing-the-cordova-cli):

```
npm install -g cordova
```

You need to build the project:

```
npm run build
```

Add a platform to run it on a device or emulator. For Android:

```
cordova platform add android
cordova run android
```

This assumes that you have the Android SDK installed.
