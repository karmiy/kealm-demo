import * as React from 'react';
import * as ReactDom from 'react-dom';
import RcCollapse from 'rc-collapse';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface CollapsePanelProps {
  key: string;
  header: React.ReactNode;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  showArrow?: boolean;
  codeBox?: boolean;
  prefixCls?: string;
  forceRender?: boolean;
  id?: string;
}

export default class CollapsePanel extends React.Component<CollapsePanelProps, {}> {
  private panelRef: any;
  constructor(props: CollapsePanelProps) {
    super(props);
    this.panelRef = React.createRef();
  }
  renderCodeContent = () => {
    if(!!this.props.codeBox) {
      // 如果是示例页面，要加上.
      const panelDom = ReactDom.findDOMNode(this.panelRef.current) as HTMLElement,
        contentBoxDom = panelDom ? panelDom.querySelector('.salus-collapse-content-box') : null;
      contentBoxDom && ((contentBoxDom as HTMLElement).style.padding = '0');
    }
  }
  componentDidMount() {
    this.renderCodeContent();
  }
  componentDidUpdate() {
    this.renderCodeContent();
  }
  renderCollapsePanel = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, className = '', showArrow = true } = this.props;
    const prefixCls = getPrefixCls('collapse', customizePrefixCls);
    const collapsePanelClassName = classNames(
      {
        [`${prefixCls}-no-arrow`]: !showArrow,
        /*['salus-collapse-code-content']: !!salusCodeBox*/
      },
      className,
    );
    return (
      <RcCollapse.Panel ref={this.panelRef} {...this.props} prefixCls={prefixCls} className={collapsePanelClassName} />
    );
  };

  render() {
    return <ConfigConsumer>{this.renderCollapsePanel}</ConfigConsumer>;
  }
}
