<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header black-text">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="modal-body black-text">
            <slot name="body">
            </slot>
          </div>

          <div class="modal-footer black-text center">
                      <slot name="footer">
              <base-button class="modal-default-button" @click="$emit('dismiss')">
                Cancel
              </base-button>
            </slot>

            <slot name="footer">
              <base-button class="modal-default-button" @click="$emit('close')">
                Okay
              </base-button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BaseButton from '@/components/reusables/BaseButton.vue'

export default {
  components: {
    BaseButton
  }
}

</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 400px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>