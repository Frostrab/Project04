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
  Semi: 'SEMI Item No',
  Volume: 'Volume',
  UM: 'UM',
  Shelf: 'Shelf life',
  Cause: 'สาเหตุ',
  Send: 'ส่งรายงานให้แผนก/ฝ่าย',
  Unit: 'Unit of Measure',
  AlternateUM: 'Alternate UM',
  ConversionUM: 'UM Conversion',
  Rev: 'REV',
  Promo: 'Promo Group',
  Net: 'Net Weight',
  Ship: 'Ship Weight',
  Lot: 'Lot/Serial Control',
  Site: 'Site',
  Location: 'Location',
  WO: 'WO Receipt Status',
  Active: 'Active',
  Cause: 'สาเหตุ',
  Upload: 'แนบเอกสาร',
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
  submitting: loading.effects['form/submitRD'],
}))
@Form.create()
class RD extends PureComponent {
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
          type: 'form/submitRD',
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
          <TabPane tab="น้ำหนักสินค้า" key="1">
            <Card
              title="ฝ่าย R&D"
              style={{ width: '100%' }}
              extra={<Button type="primary">ตกลง</Button>}
            >
              <Card className={styles.card} bordered={false}>
                <Form layout="vertical" hideRequiredMark>
                  {/* Row 1 */}
                  <Row gutter={16}>
                    <Col lg={4} md={12} sm={24}>
                      <Form.Item label={fieldLabels.Semi}>
                        {getFieldDecorator('Semi', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                      </Form.Item>
                    </Col>
                  </Row>

                  {/* Row 2 */}
                  <Row gutter={16}>
                    <Col lg={4} md={12} sm={24}>
                      <Form.Item label={fieldLabels.Volume}>
                        {getFieldDecorator('Volume', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                      <Form.Item label={fieldLabels.UM}>
                        {getFieldDecorator('UM', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                        <span className="ant-form-text">
                          (น้ำหนักสุทธิต่อหน่วยขายไม่รวม Package)
                        </span>
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                      {/* <p>(น้ำหนักสุทธิต่อหน่วยขายไม่รวม Package)</p> */}
                    </Col>
                  </Row>
                  {/* Row 3 */}
                  <Row gutter={16}>
                    <Col lg={4} md={12} sm={24}>
                      <Form.Item label={fieldLabels.Shelf}>
                        {getFieldDecorator('Shelf', {
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
          <TabPane tab="การจัดการสูตรการผลิต" key="2">
            <Card
              title="ฝ่าย R&D"
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
                </Row>
                <Row gutter={16}>
                  <Col lg={14} md={12} sm={24}>
                    <Form.Item label={fieldLabels.Send}>
                      {getFieldDecorator('Send', {
                        rules: [
                          {
                            required: true,
                            message: 'Please enter description',
                          },
                        ],
                      })(<TextArea style={{ minHeight: 32 }} placeholder="" rows={4} />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col lg={14} md={12} sm={24}>
                    <UploadItem />
                  </Col>
                </Row>
              </Form>
            </Card>
          </TabPane>
          {/* Tab 3 */}
          <TabPane tab="เพื่อกำหนดการแปลงหน่วย Work in process" key="3">
            <Card
              title="เพื่อกำหนดการแปลงหน่วย Work In Process"
              style={{ width: '100%' }}
              extra={<Button type="primary">ตกลง</Button>}
            >
              <Form layout="vertical" hideRequiredMark>
                {/* Row 1 */}
                <Row gutter={16}>
                  <Col lg={6} md={12} sm={24}>
                    <Form.Item label={fieldLabels.Unit}>
                      {getFieldDecorator('Unit', {
                        rules: [{ required: true, message: '' }],
                      })(<Input placeholder="" />)}
                    </Form.Item>
                  </Col>
                  <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                    <Form.Item label={fieldLabels.AlternateUM}>
                      {getFieldDecorator('AlternateUM', {
                        rules: [{ required: true, message: '' }],
                      })(<Input placeholder="" />)}
                    </Form.Item>
                  </Col>
                  <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                    <Form.Item label={fieldLabels.ConversionUM}>
                      {getFieldDecorator('ConversionUM', {
                        rules: [{ required: true, message: '' }],
                      })(<Input placeholder="" />)}
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>
          </TabPane>
          {/* Tab 4 */}
          <TabPane tab="Item Data เพื่อทำการกำหนด Reference ของการผลิต" key="4">
            <Card
              title="Item Data เพื่อทำการกำหนด Reference ของการผลิต"
              style={{ width: '100%' }}
              extra={<Button type="primary">ตกลง</Button>}
            >
              {/* Row 1 */}
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Rev}>
                    {getFieldDecorator('Rev', {
                      rules: [{ required: true, message: '' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.Promo}>
                    {getFieldDecorator('Promo', {
                      rules: [{ required: true, message: '' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </TabPane>
          {/* Tab 5 */}
          <TabPane tab="ข้อมูลทางด้านการควบคุมสินค้าคงคลังและจัดส่ง" key="5">
            <Card
              title="ข้อมูลทางด้านการควบคุมสินค้าคงคลังและจัดส่ง"
              style={{ width: '100%' }}
              extra={<Button type="primary">ตกลง</Button>}
            >
              {/* Row 1 */}
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Lot}>
                    {getFieldDecorator('Lot', {
                      rules: [{ required: true, message: '' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.Site}>
                    {getFieldDecorator('Site', {
                      rules: [{ required: true, message: '' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item label={fieldLabels.Location}>
                    {getFieldDecorator('Location', {
                      rules: [{ required: true, message: '' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
              </Row>

              {/* Row 2 */}
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Checkbox onChange={onChange2}>สารผสม ฝ่าย R&D</Checkbox>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Checkbox onChange={onChange2}>WIP/SEMI ฝ่ายผลิต</Checkbox>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Checkbox onChange={onChange2}>FG ฝ่าย WH0</Checkbox>
                </Col>
              </Row>
              <Divider />
              {/* Row Message 1 */}
              <Row gutter={16}>
                <Col lg={8} md={12} sm={24}>
                  <p>ส่วนน้าหนักในการส่งสินค้า (FG Product)</p>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} />
              </Row>
              {/* Row 3 */}
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Net}>
                    {getFieldDecorator('Net', {
                      rules: [{ required: true, message: '' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.UM}>
                    {getFieldDecorator('UM', {
                      rules: [{ required: true, message: '' }],
                    })(<Input placeholder="" />)}
                    <span className="ant-form-text">(Ship Weight / จำนวนสินค้าต่อหน่วยขาย)</span>
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  {/* <p>(Ship Weight / จำนวนสินค้าต่อหน่วยขาย)</p> */}
                </Col>
              </Row>
              {/* Row 4 */}
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Ship}>
                    {getFieldDecorator('Ship', {
                      rules: [{ required: true, message: '' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.UM}>
                    {getFieldDecorator('UM', {
                      rules: [{ required: true, message: '' }],
                    })(<Input placeholder="" />)}
                    <span className="ant-form-text">(น้ำหนักรวม : หน่วยขาย)</span>
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  {/* <p>(น้ำหนักรวม : หน่วยขาย)</p> */}
                </Col>
              </Row>
            </Card>
          </TabPane>
          {/* Tab 6 */}
          <TabPane tab="การจัดสถานะสินค้า" key="6">
            <Card
              title="การจัดสถานะสินค้า"
              style={{ width: '100%' }}
              extra={<Button type="primary">ตกลง</Button>}
            >
              {/* Row 1 */}
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.WO}>
                    {getFieldDecorator('WO', {
                      rules: [{ required: true, message: '' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.Active}>
                    {getFieldDecorator('Active', {
                      rules: [{ required: true, message: '' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} />
              </Row>
              <Row gutter={16}>
                <Checkbox onChange={onChange2}>ตรวจสอบข้อมูลถูกต้องตามเอกสาร</Checkbox>
              </Row>
            </Card>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default RD;
