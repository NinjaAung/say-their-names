# say-their-names

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
