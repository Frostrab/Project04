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
} from 'antd';
import { connect } from 'dva';
import FooterToolbar from '@/components/FooterToolbar';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './style.less';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const TabPane = Tabs.TabPane;

const fieldLabels = {
  Modify: 'แก้ไข',
  ItemStat: 'Item Status',
  Prod: 'Prod.Line',
  Type: 'Item Type',
  Status: 'Status',
  Group: 'Group',
};

const tableData = [
  {
    key: '1',
    workId: '00001',
    name: 'John Brown',
    department: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    workId: '00002',
    name: 'Jim Green',
    department: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    workId: '00003',
    name: 'Joe Black',
    department: 'Sidney No. 1 Lake Park',
  },
];
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
  submitting: loading.effects['form/submitAccounting'],
}))
@Form.create()
class Accounting extends PureComponent {
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
          type: 'form/submitAccounting',
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
        <Tabs onChange={callback} type="card">
          {/* Tab 1 */}
          <TabPane tab="ข้อมูลเบื้องต้นการจัดการทางด้านบัญชีต้นทุน" key="1">
            <Card
              title="ฝ่ายบัญชีและการเงิน"
              style={{ width: '100%' }}
              extra={<Button type="primary">ตกลง</Button>}
            >
              <Card className={styles.card} bordered={false}>
                <Form layout="vertical" hideRequiredMark>
                  {/* Row 1 */}
                  <Row gutter={16}>
                    <Col lg={4} md={12} sm={24}>
                      <Form.Item label={fieldLabels.Prod}>
                        {getFieldDecorator('Prod', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 4, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                      <Form.Item label={fieldLabels.Type}>
                        {getFieldDecorator('Type', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 4, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                      <Form.Item label={fieldLabels.Status}>
                        {getFieldDecorator('Status', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 4, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                      <Form.Item label={fieldLabels.Group}>
                        {getFieldDecorator('Group', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </Card>
          </TabPane>
          {/* Tab 2 */}
          <TabPane
            tab="การคำนวณต้นทุนของสินค้ากึ่งสำเร็จรูป หรือ สินค้าสำเร็จรูป Roll-Up Cost"
            key="2"
          >
            <Card
              title="การคำนวณต้นทุนของสินค้ากึ่งสำเร็จรูป หรือ สินค้าสำเร็จรูป Roll-Up Cost"
              style={{ width: '100%' }}
              extra={<Button type="primary">ตกลง</Button>}
            >
              <Form layout="vertical" hideRequiredMark>
                {/* Row 1 */}
                <Row gutter={16}>
                  <Col lg={7} md={12} sm={24}>
                    <Checkbox onChange={onChange2}>14.13.13 Routing Cost Roll-Up</Checkbox>
                  </Col>
                  <Col xl={{ span: 8, offset: 0 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                    <Checkbox onChange={onChange2}>
                      13.12.13 Product Structure Cost Roll-Up
                    </Checkbox>
                  </Col>
                  <Col xl={{ span: 8, offset: 0 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                    <Checkbox onChange={onChange2}>13.12.14 Cumulative Lead Time Roll-Up</Checkbox>
                  </Col>
                </Row>
              </Form>
            </Card>
          </TabPane>
          {/* Tab 3 */}
          <TabPane tab="ตรวจสอบข้อมูลและแก้ไขItem Status" key="3">
            <Card
              title="ตรวจสอบข้อมูลและแก้ไขItem Status"
              style={{ width: '100%' }}
              extra={<Button type="primary">ตกลง</Button>}
            >
              {/* Row 1 */}
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Checkbox onChange={onChange2}>ข้อมูลถูกต้อง</Checkbox>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.Modify}>
                    {getFieldDecorator('Modify', {
                      rules: [{ required: true, message: '' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item label={fieldLabels.ItemStat}>
                    {getFieldDecorator('ItemStat', {
                      rules: [{ required: true, message: '' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </TabPane>
          {/* Tab 4 */}
          <TabPane
            tab="บันทึกข้อมูลครบถ้วน (เก็บใบ Input Form New Item Number ที่ฝ่าย บัญชีและการเงิน)"
            key="4"
          >
            <Card
              title="บันทึกข้อมูลครบถ้วน (เก็บใบ Input Form New Item Number ที่ฝ่าย บัญชีและการเงิน)"
              style={{ width: '100%' }}
              extra={<Button type="primary">ตกลง</Button>}
            >
              <Button type="primary">ดูเอกสาร</Button>
            </Card>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Accounting;
