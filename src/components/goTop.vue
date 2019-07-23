<template>
    <div>
        <v-btn
		id="goTop"
        v-scroll="onScroll"
        v-show="fab"
        fab
        dark
        small
        color="green"
        @click="toTop"
        >
            <v-icon>keyboard_arrow_up</v-icon>
        </v-btn>
    </div>
</template>

<script>
export default {
	name: "GoTop",
	data() {
		return {
			fab: false
		};
	},
	created:function(){
		this.onScroll();
	},
	methods: {
		onScroll() {
			if(typeof window == "undefined") return;
			const top = window.pageYOffset || 0;
			this.fab = top > 20;
		},
		toTop() {
			this.$vuetify.goTo(0);
		}
	}
};
</script>

<style>

</style>
