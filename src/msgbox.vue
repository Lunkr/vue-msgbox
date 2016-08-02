<template>
  <div class="msgbox-wrapper">
    <div class="msgbox" v-if="rendered" v-show="visible" transition="pop-bounce">
      <div class="msgbox-header" v-if="title">
        <span class="msgbox-title">{{ title }}</span>
        <span class="msgbox-close" @click="handleAction('close')">×</span>
      </div>
      <div class="msgbox-close-container" v-else>
        <span class="msgbox-close" @click="handleAction('close')">×</span>
      </div>
      <div class="msgbox-content" v-if="message">
        <div class="msgbox-message">{{{ message }}}</div>
        <div class="msgbox-input" v-show="showInput">
          <input type="text" v-model="inputValue" :placeholder="inputPlaceholder" v-el:input />
          <div class="msgbox-errormsg" :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }">{{editorErrorMessage}}</div>
        </div>
      </div>
      <div class="msgbox-btns" :class="{ 'msgbox-btns-reverse': confirmButtonPosition === 'left' }">
        <button class="{{ confirmButtonClasses }}" v-show="showConfirmButton" @click="handleAction('confirm')">{{ confirmButtonText }}</button>
        <button class="{{ cancelButtonClasses }}" v-show="showCancelButton" @click="handleAction('cancel')">{{ cancelButtonText }}</button>        
      </div>
    </div>
  </div>
</template>

<style scoped>
  .msgbox-wrapper {
    box-sizing: border-box;
  }
  .msgbox {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    background-color: #fff;
    width: 300px;
    border-radius: 5px;
    font-size: 14px;
    -webkit-user-select: none;
    overflow: hidden;
    opacity: 1;
    backface-visibility: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
  }

  .msgbox-header{
    background-color: #424242;
    padding: 0 15px;
    overflow: hidden;
    position: relative;
    color: #fff;
    height: 40px;
    line-height: 40px;
    border: none;
  }
  .msgbox-close-container{
    height: 20px;
  }
  .msgbox-close-container .msgbox-close {
    top: 10px;
    opacity: 0.2;
    color: #000;
    font-size: 18px;
  }

  .msgbox-content {
    padding: 10px 20px;
    min-height: 36px;
    position: relative;
  }

  .msgbox-close {
    display: inline-block;
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    line-height: 20px;
    text-align: center;
    z-index: 1; 
    font-weight: bold;    
  }

  .msgbox-close:hover{
    opacity: 0.5;
  }

  .msgbox-input > input {
    border: 1px solid #dedede;
    border-radius: 5px;
    padding: 4px 5px;
    width: 100%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
  }

  .msgbox-errormsg {
    color: red;
    font-size: 12px;
    min-height: 16px;
  }

  .msgbox-status {
    float: left;
    width: 36px;
    height: 36px;
    font-size: 36px !important;
  }

  .msgbox-status.icon-success {
    color: #94c852;
  }

  .msgbox-status.icon-warning {
    color: #ff9c00;
  }

  .msgbox-status.icon-error {
    color: #ff4248;
  }

  .msgbox-message {
    color: #333;
    text-overflow: ellipsis;
    margin: 20px 0 30px 0;
    text-align: center;
    line-height: 20px;
  }

  .msgbox-btns {
    display: flex;
    padding: 20px 0;
    justify-content: center;
  }

  .msgbox-btn {
    border-radius: 4px;
    min-width: 50px;
    height: 26px;
    padding: 0 10px;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    margin: 0 5px;
    border: 1px solid #e0e0e0;    
  }
  .msgbox-btn:focus,
  .msgbox-btn:hover,
  .msgbox-btn:active {
    outline: none !important;
  }
  .msgbox-btn:hover {
    box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.1);
  }
  .msgbox-btn:active {
    box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.1);
  }
  .msgbox-confirm {
    background-color: #ffee38;
    color: #7c6506;
    border: 1px solid #cdbc06;
  }
  .msgbox-confirm:hover,
  .msgbox-confirm:active,
  .msgbox-confirm:active:hover,
  .msgbox-confirm:active:focus,
  .msgbox-confirm:focus {
    background-color: #ffee38;
    color: #7c6506;
    border: 1px solid #cdbc06;
  }
  .msgbox-confirm.disabled,
  .msgbox-confirm[disabled] {
    background-color: #f5f5f5;
    color: #c1c1c1;
  }
  .msgbox-confirm.disabled:hover,
  .msgbox-confirm[disabled]:hover,
  .msgbox-confirm.disabled:active,
  .msgbox-confirm[disabled]:active {
    box-shadow: none;
    background-color: #f5f5f5;
    color: #c1c1c1;
  }
  .msgbox-cancel {
    background-color: #f5f5f5;
    color: #606060;
  }
  .msgbox-cancel:hover,
  .msgbox-cancel:active,
  .msgbox-cancel:focus {
    background-color: #f5f5f5;
    color: #606060;
  }

  .msgbox-confirm-highlight,
  .msgbox-cancel-highlight {
    font-weight: 800;
  }

  .msgbox-btns-reverse {
    -webkit-box-direction: reverse;
  }

  .pop-bounce-transition {
    transition: .2s .1s;
  }

  .pop-bounce-enter {
    opacity: 0;
    transform: translate3d(-50%, -50%, 0) scale(0.7);
  }

  .pop-bounce-leave {
    opacity: 0;
    transform: translate3d(-50%, -50%, 0) scale(0.9);
  }
</style>

<script lang="babel">
  var CONFIRM_TEXT = '确定';
  var CANCEL_TEXT = '取消';

  import Popup from 'vue-popup';

  export default {
    mixins: [ Popup ],

    props: {
      modal: {
        default: true
      },
      closeOnPressEscape: {
        default: true
      },
      zIndex: {
        default: 1040
      }
    },

    computed: {
      confirmButtonClasses() {
        var classes = 'msgbox-btn msgbox-confirm ' + this.confirmButtonClass;
        if (this.confirmButtonHighlight) {
          classes += ' msgbox-confirm-highlight';
        }
        return classes;
      },
      cancelButtonClasses() {
        var classes = 'msgbox-btn msgbox-cancel ' + this.cancelButtonClass;
        if (this.cancelButtonHighlight) {
          classes += ' msgbox-cancel-highlight';
        }
        return classes;
      }
    },

    methods: {
      handleAction(action) {
        if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
          return;
        }
        var callback = this.callback;
        this.visible = false;
        callback(action);
      },

      validate() {
        if (this.$type === 'prompt') {
          var inputPattern = this.inputPattern;
          if (inputPattern && !inputPattern.test(this.inputValue || '')) {
            this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!';
            return false;
          }
          var inputValidator = this.inputValidator;
          if (typeof inputValidator === 'function') {
            var validateResult = inputValidator(this.inputValue);
            if (validateResult === false) {
              this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!';
              return false;
            }
            if (typeof validateResult === 'string') {
              this.editorErrorMessage = validateResult;
              return false;
            }
          }
        }
        this.editorErrorMessage = '';
        return true;
      }
    },

    watch: {
      inputValue() {
        if (this.$type === 'prompt') {
          this.validate();
        }
      },

      visible(val) {
        if (val && this.$type === 'prompt') {
          setTimeout(() => {
            if (this.$els.input) {
              this.$els.input.focus();
            }
          }, 500);
        }
      }
    },

    data() {
      return {
        title: '',
        message: '',
        type: '',
        showInput: false,
        inputValue: null,
        inputPlaceholder: '',
        inputPattern: null,
        inputValidator: null,
        inputErrorMessage: '',
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: CONFIRM_TEXT,
        cancelButtonText: CANCEL_TEXT,
        confirmButtonPosition: 'right',
        confirmButtonHighlight: false,
        confirmButtonClass: '',
        confirmButtonDisabled: false,
        cancelButtonClass: '',
        cancelButtonHighlight: false,

        editorErrorMessage: null,
        callback: null
      };
    }
  }
</script>
