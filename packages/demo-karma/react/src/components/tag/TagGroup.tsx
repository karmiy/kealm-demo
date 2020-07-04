import * as React from 'react';
import CheckableTag from './CheckableTag';

interface TagGroupState {
  checkedTags: string[] | string;
}

interface TagGroupProps {
  mode?: 'checkbox' | 'radio';
  value?: string[] | string;
  onChange?: (checked: string | string[], current: string) => void;
}


export default class TagGroup extends React.Component<TagGroupProps, TagGroupState> {
  static defaultProps = {
    mode: 'checkbox',
  };
  state = {
    checkedTags: this.props.value || (this.props.mode === 'checkbox' ? [] : '')
  }
  // tag改变时触发
  tagChange = (checked: boolean, key: string) => {
    if(checked) {
      this.setState(preState => (
        {
          checkedTags: this.props.mode === 'checkbox' ? [...preState.checkedTags, key] : key,
        }
      ), () => { this.emitChange(key) });
    }else {
      this.setState({
        checkedTags: this.props.mode === 'checkbox' ? (this.state.checkedTags as string[]).filter(tag => tag !== key) : '',
      }, () => { this.emitChange(key) });
    }
  }
  // 提交onChange
  emitChange = (key: string) => {
    this.props.onChange && this.props.onChange(this.state.checkedTags, key);
  }
  renderTagGroup = () => {
    const cloneChildren:React.ReactElement[] = [];
    let vaildChildren = true;
    // 判断子元素是不是 CheckableTag
    React.Children.map(this.props.children, (element: React.ReactElement) => {
      if (element && element.type && element.type === CheckableTag) {
        // 重置onChange和checked（tag-group下CheckableTag自己的onChange和checked无效，由tag-group控制）
        const checked = this.props.mode === 'checkbox' ? (this.state.checkedTags as string[]).includes(element.key! + '') : (this.state.checkedTags as string) === (element.key! + '');
        cloneChildren.push(React.cloneElement(element, {
          checked,
          onChange: (checked: boolean) => {
            this.tagChange(checked, element.key! + '');
          }
        }));
      }else{
        vaildChildren = false;
      }
    })
    if(!vaildChildren)
      return null;

    return cloneChildren;
  }
  render() {
    return this.renderTagGroup();
  }

}