## React 命名规范

- 组件名：大驼峰命名

```jsx
class Drawer extends React.Component {
    ...
}

function Drawer(props) {
    ...
}
```

- 接口类型定义：I 字母开头 + 大驼峰 + Props / State

```tsx
interface IDrawerProps {
    ...
}

interface IDrawerState {
    ...
}

class Drawer extends React.Component<IDrawerProps, IDrawerState> {
    ...
}
```