import { PureComponent } from 'react';
// import ant design
import 'antd/dist/antd.css';
import {
  Card,
  Button,
  Form,
  Icon,
  Col,
  Row,
  DatePicker,
  TimePicker,
  Input,
  Select,
  Popover,
  Steps,
  Tabs,
  Collapse,
} from 'antd';
//------------------
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';

const fieldLabels = {
  With: 'With Qty Structure',
  Planned: 'Planned price 1',
  Donot: 'Do not cost',
  MatO: 'Material origin',
  PPrice: 'Planned price Date 1',
  OGRP: 'Origin group',
  ALT: 'Alternative BOM',
  BOM: 'BOM Usage',
};
const { TextArea } = Input;

const Step = Steps.Step;
const Option = Select.Option;

function handleChange(value) {
  console.log(`selected ${value}`);
}

function handleBlur() {
  console.log('blur');
}

function handleFocus() {
  console.log('focus');
}
@Form.create()
export default class AccData extends PureComponent {
  state = {
    current: 1,
  };
  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }
  getErrorInfo = () => {
    const {
      form: { getFieldsError },
    } = this.props;
    const errors = getFieldsError();
    const errorCount = Object.keys(errors).filter(key => errors[key]).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = fieldKey => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = Object.keys(errors).map(key => {
      if (!errors[key]) {
        return null;
      }
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <Icon type="cross-circle-o" className={styles.errorIcon} />
          <div className={styles.errorMessage}>{errors[key][0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={trigger => trigger.parentNode}
        >
          <Icon type="exclamation-circle" />
        </Popover>
        {errorCount}
      </span>
    );
  };

  resizeFooterToolbar = () => {
    requestAnimationFrame(() => {
      const sider = document.querySelectorAll('.ant-layout-sider')[0];
      if (sider) {
        const width = `calc(100% - ${sider.style.width})`;
        const { width: stateWidth } = this.state;
        if (stateWidth !== width) {
          this.setState({ width });
        }
      }
    });
  };

  validate = () => {
    const {
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        // submit the values
        dispatch({
          type: 'form/submitRequest',
          payload: values,
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      submitting,
    } = this.props;
    const { current } = this.state;
    return (
      <div className="animated fadeIn">
        <Form>
          {/* Row1 */}
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label={fieldLabels.With}>
                {getFieldDecorator('With', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label={fieldLabels.Planned}>
                {getFieldDecorator('Planned', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label={fieldLabels.Donot}>
                {getFieldDecorator('Donot', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
          </Row>
          {/* Row 2 */}
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label={fieldLabels.MatO}>
                {getFieldDecorator('MatO', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label={fieldLabels.PPrice}>
                {getFieldDecorator('PPrice', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
          </Row>
          {/* Row 3 */}
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label={fieldLabels.OGRP}>
                {getFieldDecorator('OGRP', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label={fieldLabels.ALT}>
                {getFieldDecorator('ALT', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label={fieldLabels.BOM}>
                {getFieldDecorator('BOM', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
