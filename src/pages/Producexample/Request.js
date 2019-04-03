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
  exam: 'หน่วยงานส่งตัวอย่างเพื่อทดสอบ',
  Itemtype: 'Item Type',
  Status: 'Status',
  ItemName: 'ชื่อสินค้า',
  ItemCode: 'Item Code',
  SendTest: 'ชื่อบริษัทที่ส่งไปทดสอบ',
  Count: 'จำนวนตัวอย่าง',
  SupplierItem: 'ชื่อทางการค้า(Supplier Item)',
  Doccount: 'รวมเอกสารแนบ',
  Specification: 'Specification',
  MSDS: 'MSDS',
  Analy: 'ผลการวิเคราะห์โลหะหนัก',
  Halal: 'Halal(ไทย)',
  COA: 'COA',
  Productdatasheet: 'Product Data Sheet',
  PicPackage: 'รูป Packaging',
  NonGMO: 'Non-GMOs',
  Flow: 'Flow Chart การผลิต',
  AND: 'เนื่องจาก',
  Book: 'หนังสือรับรองมาตรฐาน',
  Add: 'เพิ่มเติม',
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
  submitting: loading.effects['form/submitRequest'],
}))
@Form.create()
class Request extends PureComponent {
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
    const { width } = this.state;

    return (
      <div>
        <Card
          title="ฝ่าย R&D"
          style={{ width: '100%' }}
          extra={<Button type="primary">ตกลง</Button>}
        >
          <Form layout="vertical" hideRequiredMark>
            {/* Row 1 */}
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.exam}>
                  {getFieldDecorator('exam', {
                    rules: [{ required: true, message: '' }],
                  })(<Input placeholder="" />)}
                </Form.Item>
              </Col>

              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.Itemtype}>
                  {getFieldDecorator('Itemtype', {
                    rules: [{ required: true, message: '' }],
                  })(<Input placeholder="" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.Status}>
                  {getFieldDecorator('Status', {
                    rules: [{ required: true, message: '' }],
                  })(<Input placeholder="" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={3} md={12} sm={24}>
                <Form.Item label={fieldLabels.Send}>
                  <p>ทดสอบเพื่อ</p>
                </Form.Item>
              </Col>
              <Col xl={{ span: 4, offset: 0 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Checkbox onChange={onChange2}>ทดสอบคุณภาพ / การนำไปใช้</Checkbox>
              </Col>
              <Col xl={{ span: 4, offset: 0 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Checkbox onChange={onChange2}>เพื่อนำเข้าผลิตภัณฑ์ใหม่</Checkbox>
              </Col>
              <Col xl={{ span: 4, offset: 0 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Checkbox onChange={onChange2}>อื่นๆ</Checkbox>
              </Col>
              <Col xl={{ span: 6, offset: 1 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Input placeholder="" />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.ItemName}>
                  {getFieldDecorator('ItemName', {
                    rules: [{ required: true, message: '' }],
                  })(<Input placeholder="" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.ItemCode}>
                  {getFieldDecorator('ItemCode', {
                    rules: [{ required: true, message: '' }],
                  })(<Input placeholder="" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.SendTest}>
                  {getFieldDecorator('SendTest', {
                    rules: [{ required: true, message: '' }],
                  })(<Input placeholder="" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.Count}>
                  {getFieldDecorator('Count', {
                    rules: [{ required: true, message: '' }],
                  })(<Input placeholder="" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.SupplierItem}>
                  {getFieldDecorator('SupplierItem', {
                    rules: [{ required: true, message: '' }],
                  })(<Input placeholder="" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.Doccount}>
                  {getFieldDecorator('Doccount', {
                    rules: [{ required: true, message: '' }],
                  })(<Input placeholder="" />)}
                  <span className="ant-form-text">แผ่น</span>
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <p>เอกสารแนบประกอบการพิจารณา</p>
              </Col>
            </Row>
            {/* Row Upload 1 */}
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.Specification}>
                  <UploadItem />
                </Form.Item>
              </Col>

              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.MSDS}>
                  <UploadItem />
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.Analy}>
                  <UploadItem />
                </Form.Item>
              </Col>
            </Row>
            {/* Row Upload 2 */}
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.Halal}>
                  <UploadItem />
                </Form.Item>
              </Col>

              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.COA}>
                  <UploadItem />
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.Productdatasheet}>
                  <UploadItem />
                </Form.Item>
              </Col>
            </Row>
            {/* Row Upload 3 */}
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.PicPackage}>
                  <UploadItem />
                </Form.Item>
              </Col>

              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.NonGMO}>
                  <UploadItem />
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.Flow}>
                  <UploadItem />
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
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.AND}>
                  {getFieldDecorator('AND', {
                    rules: [{ required: true, message: '' }],
                  })(<Input placeholder="" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.Book}>
                  {getFieldDecorator('Book', {
                    rules: [{ required: true, message: '' }],
                  })(<Input placeholder="" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={14} md={12} sm={24}>
                <Form.Item label={fieldLabels.Add}>
                  {getFieldDecorator('Add', {
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
          </Form>
        </Card>
      </div>
    );
  }
}

export default Request;
