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
  Sale: 'Sale Org.',
  Distribute: 'Distribute Channel',
  Mat1: 'MaterialGroup 1',
  Mat2: 'MaterialGroup 2',
  Mat3: 'MaterialGroup 3',
  Mat4: 'MaterialGroup 4',
  Mat5: 'MaterialGroup 5',
  Deliv: 'Delivery Plant',
  Tax: 'TaxClassification',
  Product: 'Product Hierarchy',
  Act: 'Acct assignment grp',
  Matl: 'Matl.Statistics grp',
  Ava: 'Availability check',
  Item: 'Item Category',
  Transport: 'Transport Group',
  Loading: 'Loading Group',
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
export default class SaleData extends PureComponent {
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
              <Form.Item label={fieldLabels.Sale}>
                {getFieldDecorator('Sale', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label={fieldLabels.Distribute}>
                {getFieldDecorator('Distribute', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
          </Row>
          {/* Row 2 */}
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24} />
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label={fieldLabels.Mat1}>
                {getFieldDecorator('Mat1', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
          </Row>
          {/* Row 3 */}
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label={fieldLabels.Deliv}>
                {getFieldDecorator('Deliv', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label={fieldLabels.Mat2}>
                {getFieldDecorator('Mat2', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
          </Row>
          {/* Row 4 */}
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label={fieldLabels.Tax}>
                {getFieldDecorator('Tax', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label={fieldLabels.Mat3}>
                {getFieldDecorator('Mat3', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
          </Row>
          {/* Row 4 */}
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24} />

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label={fieldLabels.Mat4}>
                {getFieldDecorator('Mat4', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
          </Row>
          {/* Row 5 */}
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label={fieldLabels.Product}>
                {getFieldDecorator('Product', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label={fieldLabels.Mat5}>
                {getFieldDecorator('Mat5', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
          </Row>
          {/* Row 6 */}
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label={fieldLabels.Act}>
                {getFieldDecorator('Act', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label={fieldLabels.Matl}>
                {getFieldDecorator('Matl', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label={fieldLabels.Ava}>
                {getFieldDecorator('Ava', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
          </Row>
          {/* Row 7*/}
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label={fieldLabels.Item}>
                {getFieldDecorator('Item', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label={fieldLabels.Transport}>
                {getFieldDecorator('Transport', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label={fieldLabels.Loading}>
                {getFieldDecorator('Loading', {
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
