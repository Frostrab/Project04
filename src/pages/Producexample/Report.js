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
  // Tab1
  Team: 'ฝ่าย',
  GetDate: 'วันที่รับตัวอย่าง & เอกสารแนบ',
  TestDate: 'วันที่ทำการทดสอบ',
  ReplyDate: 'วันที่ส่งผลการทดสอบกลับฝ่ายจัดซื้อ',
  AND: 'เนื่องจาก',
  ETC: 'ข้อเสนอแนะเพิ่มเติม',
  // Tab2
  Q1: 'Q1',
  Q21: 'Q2.1',
  Q22: 'Q2.2',
  Q23: 'Q2.3',
  Q3: 'Q3',
  // Tab3
  Date: 'วันที่เข้าประชุม / วันที่สรุป',
  Total: 'ผลสรุป',
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
function onChange2(e) {
  console.log(`checked = ${e.target.checked}`);
}
function callback(key) {
  console.log(key);
}
@connect(({ loading }) => ({
  submitting: loading.effects['form/submitReport'],
}))
@Form.create()
class Report extends PureComponent {
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
          type: 'form/submitReport',
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
          <TabPane tab="หน่วยงานที่ทดสอบ" key="1">
            <Card
              title="หน่วยงานที่ทดสอบ"
              style={{ width: '100%' }}
              extra={<Button type="primary">ตกลง</Button>}
            >
              <Card className={styles.card} bordered={false}>
                <Form layout="vertical" hideRequiredMark>
                  {/* Row 1 */}
                  <Row gutter={16}>
                    <Col lg={6} md={12} sm={24}>
                      <Form.Item label={fieldLabels.Team}>
                        {getFieldDecorator('Team', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                      </Form.Item>
                    </Col>

                    <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                      <Form.Item label={fieldLabels.GetDate}>
                        {getFieldDecorator('GetDate', {
                          rules: [{ required: true, message: '' }],
                        })(<DatePicker />)}
                      </Form.Item>
                    </Col>
                  </Row>
                  {/* Row 2 */}
                  <Row gutter={16}>
                    <Col lg={6} md={12} sm={24}>
                      <Form.Item label={fieldLabels.TestDate}>
                        {getFieldDecorator('TestDate', {
                          rules: [{ required: true, message: '' }],
                        })(<DatePicker />)}
                      </Form.Item>
                    </Col>

                    <Col xl={{ span: 8, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                      <Form.Item label={fieldLabels.ReplyDate}>
                        {getFieldDecorator('ReplyDate', {
                          rules: [{ required: true, message: '' }],
                        })(<DatePicker />)}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col lg={3} md={12} sm={24}>
                      <Form.Item label={fieldLabels.Send}>
                        <p>ผลการตรวจวิเคราะห์โลหะหนัก</p>
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 4, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                      <Checkbox onChange={onChange2}>มี</Checkbox>
                    </Col>
                    <Col xl={{ span: 4, offset: 1 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                      <Checkbox onChange={onChange2}>ไม่มี</Checkbox>
                    </Col>
                    <Col xl={{ span: 4, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                      <Form.Item label={fieldLabels.AND}>
                        {getFieldDecorator('AND', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                      </Form.Item>
                    </Col>
                  </Row>
                  {/* Row 3 */}
                  <Row gutter={16}>
                    <Col lg={14} md={12} sm={24}>
                      <Form.Item label={fieldLabels.ETC}>
                        {getFieldDecorator('ETC', {
                          rules: [
                            {
                              required: true,
                              message: 'Please enter description',
                            },
                          ],
                        })(
                          <TextArea
                            style={{ minHeight: 32 }}
                            placeholder="Enter Description"
                            rows={4}
                          />
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </Card>
          </TabPane>
          <TabPane tab="หน่วยงานที่ทดสอบ" key="2">
            <Card
              title="หน่วยงานที่ทดสอบ"
              style={{ width: '100%' }}
              extra={<Button type="primary">ตกลง</Button>}
            >
              <Form layout="vertical" hideRequiredMark>
                {/* Row 1 */}
                <Row gutter={16}>
                  <Col lg={6} md={12} sm={24}>
                    <Form.Item label={fieldLabels.Q1}>
                      {getFieldDecorator('Q1', {
                        rules: [{ required: true, message: '' }],
                      })(<Input placeholder="" />)}
                    </Form.Item>
                  </Col>
                  <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
                  <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} />
                </Row>
                {/* Row 2 */}
                <Row gutter={16}>
                  <Col lg={6} md={12} sm={24}>
                    <Form.Item label={fieldLabels.Q21}>
                      {getFieldDecorator('Q21', {
                        rules: [{ required: true, message: '' }],
                      })(<Input placeholder="" />)}
                    </Form.Item>
                  </Col>
                  <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                    <Form.Item label={fieldLabels.Q22}>
                      {getFieldDecorator('Q22', {
                        rules: [{ required: true, message: '' }],
                      })(<Input placeholder="" />)}
                    </Form.Item>
                  </Col>
                  <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                    <Form.Item label={fieldLabels.Q23}>
                      {getFieldDecorator('Q23', {
                        rules: [{ required: true, message: '' }],
                      })(<Input placeholder="" />)}
                    </Form.Item>
                  </Col>
                </Row>
                {/* Row 3 */}
                <Row gutter={16}>
                  <Col lg={6} md={12} sm={24}>
                    <Form.Item label={fieldLabels.Q3}>
                      {getFieldDecorator('Q3', {
                        rules: [{ required: true, message: '' }],
                      })(<Input placeholder="" />)}
                    </Form.Item>
                  </Col>
                  <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
                  <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} />
                </Row>
                {/* Row 4 */}
                <Row gutter={16}>
                  <Col lg={12} md={12} sm={24}>
                    <p>กลุ่ม :</p>
                    <Checkbox onChange={onChange2}>Critical</Checkbox>
                    <Checkbox onChange={onChange2}>Major</Checkbox>
                    <Checkbox onChange={onChange2}>Minor</Checkbox>
                    <Checkbox onChange={onChange2}>Low</Checkbox>
                    <Checkbox onChange={onChange2}>กลุ่มพิเศษ</Checkbox>
                  </Col>
                </Row>
                {/* Row 5 */}
                <Row gutter={16}>
                  <Col lg={12} md={12} sm={24}>
                    <p>เกณฑ์พิจารณา :</p>
                    <Checkbox onChange={onChange2}>Audit</Checkbox>
                    <Checkbox onChange={onChange2}>Questionnaire & Certificate</Checkbox>
                  </Col>
                </Row>
              </Form>
            </Card>
          </TabPane>
          <TabPane tab="การพิจารณาหลักเกณฑ์ในการคัดเลือก วัตถุดิบ / สารเคมี / บรรจุภัณฑ์" key="3">
            <Card
              title="การสรุปของคณะกรรมการ ความปลอดภัยของอาหาร"
              style={{ width: '100%' }}
              extra={<Button type="primary">ตกลง</Button>}
            >
              <Row>
                <Col lg={14} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Date}>
                    {getFieldDecorator('Date', {
                      rules: [{ required: true, message: '' }],
                    })(<DatePicker />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col lg={14} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Total}>
                    {getFieldDecorator('Total', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter description',
                        },
                      ],
                    })(
                      <TextArea
                        style={{ minHeight: 32 }}
                        placeholder="Enter Description"
                        rows={4}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Report;
