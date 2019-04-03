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
  itemnumber: 'Item Number',
  UM: 'UM',
  Description: 'Description',
  Prodbrand: 'Prod.Brand',
  Alternate: 'Alternate UM',
  Conversion: 'Conversion',
  Barcode1: 'Barcode-หน่วยขาย',
  Barcode2: 'Barcode-แพค',
  Barcode3: 'Barcode-ลังบรรจุ',
  Effective: 'Effective Date',
  Safety: 'Safety Stock',
  Requested: 'Requested by',
  Department: 'Department',
  Date: 'Date',
  Apporved: 'Approved by',
  Unit: 'Unit of Measure',
  AlternateUM: 'Alternate UM',
  ConversionUM: 'UM Conversion',
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
@connect(({ loading }) => ({
  submitting: loading.effects['form/submitMarketingForm'],
}))
@Form.create()
class MarketingForm extends PureComponent {
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
          type: 'form/submitMarketingForm',
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
          <TabPane tab="ฝ่ายการตลาด" key="1">
            <Card
              title="ฝ่ายการตลาด"
              style={{ width: '100%' }}
              extra={<Button type="primary">ตกลง</Button>}
            >
              <Card className={styles.card} bordered={false}>
                <Form layout="vertical" hideRequiredMark>
                  {/* Row 1 */}
                  <Row gutter={16}>
                    <Col lg={6} md={12} sm={24}>
                      <Form.Item label={fieldLabels.itemnumber}>
                        {getFieldDecorator('itemnumber', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                      <Form.Item label={fieldLabels.UM}>
                        {getFieldDecorator('UM', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} />
                  </Row>
                  {/* Row 2 */}
                  <Row gutter={16}>
                    <Col lg={14} md={12} sm={24}>
                      <Form.Item label={fieldLabels.Description}>
                        {getFieldDecorator('Description', {
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
                  {/* Row 3 */}
                  <Row gutter={16}>
                    <Col lg={6} md={12} sm={24}>
                      <Form.Item label={fieldLabels.Prodbrand}>
                        {getFieldDecorator('Prodbrand', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                        <span className="ant-form-text">(ตราผลิตภัณฑ์)</span>
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                      {/* <span className="ant-form-text">(ตราผลิตภัณฑ์)</span> */}
                    </Col>
                    <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} />
                  </Row>
                  {/* Row 4 */}
                  <Row gutter={16}>
                    <Col lg={6} md={12} sm={24}>
                      <Form.Item label={fieldLabels.Alternate}>
                        {getFieldDecorator('Alternate', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                        <span className="ant-form-text">(หน่วยขาย)</span>
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 3, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
                      {/* <p>(หน่วยขาย)</p> */}
                    </Col>
                    <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 18 }} sm={24}>
                      <Form.Item label={fieldLabels.Conversion}>
                        {getFieldDecorator('Conversion', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                        <span className="ant-form-text">(จำนวนสินค้า: หน่วยขาย)</span>
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 18 }} sm={24}>
                      {/* <p>(จำนวนสินค้า: หน่วยขาย)</p> */}
                    </Col>
                  </Row>
                  {/* Row 5 */}
                  <Row gutter={16}>
                    <Col lg={6} md={12} sm={24}>
                      <Form.Item label={fieldLabels.Barcode1}>
                        {getFieldDecorator('Barcode1', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
                    <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} />
                  </Row>
                  {/* Row 6 */}
                  <Row gutter={16}>
                    <Col lg={6} md={12} sm={24}>
                      <Form.Item label={fieldLabels.Barcode2}>
                        {getFieldDecorator('Barcode2', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
                    <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} />
                  </Row>
                  {/* Row 7 */}
                  <Row gutter={16}>
                    <Col lg={6} md={12} sm={24}>
                      <Form.Item label={fieldLabels.Barcode3}>
                        {getFieldDecorator('Barcode3', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
                    <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} />
                  </Row>
                  {/* Row 8 */}
                  <Row gutter={16}>
                    <Col lg={6} md={12} sm={24}>
                      <Form.Item label={fieldLabels.Effective}>
                        {getFieldDecorator('Effective', {
                          rules: [{ required: true, message: '' }],
                        })(<DatePicker onChange={onChange} />)}
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                      <Form.Item label={fieldLabels.Safety}>
                        {getFieldDecorator('Safety', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                        <span className="ant-form-text">(FG Product)</span>
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 8, offset: 0 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                      {/* <p>(FG Product)</p> */}
                    </Col>
                  </Row>
                  {/* Row 9 */}
                  <Row gutter={16}>
                    <Col lg={6} md={12} sm={24}>
                      <Form.Item label={fieldLabels.Requested}>
                        {getFieldDecorator('Requested', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                      <Form.Item label={fieldLabels.Department}>
                        {getFieldDecorator('Department', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                      <Form.Item label={fieldLabels.Date}>
                        <DatePicker onChange={onChange} />
                      </Form.Item>
                    </Col>
                  </Row>
                  {/* Row 10 */}
                  <Row gutter={16}>
                    <Col lg={6} md={12} sm={24}>
                      <Form.Item label={fieldLabels.Apporved}>
                        {getFieldDecorator('Apporved', {
                          rules: [{ required: true, message: '' }],
                        })(<Input placeholder="" />)}
                      </Form.Item>
                    </Col>
                    <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
                    <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                      <Form.Item label={fieldLabels.Date}>
                        <DatePicker onChange={onChange} />
                      </Form.Item>
                    </Col>
                  </Row>
                  {/* Row 9 */}
                  {/* <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.itemnumber}>
                  {getFieldDecorator('itemnumber', {
                    rules: [{ required: true, message: '' }],
                  })(<Input placeholder="" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.url}>
                  {getFieldDecorator('url', {
                    rules: [{ required: true, message: '' }],
                  })(<Input placeholder="" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>

              </Col>
            </Row> */}
                  {/* Row 10 */}
                  {/* <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.itemnumber}>
                  {getFieldDecorator('itemnumber', {
                    rules: [{ required: true, message: '' }],
                  })(<Input placeholder="" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.url}>
                  {getFieldDecorator('url', {
                    rules: [{ required: true, message: '' }],
                  })(<Input placeholder="" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>

              </Col>
            </Row> */}
                </Form>
              </Card>
            </Card>
          </TabPane>
          <TabPane tab="Unit of Measure Maintenance" key="2">
            <Card
              title="เพื่อการหนดการแปลงหน่วยสำหรับการขาย"
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
        </Tabs>
      </div>
    );
  }
}

export default MarketingForm;
