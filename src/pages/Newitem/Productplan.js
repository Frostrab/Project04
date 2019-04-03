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
  // Tab 1
  Buyer: 'Buyer / Planner',
  Pur: 'Pur LT',
  Max: 'Max Ord',
  PO: 'PO Site',
  Min: 'Min Ord',
  PerUnit: 'ราคาต่อหน่วย',
  Master: 'Master Sched',
  PurMFG: 'Pur / Mfg',
  Plan: 'Plan Orders',
  Ins: 'Ins LT',
  Order: 'Order Policy',
  MFG: 'MFG LT',
  Inspect: 'Inspect',
  OrderQTY: 'Order QTY',
  SafetyTime: 'Safety Time',
  Ord: 'Ord Mult',
  OrderP: 'Order Period',
  SafetyStock: 'Safety Stock',
  Yield: '% Yield',
  // Tab 2
  Draw: 'Drawing',
  Size: 'Size',
  DrawLoc: 'Drawing Loc',
  // Tab 3
  Cause: 'สาเหตุ',
  Cost: 'ต้นทุน',
  Date: 'วันที่',
  Attach: 'แนบเอกสาร',
  ProductionLine: 'Production Line',
  StartDate: 'StartDate',
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
  submitting: loading.effects['form/submitProductplan'],
}))
@Form.create()
class Productplan extends PureComponent {
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
          type: 'form/submitProductplan',
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
          <TabPane tab="Item Planning Data ข้อมูล ที่ใช้ในการวางแผนผลิต" key="1">
            <Card
              title="Item Planning Data ข้อมูล ที่ใช้ในการวางแผนผลิต"
              style={{ width: '100%' }}
              extra={<Button type="primary">ตกลง</Button>}
            >
              <Card className={styles.card} bordered={false}>
                <Form layout="vertical" hideRequiredMark>
                  {/* Row 1 */}
                  <Row gutter={16}>
                    <Col lg={6} md={12} sm={24}>
                      <Form.Item label={fieldLabels.Buyer}>
                        {getFieldDecorator('Buyer', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                      <Form.Item label={fieldLabels.Pur}>
                        {getFieldDecorator('Pur', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                      <Form.Item label={fieldLabels.Max}>
                        {getFieldDecorator('Max', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                      </Form.Item>
                    </Col>
                  </Row>
                  {/* Row 2 */}
                  <Row gutter={16}>
                    <Col lg={6} md={12} sm={24}>
                      <Form.Item label={fieldLabels.PO}>
                        {getFieldDecorator('PO', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                      <Form.Item label={fieldLabels.Min}>
                        {getFieldDecorator('Min', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                      <Form.Item label={fieldLabels.PerUnit}>
                        {getFieldDecorator('PerUnit', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                      </Form.Item>
                    </Col>
                  </Row>
                  {/* Row 3 */}
                  <Row gutter={16}>
                    <Col lg={6} md={12} sm={24}>
                      <Form.Item label={fieldLabels.Master}>
                        {getFieldDecorator('Master', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                      <Form.Item label={fieldLabels.Min}>
                        {getFieldDecorator('Min', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} />
                  </Row>
                  {/* Row 4 */}
                  <Row gutter={16}>
                    <Col lg={6} md={12} sm={24}>
                      <Form.Item label={fieldLabels.Plan}>
                        {getFieldDecorator('Plan', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                      <Form.Item label={fieldLabels.Ins}>
                        {getFieldDecorator('Ins', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} />
                  </Row>
                  {/* Row 5 */}
                  <Row gutter={16}>
                    <Col lg={6} md={12} sm={24}>
                      <Form.Item label={fieldLabels.Order}>
                        {getFieldDecorator('Order', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                      <Form.Item label={fieldLabels.MFG}>
                        {getFieldDecorator('MFG', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                      <Form.Item label={fieldLabels.Inspect}>
                        {getFieldDecorator('Inspect', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                      </Form.Item>
                    </Col>
                  </Row>
                  {/* Row 6 */}
                  <Row gutter={16}>
                    <Col lg={6} md={12} sm={24}>
                      <Form.Item label={fieldLabels.OrderQTY}>
                        {getFieldDecorator('OrderQTY', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                      <Form.Item label={fieldLabels.SafetyTime}>
                        {getFieldDecorator('SafetyTime', {
                          rules: [{ required: true, message: '' }],
                        })(<DatePicker onChange={onChange} />)}
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                      <Form.Item label={fieldLabels.Ord}>
                        {getFieldDecorator('Ord', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                      </Form.Item>
                    </Col>
                  </Row>
                  {/* Row 7 */}
                  <Row gutter={16}>
                    <Col lg={6} md={12} sm={24}>
                      <Form.Item label={fieldLabels.OrderP}>
                        {getFieldDecorator('OrderP', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                      <Form.Item label={fieldLabels.SafetyStock}>
                        {getFieldDecorator('SafetyStock', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                      <Form.Item label={fieldLabels.Yield}>
                        {getFieldDecorator('Yield', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </Card>
          </TabPane>
          <TabPane tab="ข้อมูลทางด้านการควบคุมสินค้าคงคลัง" key="2">
            <Card
              title="ข้อมูลทางด้านการควบคุมสินค้าคงคลัง"
              style={{ width: '100%' }}
              extra={<Button type="primary">ตกลง</Button>}
            >
              <Form layout="vertical" hideRequiredMark>
                {/* Row 1 */}
                <Row gutter={16}>
                  <Col lg={6} md={12} sm={24}>
                    <Form.Item label={fieldLabels.Draw}>
                      {getFieldDecorator('Draw', {
                        rules: [{ required: true, message: '' }],
                      })(<Input placeholder="" />)}
                    </Form.Item>
                  </Col>
                  <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                    <Form.Item label={fieldLabels.Size}>
                      {getFieldDecorator('Size', {
                        rules: [{ required: true, message: '' }],
                      })(<Input placeholder="" />)}
                    </Form.Item>
                  </Col>
                  <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                    <Form.Item label={fieldLabels.DrawLoc}>
                      {getFieldDecorator('DrawLoc', {
                        rules: [{ required: true, message: '' }],
                      })(<Input placeholder="" />)}
                    </Form.Item>
                  </Col>
                </Row>
                {/* Row 2 */}
                <Row gutter={16}>
                  <Col lg={6} md={12} sm={24}>
                    <Checkbox onChange={onChange2}>WIP/SEMI ฝ่ายผลิต</Checkbox>
                  </Col>
                  <Col xl={{ span: 8, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                    <Checkbox onChange={onChange2}>FG ฝ่ายWH0</Checkbox>
                  </Col>
                </Row>
              </Form>
            </Card>
          </TabPane>
          <TabPane tab="ข้อมูลกระบวนการผลิต" key="3">
            <Card
              title="ข้อมูลกระบวนการผลิต"
              style={{ width: '100%' }}
              extra={<Button type="primary">ตกลง</Button>}
            >
              <Form layout="vertical" hideRequiredMark>
                {/* Row 1 */}
                <Row gutter={16}>
                  <Col lg={6} md={12} sm={24}>
                    <Checkbox onChange={onChange2}>Yes</Checkbox>
                    <br />
                    <Checkbox onChange={onChange2}>No</Checkbox>
                  </Col>
                  <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                    <Form.Item label={fieldLabels.Cause}>
                      {getFieldDecorator('Cause', {
                        rules: [{ required: true, message: '' }],
                      })(<Input placeholder="" />)}
                    </Form.Item>
                  </Col>
                  <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} />
                </Row>
                {/* Divider #1 */}
                <Divider />
                {/* Row Message #1 */}
                <Row gutter={16}>
                  <Col lg={6} md={12} sm={24}>
                    <p>ส่งรายงานให้แผนกฝ่าย</p>
                  </Col>
                  <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
                  <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} />
                </Row>
                {/* Row 3 */}
                <Row gutter={16}>
                  <Col lg={6} md={12} sm={24}>
                    <Form.Item label={fieldLabels.Cost}>
                      {getFieldDecorator('Cost', {
                        rules: [{ required: true, message: '' }],
                      })(<Input placeholder="" />)}
                    </Form.Item>
                  </Col>
                  <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                    <Form.Item label={fieldLabels.Date}>
                      {getFieldDecorator('Date', {
                        rules: [{ required: true, message: '' }],
                      })(<DatePicker onChange={onChange2} />)}
                    </Form.Item>
                  </Col>
                  <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} />
                </Row>
                {/* Row 4  Upload */}
                <Row gutter={16}>
                  <Col lg={6} md={12} sm={24}>
                    <UploadItem />
                  </Col>
                </Row>
                {/* Divider #2 */}
                <Divider />
                {/* Row 5 Message #2 */}
                <Row gutter={16}>
                  <Col lg={6} md={12} sm={24}>
                    <p>Production Line (เพิ่ม)</p>
                  </Col>
                  <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
                  <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} />
                </Row>

                {/* Row 6 */}
                <Row gutter={16}>
                  <Col lg={6} md={12} sm={24}>
                    <Form.Item label={fieldLabels.ProductionLine}>
                      {getFieldDecorator('ProductionLine', {
                        rules: [{ required: true, message: '' }],
                      })(<Input placeholder="" />)}
                    </Form.Item>
                  </Col>
                  <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                    <p>Primary Yes</p>
                  </Col>
                  <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                    <Form.Item label={fieldLabels.StartDate}>
                      {getFieldDecorator('StartDate', {
                        rules: [{ required: true, message: '' }],
                      })(<DatePicker onChange={onChange2} />)}
                    </Form.Item>
                  </Col>
                </Row>
                {/* Row 7 */}
                <Row gutter={16}>
                  <Col lg={6} md={12} sm={24}>
                    <Form.Item label={fieldLabels.ProductionLine}>
                      {getFieldDecorator('ProductionLine', {
                        rules: [{ required: true, message: '' }],
                      })(<Input placeholder="" />)}
                    </Form.Item>
                  </Col>

                  <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                    <p>Primary No</p>
                  </Col>
                  <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                    <Form.Item label={fieldLabels.StartDate}>
                      {getFieldDecorator('StartDate', {
                        rules: [{ required: true, message: '' }],
                      })(<DatePicker onChange={onChange2} />)}
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Productplan;
