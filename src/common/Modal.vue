<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header"> </slot>
          </div>

          <div class="modal-body">
            <slot name="body"> </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button
                class="modal-default-button btn-delete"
                @click="$emit('delete')"
              >
                Delete
              </button>
              <button
                class="modal-default-button btn-cancel"
                @click="$emit('close')"
              >
                Cancel
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {};
</script>

