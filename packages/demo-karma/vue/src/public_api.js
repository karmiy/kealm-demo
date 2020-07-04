import Button from './components/button/public_api';
import Collapse from './components/collapse/public_api';
import Radio from './components/radio/public_api';
import Input from './components/input/public_api';
import Checkbox from './components/checkbox/public_api';
import Col from './components/col/public_api';
import Row from './components/row/public_api';
import Card from "./components/card/public_api";
import Tabs from "./components/tabs/public_api";
import Modal from "./components/modal/public_api";
import Alert from "./components/alert/public_api";
import Affix from "./components/affix/public_api";
import Breadcrumb from "./components/breadcrumb/public_api";
import Steps from "./components/steps/public_api";
import Pagination from "./components/pagination/public_api";
import InputNumber from "./components/input-number/public_api";
import Switch from "./components/switch/public_api";
import TimePicker from './components/time-picker/public_api';
import Tag from './components/tag/public_api';
import Tooltip from './components/tooltip/public_api';
import DatePicker from './components/date-picker/public_api';
import Rate from './components/rate/public_api';
import Slider from './components/slider/public_api';
import ColorPicker from './components/color-picker/public_api';
import Select from './components/select/public_api';
import Dropdown from './components/dropdown/public_api';
import Menu from './components/menu/public_api';
import message from './components/message/public_api';
import notification from './components/vc-notification/public_api';
import Avatar from './components/avatar/public_api';
import Badge from './components/badge/public_api';
import Form from './components/form/public_api';
import Transfer from './components/transfer/public_api';
import Tree from './components/tree/public_api';
import Anchor from './components/anchor/public_api';
import Progress from './components/progress/public_api';
import Upload from './components/upload/public_api';
import Table from './components/table/public_api';

const components = [
    Button,
    Collapse,
    Radio,
    Input,
    Checkbox,
    Col,
    Row,
    Card,
    Tabs,
    Modal,
    Alert,
    Affix,
    Breadcrumb,
    Steps,
    Pagination,
    InputNumber,
    Switch,
    TimePicker,
    Tag,
    Tooltip,
    DatePicker,
    Rate,
    Slider,
    ColorPicker,
    Select,
    Dropdown,
    Menu,
    Avatar,
    Badge,
    Form,
    Transfer,
    Tree,
    Anchor,
    Progress,
    Upload,
    Table,
]

const install = (Vue, opts = {}) => {
    // 注册组件
    components.map(component => {
        Vue.use(component);
    });
    Vue.prototype.$message = message;
    Vue.prototype.$notification = notification;
    Vue.prototype.$info = Modal.info;
    Vue.prototype.$success = Modal.success;
    Vue.prototype.$error = Modal.error;
    Vue.prototype.$warning = Modal.warning;
    Vue.prototype.$confirm = Modal.confirm;
}



export {
    Button,
    Collapse,
    Radio,
    Input,
    Checkbox,
    Col,
    Row,
    Card,
    Tabs,
    Modal,
    Alert,
    Affix,
    Breadcrumb,
    Steps,
    Pagination,
    InputNumber,
    Switch,
    TimePicker,
    Tag,
    Tooltip,
    DatePicker,
    Rate,
    Slider,
    ColorPicker,
    Select,
    Dropdown,
    Menu,
    message,
    notification,
    Avatar,
    Badge,
    Form,
    Transfer,
    Tree,
    Anchor,
    Progress,
    Upload,
    Table
}

export default {
    install
}