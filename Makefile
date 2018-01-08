install: npm install

start:
	npm run babel-node -- src/bin/gendiff.js

lint:
	npm run eslint .

test:
	npm test

build:
		npm run build

publish:
	npm publish
