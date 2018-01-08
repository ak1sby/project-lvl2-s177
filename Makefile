install: npm install

start:
	npm run babel-node -- src/bin/gendiff.js -h

lint:
	npm run eslint .

build:
		npm run build

publish:
	npm publish
