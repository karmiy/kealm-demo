# Button

常用的操作按钮

<!-- ![Image](/images/button.png) -->

<!-- <img :src="$withBase('/images/react-native/button.png')" > -->

## 按钮类型

组件具有 3 种类型，具备不同的颜色主题效果，默认 primary：

- primary: 蓝（#4794ff）

- regular: 红（#ff4d88）

- info: 灰（#666）

<!-- <img :src="$withBase('/images/react-native/button-type.png')" > -->

```tsx
const App: React.FC => () => {
    return (
    	<View>
            <Button type='primary'>Primary</Button>
            <Button type='regular'>Regular</Button>
            <Button type='info'>Info</Button>
        </View>
    )
}
```

## 不透明度

组件借由 TouchableOpacity 包装，默认 activeOpacity 为 1（无按下态效果），可以通过 activeOpacity 自定义按下时的透明效果

```tsx
const App: React.FC => () => {
    return (
    	<View>
            <Button activeOpacity={0.5}>Primary</Button>
        </View>
    )
}
```

## API

| 属性名          | 说明                                                         | 类型                               | 默认值    |
| --------------- | ------------------------------------------------------------ | ---------------------------------- | --------- |
| styles          | 组件样式，可以覆盖任何默认样式                               | object                             | --        |
| activeOpacity   | 被触摸操作激活时以多少不透明度显示（Button 外层由 TouchableOpacity 包装） | number                             | 1         |
| width           | 按钮宽度                                                     | string / number                    | --        |
| height          | 按钮高度                                                     | string / number                    | --        |
| type            | 按钮类型                                                     | enum('primary', 'regular', 'info') | 'primary' |
| size            | 按钮大小，默认 28 高，大按钮 48                              | enum('large')                      | --        |
| radius          | 按钮圆角                                                     | number                             | --        |
| plain           | 是否是 plain 风格的按钮                                      | boolean                            | false     |
| plainWithBorder | plain 风格时是否带边框                                       | boolean                            | true      |
| fontSize        | 字体大小                                                     | number                             | --        |
| color           | 自定义颜色，非 plain 为背景填充色，plain 风格时为边框、字色  | string                             | --        |

除了默认配置项，还可以传递 [TouchableOpacityProps](https://reactnative.cn/docs/touchableopacity)，如

- style 样式
- disabled 是否禁用
- onPress 点击事件