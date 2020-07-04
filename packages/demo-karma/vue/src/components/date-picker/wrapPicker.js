import TimePickerPanel from '../vc-time-picker/Panel';
import classNames from 'classnames';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import { generateShowHourMinuteSecond } from '../time-picker/public_api';
import zhCN from './locale/zh_CN';
import { getOptionProps, initDefaultProps } from '../_util/props-util';

function getColumns({ showHour, showMinute, showSecond, use12Hours }) {
  let column = 0;
  if (showHour) {
    column += 1;
  }
  if (showMinute) {
    column += 1;
  }
  if (showSecond) {
    column += 1;
  }
  if (use12Hours) {
    column += 1;
  }
  return column;
}

export default function wrapPicker(Picker, props, defaultFormat) {
  return {
    name: Picker.name,
    props: initDefaultProps(props, {
      format: defaultFormat || 'YYYY-MM-DD',
      transitionName: 'slide-up',
      popupStyle: {},
      locale: {},
      prefixCls: 'salus-calendar',
      inputPrefixCls: 'salus-input',
    }),
    model: {
      prop: 'value',
      event: 'change',
    },

    mounted() {
      const { autoFocus, disabled } = this;
      if (autoFocus && !disabled) {
        this.$nextTick(() => {
          this.focus();
        });
      }
    },
    methods: {
      handleOpenChange(open) {
        this.$emit('openChange', open);
      },

      handleFocus(e) {
        this.$emit('focus', e);
      },

      handleBlur(e) {
        this.$emit('blur', e);
      },

      handleMouseEnter(e) {
        this.$emit('mouseenter', e);
      },

      handleMouseLeave(e) {
        this.$emit('mouseleave', e);
      },

      focus() {
        this.$refs.picker.focus();
      },

      blur() {
        this.$refs.picker.blur();
      },

      getDefaultLocale() {
        const result = {
          ...zhCN,
          ...this.locale,
        };
        result.lang = {
          ...result.lang,
          ...(this.locale || {}).lang,
        };
        return result;
      },

      renderPicker(locale, localeCode) {
        const props = getOptionProps(this);
        const { prefixCls, inputPrefixCls, size, showTime, disabled } = props;
        const pickerClass = classNames(`${prefixCls}-picker`, {
          [`${prefixCls}-picker-${size}`]: !!size,
        });
        // inputPrefixCls false是去除salus-input样式
        const pickerInputClass = classNames(`${prefixCls}-picker-input`, {[inputPrefixCls]: false}, {
          [`${inputPrefixCls}-lg`]: size === 'large',
          [`${inputPrefixCls}-sm`]: size === 'small',
          [`${inputPrefixCls}-disabled`]: disabled,
        });

        const timeFormat = (showTime && showTime.format) || 'HH:mm:ss';
        const vcTimePickerProps = {
          ...generateShowHourMinuteSecond(timeFormat),
          format: timeFormat,
          use12Hours: showTime && showTime.use12Hours,
        };
        const columns = getColumns(vcTimePickerProps);
        const timePickerCls = `${prefixCls}-time-picker-column-${columns}`;
        const timePickerPanelProps = {
          props: {
            ...vcTimePickerProps,
            ...showTime,
            prefixCls: `${prefixCls}-time-picker`,
            placeholder: locale.timePickerLocale.placeholder,
            transitionName: 'slide-up',
          },
          class: timePickerCls,
        };
        const timePicker = showTime ? <TimePickerPanel {...timePickerPanelProps} /> : null;
        // 把disabledDate函数修改，为了发送出Date对象
        /*const propsSwitch = {
          ...props,
        }
        props.disabledDate && (propsSwitch.disabledDate = (moment, ...rest) => {
          return props.disabledDate(moment && moment._d, ...rest);
        })*/
        // 重写disabledDate
        const preDisabledDate = props.disabledDate;
        props.disabledDate && (props.disabledDate = (moment, ...rest) => {
          return preDisabledDate(moment && moment._d, ...rest);
        })

        // 重写disabledTime
        const preDisabledTime = props.disabledTime;
        props.disabledTime && (props.disabledTime = (data,...rest) => {
          // 有moment数据先转Date再传回去
          let _data = null;
          if(data instanceof Array) {
            _data = data.map(moment => {
              return moment && moment._d;
            })
          }else {
            _data = data && data._d;
          }
          return preDisabledTime(_data, ...rest);
        })

        // 重写onOk
        const preOnOk = this.$listeners.ok;
        this.$listeners.ok && (this.$listeners.ok = (data, ...rest) => {
          // 不知为何会执行2次,第二次进来是Date就不转了
          let _data = null;
          if(data instanceof Array) {
            _data = data.map(date => {
              return date && (date._d ? date._d : date);
            });
          }else {
            _data = data && (data._d ? data._d : data);
          }
          return preOnOk(_data, ...rest);
        })

        // 重写onChange
        const preOnChange = this.$listeners.change;
        this.$listeners.change && (this.$listeners.change = (data, ...rest) => {
          // 不知为何会执行2次,第二次进来是Date就不转了
          let _data = null;
          if(data instanceof Array) {
            _data = data.map(date => {
              return date && (date._d ? date._d : date);
            });
          }else {
            _data = data && (data._d ? data._d : data);
          }
          return preOnChange(_data, ...rest);
        })

        // 重置format
        props.format = showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';

        const pickerProps = {
          props: {
            ...props,
            pickerClass,
            pickerInputClass,
            locale,
            localeCode,
            timePicker,
          },
          on: {
            ...this.$listeners,
            openChange: this.handleOpenChange,
            focus: this.handleFocus,
            blur: this.handleBlur,
            mouseenter: this.handleMouseEnter,
            mouseleave: this.handleMouseLeave,
          },
          ref: 'picker',
          scopedSlots: this.$scopedSlots || {},
        };
        return (
          <Picker {...pickerProps}>
            {this.$slots &&
              Object.keys(this.$slots).map(key => (
                <template slot={key} key={key}>
                  {this.$slots[key]}
                </template>
              ))}
          </Picker>
        );
      },
    },

    render() {
      return (
        <LocaleReceiver
          componentName="DatePicker"
          defaultLocale={this.getDefaultLocale}
          scopedSlots={{ default: this.renderPicker }}
        />
      );
    },
  };
}
