# say-their-names
<p align="center">
    <a href="https://github.com/badges/shields/graphs/contributors" alt="Contributors">
        <img src="https://img.shields.io/github/contributors/badges/shields" /></a>
    <a href="#backers" alt="Backers on Open Collective">
        <img src="https://img.shields.io/opencollective/backers/shields" /></a>
    <a href="#sponsors" alt="Sponsors on Open Collective">
        <img src="https://img.shields.io/opencollective/sponsors/shields" /></a>
    <a href="https://github.com/badges/shields/pulse" alt="Activity">
        <img src="https://img.shields.io/github/commit-activity/m/badges/shields" /></a>
    <a href="https://circleci.com/gh/badges/shields/tree/master">
        <img src="https://img.shields.io/circleci/project/github/badges/shields/master" alt="build status"></a>
    <a href="https://circleci.com/gh/badges/daily-tests">
        <img src="https://img.shields.io/circleci/project/github/badges/daily-tests?label=service%20tests"
            alt="service-test status"></a>
    <a href="https://coveralls.io/github/badges/shields">
        <img src="https://img.shields.io/coveralls/github/badges/shields"
            alt="coverage"></a>
    <a href="https://lgtm.com/projects/g/badges/shields/alerts/">
        <img src="https://img.shields.io/lgtm/alerts/g/badges/shields"
            alt="Total alerts"/></a>
    <a href="https://discord.gg/HjJCwm5">
        <img src="https://img.shields.io/discord/308323056592486420?logo=discord"
            alt="chat on Discord"></a>
    <a href="https://twitter.com/intent/follow?screen_name=shields_io">
        <img src="https://img.shields.io/twitter/follow/shields_io?style=social&logo=twitter"
            alt="follow on Twitter"></a>
    <a href="https://img.shields.io/circleci/build/github/NinjaAung/say-their-names">
        <img src="https://img.shields.io/circleci/build/github/NinjaAung/say-their-names"
             alt="Circle CI Build"></a>
</p>
## Project setup

### Docker

#### Building Image
```bash
docker build --tag TAG_CHOICE .
```

#### Running Container
```bash
docker run -p 80[OR HOST]:80 --name NAME_CHOICE  -d TAG_CHOICE
```
remove `-d` ro not run in the background

#### Docker Compose Building
```bash
docker-compose build
```


#### Running Docker Compose
```bash
docker-compose up
```


### Local Dev

```bash
npm install
```

#### Compiles and hot-reloads for development

```bash
npm run serve
```

#### Compiles and minifies for production

```bash
npm run build
```

#### Lints and fixes files

```bash
npm run lint
```

#### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
