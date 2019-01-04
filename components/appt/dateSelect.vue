<template>
  <div class="date-select">
    <div class="check-box date-btn-wrapper">
      <div class="dater-btn" @click="openDatePicker(1)"><!--请选择开始时间-->{{ $t('lang.placeholder.start_time') }}</div>
      <p v-if="pickerStartValue">{{ $t('lang.common.select') }}：{{ pickerStartValue }}</p>
    </div>
    <div class="check-box date-btn-wrapper">
      <div class="dater-btn" @click="openDatePicker(2)"><!--请选择结束时间-->{{ $t('lang.placeholder.end_time') }}</div>
      <p v-if="pickerEndValue">{{ $t('lang.common.select') }}：{{ pickerEndValue }}</p>
    </div>
    <mt-datetime-picker
      ref="picker1"
      type="datetime"
      :cancelText="$t('lang.btn.off')"
      :confirmText="$t('lang.btn.ok')"
      :year-format="'{value} '+$t('lang.common.year')"
      :month-format="'{value} '+$t('lang.common.mont')"
      :date-format="'{value} '+$t('lang.common.day')"
      :hour-format="'{value} '+$t('lang.common.hour')"
      @confirm="handleConfirm($event, '1')"
      :startDate="startDate" v-model="date1">
    </mt-datetime-picker>

    <mt-datetime-picker
      ref="picker2"
      type="datetime"
      :cancelText="$t('lang.btn.off')"
      :confirmText="$t('lang.btn.ok')"
      :year-format="'{value} '+$t('lang.common.year')"
      :month-format="'{value} '+$t('lang.common.mont')"
      :date-format="'{value} '+$t('lang.common.day')"
      :hour-format="'{value} '+$t('lang.common.hour')"
      @confirm="handleConfirm($event, '2')"
      :startDate="startDate" v-model="date2">
    </mt-datetime-picker>
  </div>
</template>

<script>
  import {_filterToWholePoint, _filterDateString, toast} from '../../assets/js/tool'

  export default {
    data() {
      return {
        date1: '',
        date2: '',
        pickerStartValue: '',
        pickerEndValue: '',
        currentTimeRange: false,
        startDate: new Date()
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.pickerStartValue = '';
        this.pickerEndValue = '';
        this.currentTimeRange = false;
      },
      openDatePicker(type) {
        this.$refs['picker' + type].open();
      },
      handleConfirm(val, type) {
        if (type === '1') {
          this.date1 = val;
          this.pickerStartValue = _filterDateString(this.date1);
        } else {
          this.date2 = val;
          this.pickerEndValue = _filterDateString(this.date2);
        }
        if (this.date1 && this.date2) {
          if (this.date2 > this.date1) {
            this.currentTimeRange = true;
            this.getDiff();
          } else {
            this.currentTimeRange = false;
            toast(this.$t('lang.common.timeDy'));
          }
        }
      },
      getDiff() {
        let diff = (_filterToWholePoint(this.date2) - _filterToWholePoint(this.date1)) / 3600000;
        this.$emit('on-ok', {
          start: this.pickerStartValue,
          end: this.pickerEndValue,
          diff: diff
        });
      }
    }
  }
</script>

<style lang='less' type="text/less">
  @import "../../assets/less/common";

  .date-select {
    .date-btn-wrapper {
      .dater-btn {
        width: 380px;
        height: 60px;
        line-height: 62px;
        text-align: center;
        border: 1px solid #fff;
        color: #d9d9d9;
        margin: 60px 0 0;
      }
      p {
        color: @themColor;
        margin-top: 16px;
      }
    }
    .picker-slot {
      &:nth-of-type(5) {
        display: none;
      }
    }
    .picker-toolbar{
      height:100px;
      .mint-datetime-action{
        height:100px;
        line-height: 100px;
        font-size: 40px;
      }
    }
    .picker-items{
      width: 100%;
      .picker-item{
        font-size:40px;
      }
    }

  }
</style>
