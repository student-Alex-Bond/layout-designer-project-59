install:
	npm ci

lint:
	npx stylelint ./app/scss/**/*.scss

build:
	npm run build

develop:
	npm run develop

deploy:
	npm run deploy

.PHONY: build