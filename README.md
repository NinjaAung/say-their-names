# say-their-names
<p align="center">
    <a href="https://img.shields.io/circleci/build/github/NinjaAung/say-their-names"><img src="https://img.shields.io/circleci/build/github/NinjaAung/say-their-names" alt="Circle CI Build">
</a>
    <a href="https://github.com/NinjaAung/say-their-names/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/NinjaAung/say-their-names"</a>    
    <a href="https://github.com/NinjaAung/say-their-names/network"><img alt="GitHub forks" src="https://img.shields.io/github/forks/NinjaAung/say-their-names"></a>
    <a href="https://github.com/NinjaAung/say-their-names/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/NinjaAung/say-their-names">
</a>
    <a href="https://hub.docker.com/r/ninjer27/say-their-names"><img alt="Image Size" src="https://shields.beevelop.com/docker/image/image-size/beevelop/shields/latest.svg">
 </a>
        
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
