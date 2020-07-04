![logo](../../../shared/static/imgs/logo-kealm.png)

# Tooltip.js

需要 popper.js 支持才能使用

## 使用

new Tooltip(reference, options)

## Options

### placement

提示框位置

默认 'top'

top(-start, -end), right(-start, -end), bottom(-start, -end), left(-start, -end)

### arrowSelector

箭头 DOM 的 className

默认 '.tooltip-arrow' | '.tooltip__arrow'

### innerSelector

内部元素的 className

默认 '.tooltip-inner' | '.tooltip__inner'

### container

把提示框放在某个元素里，如用 div.container 包裹住 tooltip 节点 

默认 false

可以是 HTMLElement | string(css selector) |  false

### delay

延迟显示隐藏的时间

对手动触发无效

可以是 number | object

object 为 {show: 500, hide: 100} 形式

### html

是否可以插入 html 文本

默认 false

如果为 true，形如 title: "\<p>111\</p>" 可以被解析

### template

模板结构

string 类型

默认: 

    '<div class="tooltip" role="tooltip">
        <div class="tooltip-arrow"></div>
        <div class="tooltip-inner"></div>
    </div>'
    
要求: 

- 最外层 .tooltip，

- 包含 .tooltip-inner | .tooltip__inner 用于插入 title

- 包含 .tooltip-arrow | .tooltip__arrow 作为箭头

### title 

标题内容

默认 ''

可以是 string | HTMLElement | TitleFunction

### trigger

如何触发 tooltip 显示隐藏

默认 hover、focus

可以是 'manual' | 'click' | 'hover' | 'focus' 等

可以组合，用 ; 分开

### closeOnClickOutside

点击空白区域是否关闭

默认 false

在 trigger 为 click 时有效

### boundariesElement

边界元素

参考 [popper.js](../popper/README.md)

### offset

tooltip 相对 reference 的偏移

string | object

默认 0

参考 [popper.js](../popper/README.md)

### popperOptions

popper.js 的 options 配置

参考 [popper.js](../popper/README.md)

## Methods

### show

显示 tooltip，在 title 长度为0时无效

### hide

隐藏 tooltip

### dispose

销毁 tooltip 功能

### toggle

切换，即 show => hide、hide => show

### updateTitleContent

更新 title 内容
