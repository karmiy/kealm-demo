# Button

常用的操作按钮

<!-- ![Image](/images/button.png) -->

<!-- <img :src="$withBase('/images/react-native/button.png')" > -->

## 按钮类型

Button 具有 3 种类型，具备不同的颜色主题效果，默认 primary：

- primary: 蓝（#4794ff）

- regular: 红（#ff4d88）

- info: 灰（#666）

<img :src="$withBase('/images/react-native/button-type.png')" :width='380' />

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

## 按钮 Plain 简约风格

配置 plain 可以让 Button 切换为简约风

<img :src="$withBase('/images/react-native/button-plain.png')" :width='380' />

```tsx
const App: React.FC => () => {
    return (
    	<View>
            <Button type='primary' plain>Primary Plain</Button>
            <Button type='info' plain>Info Plain</Button>
            <Button type='regular' plain>Regular Plain</Button>
        </View>
    )
}
```

## 无边框的 Plain 风格按钮

将 plainWithBorder 设为 false 可以让 plain 按钮去除边框，通常应用在页面背景非白色调

<img :src="$withBase('/images/react-native/button-plain-without-border.png')" :width='380' />

```tsx
const App: React.FC => () => {
    return (
    	<View>
            <Button plain plainWithBorder={false}>
                Plain Without Border
            </Button>
        </View>
    )
}
```

## 自定义按钮色调

当默认的 type 色调不满足需求时，可以自定义按钮的颜色

<img :src="$withBase('/images/react-native/button-custom.png')" :width='400' />

```tsx
const App: React.FC => () => {
    return (
    	<View>
            <Button color='yellowgreen'>Custom Color</Button>
            <Button color='yellowgreen' plain>
                Custom Color with Plain
            </Button>
        </View>
    )
}
```

## 禁用

disabled 配置即可让按钮切换为禁用状态

<img :src="$withBase('/images/react-native/button-disabled.png')" :width='400' />

```tsx
const App: React.FC => () => {
    return (
    	<View>
            <Button disabled>Disabled</Button>
            <Button disabled type='regular' plain>
                Disabled Plain
            </Button>
        </View>
    )
}
```
## 按钮大小

默认情况下，按钮高度为 28，将 size 置为 large 即可变更为高度 48 的大型按钮

<img :src="$withBase('/images/react-native/button-size.png')" :width='400' />

```tsx
const App: React.FC => () => {
    return (
    	<View>
            <Button size='large'>Large</Button>
        </View>
    )
}
```

## 自定义按钮大小

当 size 内置的按钮宽高不满足需求时，可以通过 width、height 自定义按钮宽高

```tsx
const App: React.FC => () => {
    return (
    	<View>
            <Button width={108} height={32}>Custom</Button>
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