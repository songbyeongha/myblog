<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <i class="closeBtn fas fa-times right" @click="ok"></i>
                    <imgur></imgur>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import imgur from "../components/Imgur";

export default {
	components: {
		imgur
	},
	methods: {
		ok() {
			this.$emit("ok", "ok");
		}
	}
};
</script>

<style>

</style>
