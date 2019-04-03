import React, { PureComponent } from 'react';
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
  Tabs,
  Checkbox,
  Upload,
  Divider,
} from 'antd';
import { connect } from 'dva';
import FooterToolbar from '@/components/FooterToolbar';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import UploadItem from './Upload';
import styles from './style.less';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const TabPane = Tabs.TabPane;

const fieldLabels = {
  // Tab 3
  SPdata: 'Supplier Data',
  Bank: 'Bank',
  Currency: 'Currency',
  Pricetable: 'Price Table',
  CocNum: 'Coc Number',
  BankAcc: 'Bank Account',
  AccType: 'Acct Type',
};

function onChange(date, dateString) {
  console.log(date, dateString);
}
function callback(key) {
  console.log(key);
}
function onChange2(e) {
  console.log(`checked = ${e.target.checked}`);
}
@connect(({ loading }) => ({
  submitting: loading.effects['form/submitAccTeam'],
}))
@Form.create()
class AccTeam extends PureComponent {
  state = {
    width: '100%',
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
          type: 'form/submitAccTeam',
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
    const { width } = this.state;

    return (
      <div>
        <Card
          title="ฝ่ายบัญชีและการเงิน"
          style={{ width: '100%' }}
          extra={<Button type="primary">ส่งเอกสาร</Button>}
        >
          <Form layout="vertical" hideRequiredMark>
            {/* Row 1 */}
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.SPdata}>
                  {getFieldDecorator('SPdata', {
                    rules: [{ required: true, message: '' }],
                  })(<Input placeholder="" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} />
            </Row>

            {/* Row 3 */}
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.Bank}>
                  {getFieldDecorator('Bank', {
                    rules: [{ required: true, message: '' }],
                  })(<Input placeholder="" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.Currency}>
                  {getFieldDecorator('Currency', {
                    rules: [{ required: true, message: '' }],
                  })(<Input placeholder="" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} />
            </Row>

            {/* Row 6 */}
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.Pricetable}>
                  {getFieldDecorator('Pricetable', {
                    rules: [{ required: true, message: '' }],
                  })(<Input placeholder="" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.CocNum}>
                  {getFieldDecorator('CocNum', {
                    rules: [{ required: true, message: '' }],
                  })(<Input placeholder="" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} />
            </Row>
            {/* Row 7 */}
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.BankAcc}>
                  {getFieldDecorator('BankAcc', {
                    rules: [{ required: true, message: '' }],
                  })(<Input placeholder="" />)}
                </Form.Item>
              </Col>

              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.Bank}>
                  {getFieldDecorator('Bank', {
                    rules: [{ required: true, message: '' }],
                  })(<Input placeholder="" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} />
            </Row>
            {/* Row 7 */}
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.AccType}>
                  {getFieldDecorator('AccType', {
                    rules: [{ required: true, message: '' }],
                  })(<Input placeholder="" />)}
                </Form.Item>
              </Col>

              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.Bank}>
                  {/* <Input placeholder="" /> */}
                  <Checkbox onChange={onChange2}>Transfer</Checkbox>
                  <Checkbox onChange={onChange2}>Cheque</Checkbox>
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} />
            </Row>
            {/* Divider #2 */}
            <Divider />
            {/* Row 4  Upload */}
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <UploadItem />
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    );
  }
}

export default AccTeam;
