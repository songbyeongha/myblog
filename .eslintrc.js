module.exports = {
	"env": {
		"browser": true,
		"es6": true,
		"node": true
	},
	"extends": [
		"plugin:airbnb-base",
		"plugin:prettier/recommended",
		"plugin:vue/essential"
	],
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parserOptions": {
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"plugins": [
		"vue"
	],
	"rules": {
		
	}
};