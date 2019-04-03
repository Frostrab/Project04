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
  MRPGRP: 'MRP Group',
  MRPType: 'MRP Type',
  MRPCon: 'MRP Controller',
  Reorder: 'Reorder point',
  Lot: 'Lot size',
  Min: 'Minimum Lot Size',
  Max: 'Maximum Lot Size',
  Fixed: 'Fixed Lot Size',
  MaxStock: 'Maximum Stock Level',
  Product: 'Product Hierarchy',
  Round: 'Rounding Value',
  ProcType: 'Procurement type',
  Planned: 'Planned Deliv. Time',
  Key: 'SchedMargin key',
  Safety: 'Safety Stock',
  Prod: 'Prod. Stor. Location',
  Cov: 'Coverage Profile',
  Period: 'Period Indicator',
  Strategy: 'Strategy group',
  Consum: 'Consumption mode',
  BWD: 'Bwd consumption per',
  FWD: 'Fwd consumption per.',
  AVA: 'Availability check',
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
export default class MRP extends PureComponent {
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
              <Form.Item label={fieldLabels.MRPGRP}>
                {getFieldDecorator('MRPGRP', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label={fieldLabels.MRPType}>
                {getFieldDecorator('MRPType', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
          </Row>
          {/* Row 2 */}
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label={fieldLabels.MRPCon}>
                {getFieldDecorator('MRPCon', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
          </Row>
          {/* Row 3 */}
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label={fieldLabels.Reorder}>
                {getFieldDecorator('Reorder', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label={fieldLabels.Lot}>
                {getFieldDecorator('Lot', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
          </Row>
          {/* Row 4 */}
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label={fieldLabels.Min}>
                {getFieldDecorator('Min', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label={fieldLabels.Max}>
                {getFieldDecorator('Max', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
          </Row>
          {/* Row 5 */}
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label={fieldLabels.Fixed}>
                {getFieldDecorator('Fixed', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label={fieldLabels.MaxStock}>
                {getFieldDecorator('MaxStock', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
          </Row>
          {/* Row 6 */}
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label={fieldLabels.Round}>
                {getFieldDecorator('Round', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
          </Row>
          {/* Row 7 */}
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label={fieldLabels.ProcType}>
                {getFieldDecorator('ProcType', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
          </Row>
          {/* Row 8 */}
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label={fieldLabels.Planned}>
                {getFieldDecorator('Planned', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label={fieldLabels.Key}>
                {getFieldDecorator('Key', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
          </Row>
          {/* Row 9 */}
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label={fieldLabels.Safety}>
                {getFieldDecorator('Safety', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label={fieldLabels.Cov}>
                {getFieldDecorator('Cov', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
          </Row>
          {/* Row 10 */}
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label={fieldLabels.Prod}>
                {getFieldDecorator('Prod', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
          </Row>
          {/* Row 11 */}
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label={fieldLabels.Period}>
                {getFieldDecorator('Period', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label={fieldLabels.Strategy}>
                {getFieldDecorator('Strategy', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
          </Row>
          {/* Row 12 */}
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label={fieldLabels.Consum}>
                {getFieldDecorator('Consum', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label={fieldLabels.BWD}>
                {getFieldDecorator('BWD', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
          </Row>
          {/* Row 13 */}
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label={fieldLabels.FWD}>
                {getFieldDecorator('FWD', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label={fieldLabels.AVA}>
                {getFieldDecorator('AVA', {
                  rules: [{ required: true, message: '' }],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
          </Row>
        </Form>
      </div>
    );
  }
}
