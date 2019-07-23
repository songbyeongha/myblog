<template>
    <div>
        <v-btn
		id="chromeCheck"
		v-if="notChrome"
		dark
		fixed
		bottom
		left
		color="alert"
		@click="hide"
		>
		해당 사이트는 크롬 브라우저에 최적화 되어있습니다.
		</v-btn>
    </div>
</template>

<script>
export default {
	name: "ChromeCheck",
	data() {
		return {
			isChrome: true
		};
	},
	created() {
		this.isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
	},
	computed: {
		notChrome() {
			return !this.isChrome;
		}
	},
	methods: {
		hide() {
			this.isChrome = true;
		}
	}
};
</script>

<style>
#chromeCheck {
    z-index: 99;
}
</style>
