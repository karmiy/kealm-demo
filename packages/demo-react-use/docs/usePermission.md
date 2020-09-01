## usePermission

使用 navigator.permissions 查询 [APIs](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API) 的权限状态

### 结构

```ts
type PermissionDesc =
    | PermissionDescriptor
    | DevicePermissionDescriptor
    | MidiPermissionDescriptor
    | PushPermissionDescriptor;

type State = PermissionState | '';

function usePermission(
    permissionDesc: PermissionDesc
): State;
```

### 函数与返回值

- Params:

    - permissionDesc: 权限查询项

- Return:

    - state: 权限状态

### 作用

- 获取 APIs 权限状态

### 何时使用

- 希望了解当前 APIs 权限状态，如是否有麦克风权限等

### 应用场景

- 判断当前是否有麦克风权限，提示相关结果

### 源码细节

[usePermission 源码地址](https://github.com/streamich/react-use/blob/master/src/usePermission.ts)

### 示例

```tsx
function App() {
    const state = usePermission({ name: 'microphone' });

    return (
        <div className='app'>
            <pre>
                {JSON.stringify(state, null, 2)}
            </pre>
        </div>
    )
}
```
