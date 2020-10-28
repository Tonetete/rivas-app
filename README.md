# Rivas-App

## A simple projectfor lottoland code challenge.

This project uses [rivas-lib](https://github.com/Tonetete/rivas-lib) library components in order to display the lotery results for lottoland.

The product version deployed can be found at [GitHub Pages](https://tonetete.github.io/rivas-app/)

## Requirements.

NodeJS 12.x previously installed.

## How to run in local.

```sh
npm install
npm run start
```

### Build.

```sh
npm run build
```

### Test.

```sh
npm run test
```

### Sync changes from rivas-lib project

If you need to make changes for **rivas-lib** components you can simply do the changes in rivas-lib folder repo and run the follow command inside **rivas-app**:

```sh
npm run sync:build
```

So this way you don't need to constantly publish and install the packages. Note that both repositories need to be at the same folder level structure.
