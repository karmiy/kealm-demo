# Pop

弹出层抽象动画组件（仅包含动画 + 蒙层），是其他弹框类组件的基层，类似于 RN 自带的 Modal

## 解决了什么？

- RN 自带的 Modal 兼容问题

- RN 中没有 fixed 布局，在较深的组件层级中，单纯的 absolute 将会受到父级元素的影响，难以计算定位值

- absolute 布局在深层组件中，zIndex 层级难以把握

## 实现了什么？

- Pop 将 children 部分的节点提取至顶层渲染（作为 **PortalWrapper** 的 children 之一），不受当前组件层级影响

- 节点不透明度从 0 到 1 的动画过渡效果

- 自带的蒙层

- 可联动进行动画的函数型 children

- 比 RN Modal 更灵活的 API 配置

## 关于 PortalWrapper

页面内 Pop 的 children 子节点都会被提取至 PortalWrapper 旁

```tsx
const App: React.FC => () => {
    return (
        <View style={{ flex: 1 }}>
            {/* 1、将 PortalWrapper 至于页面顶部，通常在页面顶层 flex: 1 节点之下 */}
            <PortalWrapper>
                <View>
                    <View>
                        <View>
                            {/* 2、任意位置使用 Pop */}
                            <Pop>
                                <Text>pop - 1</Text>
                            </Pop>
                            <Pop>
                                <Text>pop - 2</Text>
                            </Pop>
                        </View>
                    </View>
                </View>
            </PortalWrapper>
        </View>
    )
}
```

以上将被渲染为：

```tsx
const App: React.FC => () => {
    return (
        <View style={{ flex: 1 }}>
            <View>
                <View>
                    <View>
                    </View>
                </View>
            </View>
            {/* Pop 被提取至了 PortalWrapper 之下 */}
            <Pop>
                <Text>pop - 1</Text>
            </Pop>
            <Pop>
                <Text>pop - 2</Text>
            </Pop>
        </View>
    )
}
```

## 基本使用（无动画）

使用 Pop 实现各种弹框效果的需求，只需要自定义不同的 children

默认情况下，children 的出场是没有动画的

<img :src="$withBase('/images/react-native/pop-basic.png')" :width='300' />

```tsx
const styles = StyleSheet.create({
        content: {
            width: '100%',
            height: 80,
            backgroundColor: '#1394ff',
        },
});

const App: React.FC => () => {
    const [visible, setVisible] = useState(false);

    return (
    	<View>
            <Button onPress={() => setVisible(true)}>弹出 Pop</Button>
            <Pop visible={visible} onVisibleChange={setVisible}>
                <View style={styles.content} />
            </Pop>
        </View>
    )
}
```

## 动画效果

如果希望 Pop 的内容也可以实现动画，那么 children 可以传递一个**函数**

函数将接收一个类型为 **Animated.Value** 的参数 animate：

- 在 Pop 显示时，animate 的值将随动画从 0 缓动为 1

- 在 Pop 隐藏时，animate 的值将随动画从 1 缓动为 0

这意味着你可以使用 animate 让 children 内容实现各种自己想要的动画效果，只需知道，它是一个在 [0, 1] 间变化的值

如下让 children 内容随 Pop 实现透明度的淡入淡出：

```tsx
const styles = StyleSheet.create({
        content: {
            width: '100%',
            height: 80,
            backgroundColor: '#1394ff',
        },
});

const App: React.FC => () => {
    const [visible, setVisible] = useState(false);

    return (
    	<View>
            <Button onPress={() => setVisible(true)}>弹出 Pop</Button>
            <Pop visible={visible} onVisibleChange={setVisible}>
                {/* children 传递一个函数 */}
                {({ animate }) => (
                    <Animated.View
                        style={[
                            styles.content,
                            {
                                opacity: animate,
                            },
                        ]}
                    />
                )}
            </Pop>
        </View>
    )
}
```

## 内容居中

大多数情况下，我们可能更希望弹框中内容可以居中，使用 isCenter 即可实现

<img :src="$withBase('/images/react-native/pop-center.png')" :width='240' />

```tsx
const styles = StyleSheet.create({
        content: {
            width: '100%',
            height: 80,
            backgroundColor: '#1394ff',
        },
});

const App: React.FC => () => {
    const [visible, setVisible] = useState(false);

    return (
    	<View>
            <Button onPress={() => setVisible(true)}>弹出 Pop</Button>
            {/* 配置 isCenter */}
            <Pop visible={visible} onVisibleChange={setVisible} isCenter>
                {({ animate }) => (
                    <Animated.View
                        style={[
                            styles.content,
                            {
                                opacity: animate,
                            },
                        ]}
                    />
                )}
            </Pop>
        </View>
    )
}
```

## 自定义动画时长

默认情况下，Pop 的动画时长是 150ms，可以使用 duration 配置自定义的动画时长

```tsx
const styles = StyleSheet.create({
        content: {
            width: '100%',
            height: 80,
            backgroundColor: '#1394ff',
        },
});

const App: React.FC => () => {
    const [visible, setVisible] = useState(false);

    return (
    	<View>
            <Button onPress={() => setVisible(true)}>弹出 Pop</Button>
            {/* 配置 duration 自定义动画时长 */}
            <Pop visible={visible} onVisibleChange={setVisible} duration={500}>
                {({ animate }) => (
                    <Animated.View
                        style={[
                            styles.content,
                            {
                                opacity: animate,
                            },
                        ]}
                    />
                )}
            </Pop>
        </View>
    )
}
```