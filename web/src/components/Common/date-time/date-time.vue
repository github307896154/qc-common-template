<template>
  <div style="font-size:0">
    <DatePicker style="width:47%;font-size: 14px;" :format="dateFormat" type="date" :clearable="clearable" :readonly="readonly" v-model="date" @on-change="changeDate"></DatePicker>
    <TimePicker style="width:47%;margin-left:6%;font-size: 14px;" :steps="steps" :format="timeFormat" :clearable="clearable" :readonly="readonly" v-model="time" @on-change="changeTime"></TimePicker>
  </div>
</template>

<script>
import Vue from "vue";
import { formatTime, strReplaceAll } from "utils/lib";
import { TimePicker, DatePicker } from "view-design";
Vue.component("TimePicker", TimePicker);
Vue.component("DatePicker", DatePicker);
export default Vue.extend({
  name: "DateTime",
  props: {
    //是否显示清除按钮
    clearable: {
      type: Boolean,
      default: false
    },
    //日期显示的格式
    dateFormat: {
      type: String,
      default: "yyyy-MM-dd"
    },
    //时间显示的格式
    timeFormat: {
      type: String,
      default: "HH:mm"
    },
    //选择时间的step
    steps: {
      type: Array,
      default: () => [1, 1]
    },
    //是否只读
    readonly: {
      type: Boolean,
      default: false
    },
    //v-model绑定的值
    value: {}
  },
  data() {
    return {
      date: null,
      time: null
    };
  },
  methods: {
    changeDate(date) {
      this.$emit("input", new Date(`${date} ${this.time}`));
    },
    changeTime(time) {
      this.$emit(
        "input",
        new Date(`${formatTime(this.date, "yyyy-MM-dd")} ${time}`)
      );
    },
    formatDate(date) {
      if (typeof date === "string") {
        date = new Date(strReplaceAll(date, "-", "/"));
      }
      return date;
    }
  },
  created() {
    if (this.value) {
      let date = this.formatDate(this.value);
      this.date = formatTime(date, "yyyy-MM-dd");
      this.time = formatTime(date, "hh-mm");
    }
  },
  watch: {
    value(newValue) {
      if (newValue) {
        let date = this.formatDate(newValue);
        if (
          formatTime(this.date, "yyyy-MM-dd") !==
            formatTime(date, "yyyy-MM-dd") ||
          formatTime(this.time, "hh-mm") !== formatTime(date, "hh-mm")
        ) {
          this.date = formatTime(date, "yyyy-MM-dd");
          this.time = formatTime(date, "hh-mm");
        }
      }
    }
  }
});
</script>