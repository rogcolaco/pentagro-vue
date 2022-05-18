<template>
  <div class="form-check form-switch" v-if="propsStatus">
    <input
      class="form-check-input"
      type="checkbox"
      role="switch"
      id="flexSwitchCheckDefault"
      @click="changeValue"
      checked
    />
    <label class="form-check-label" for="flexSwitchCheckDefault">{{
      btnTitle
    }}</label>
  </div>
  <div class="form-check form-switch" v-else>
    <input
      class="form-check-input"
      type="checkbox"
      role="switch"
      :id="inputName"
      @click="changeValue"
    />
    <label class="form-check-label" :for="inputName">{{ btnTitle }} </label>
  </div>
</template>

<script>
export default {
  props: {
    btnTitle: String,
    propsStatus: Boolean,
    inputName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localValue: false,
    };
  },
  methods: {
    changeValue() {
      this.localValue = !this.localValue;
      this.$emit("statusIsChanged", this.localValue);
    },
  },
  watch: {
    propsStatus(newStatus) {
      this.localValue = newStatus;
      console.log(this.localValue);
    },
  },
};
</script>

<style>
</style>