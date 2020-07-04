import Button from './button';
import ButtonGroup from './button-group';
Button.Group = ButtonGroup;

Button.install = function(Vue) {
    Vue.component(Button.name, Button);
    Vue.component(ButtonGroup.name, ButtonGroup);
};

export default Button;
