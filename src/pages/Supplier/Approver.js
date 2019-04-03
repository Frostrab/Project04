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
  Divider,
  Checkbox,
} from 'antd';
import { connect } from 'dva';
import FooterToolbar from '@/components/FooterToolbar';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableForm from './TableForm';
import styles from './style.less';
import Upload from './Upload';
import AccTeam from './AccTeam';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const fieldLabels = {
  SPcode: 'Supplier Code',
  SPName: 'ชื่อ Supplier',
  Term: 'เงื่อนไขการชำระเงิน',
  SortName: 'Sort Name',
  Address: 'ที่อยู่',
  Contact: 'ผู้ติดต่อ',
  Phone: 'เบอร์โทรศํพท์',
  Email: 'E-mail',
  FAX: 'เบอร์ FAX',
  Super: 'ซุปเปอร์ไวเซอร์',
  Product: 'ประธานกลุ่มสินค้า',
  Manager: 'ผู้จัดการฝ่าย',
  Judge: 'กรรมการผู้จัดการฝ่าย',

  // Tab 3
  SPdata: 'Supplier Data',
  Bank: 'Bank',
  Currency: 'Currency',
  Pricetable: 'Price Table',
  CocNum: 'Coc Number',
  BankAcc: 'Bank Account',
  AccType: 'Acct Type',
};

const tableData = [
  {
    key: '1',
    Item: '00001',
    Description: 'Description1',
  },
  {
    key: '2',
    Item: '00002',
    Description: 'Description2',
  },
  {
    key: '3',
    Item: '00003',
    Description: 'Description3',
  },
];

function onChange2(e) {
  console.log(`checked = ${e.target.checked}`);
}
@connect(({ loading }) => ({
  submitting: loading.effects['form/submitApprover'],
}))
@Form.create()
class Approver extends PureComponent {
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
          type: 'form/submitApprover',
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
          title="Approver"
          style={{ width: '100%' }}
          extra={[
            <Button type="primary">อนุมัติ</Button>,
            <Button type="danger">ไม่อนุมัติ</Button>,
          ]}
        >
          <Card title="ฝ่ายจัดซื้อ" className={styles.card} bordered={false}>
            <Form layout="vertical" hideRequiredMark>
              {/* Row1 */}
              <Row gutter={16}>
                <Col lg={8} md={12} sm={24}>
                  <Form.Item label={fieldLabels.SPcode}>
                    {getFieldDecorator('SPcode', {
                      rules: [{ required: true, message: '' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} />
              </Row>
              {/* Row2 */}
              <Row gutter={16}>
                <Col lg={8} md={12} sm={24}>
                  <Form.Item label={fieldLabels.SPName}>
                    {getFieldDecorator('SPName', {
                      rules: [{ required: true, message: '请选择' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.Term}>
                    {getFieldDecorator('Term', {
                      rules: [{ required: true, message: '请选择' }],
                    })(<Input placeholder="" />)}
                    <span className="ant-form-text">วัน</span>
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} />
              </Row>
              {/* Row3 */}
              <Row gutter={16}>
                <Col lg={8} md={12} sm={24}>
                  <Form.Item label={fieldLabels.SortName}>
                    {getFieldDecorator('SortName', {
                      rules: [{ required: true, message: '' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} />
              </Row>
              {/* Row4 */}
              <Row gutter={16}>
                <Col lg={18} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Address}>
                    {getFieldDecorator('Address', {
                      rules: [{ required: true, message: '' }],
                    })(<TextArea style={{ minHeight: 32 }} placeholder="Enter Address" rows={4} />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} />
              </Row>
              {/* Row5 */}
              <Row gutter={16}>
                <Col lg={8} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Contact}>
                    {getFieldDecorator('Contact', {
                      rules: [{ required: true, message: '' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.Phone}>
                    {getFieldDecorator('Phone', {
                      rules: [{ required: true, message: '请选择' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} />
              </Row>
              {/* Row6 */}
              <Row gutter={16}>
                <Col lg={8} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Email}>
                    {getFieldDecorator('Email', {
                      rules: [{ required: true, message: '' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.FAX}>
                    {getFieldDecorator('FAX', {
                      rules: [{ required: true, message: '请选择' }],
                    })(<Input placeholder="" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} />
              </Row>
              {/* Row5 */}
              <Row gutter={16}>
                <Col lg={8} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Super}>
                    {getFieldDecorator('Super', {
                      rules: [{ required: true, message: '' }],
                    })(
                      <Select placeholder="กรุณาเลือกบริษัท">
                        <Option value="บริษัท1">บริษัท1</Option>
                        <Option value="บริษัท2">บริษัท2</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.Super}>
                    {getFieldDecorator('Super', {
                      rules: [{ required: true, message: '请选择' }],
                    })(
                      <Select placeholder="กรุณาเลือกซุปเปอร์ไวเซอร์">
                        <Option value="Super1">Super1</Option>
                        <Option value="Super2">Super2</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} />
              </Row>
              {/* Row6 */}
              <Row gutter={16}>
                <Col lg={8} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Product}>
                    {getFieldDecorator('Product', {
                      rules: [{ required: true, message: '' }],
                    })(
                      <Select placeholder="กรุณาเลือกบริษัท">
                        <Option value="บริษัท1">บริษัท1</Option>
                        <Option value="บริษัท2">บริษัท2</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.Product}>
                    {getFieldDecorator('Product', {
                      rules: [{ required: true, message: '请选择' }],
                    })(
                      <Select placeholder="กรุณาเลือกประธานกลุ่มสินค้า">
                        <Option value="กลุ่มสินค้า1">กลุ่มสินค้า1</Option>
                        <Option value="กลุ่มสินค้า2">กลุ่มสินค้า2</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} />
              </Row>
              {/* Row7 */}
              <Row gutter={16}>
                <Col lg={8} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Manager}>
                    {getFieldDecorator('Manager', {
                      rules: [{ required: true, message: '' }],
                    })(
                      <Select placeholder="กรุณาเลือกบริษัท">
                        <Option value="บริษัท1">บริษัท1</Option>
                        <Option value="บริษัท2">บริษัท2</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.Manager}>
                    {getFieldDecorator('Manager', {
                      rules: [{ required: true, message: '请选择' }],
                    })(
                      <Select placeholder="กรุณาเลือกผู้จัดการฝ่าย">
                        <Option value="ผู้จัดการฝ่าย1">ผู้จัดการฝ่าย1</Option>
                        <Option value="ผู้จัดการฝ่าย2">ผู้จัดการฝ่าย2</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} />
              </Row>
              {/* Row8 */}
              <Row gutter={16}>
                <Col lg={8} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Judge}>
                    {getFieldDecorator('Judge', {
                      rules: [{ required: true, message: '' }],
                    })(
                      <Select placeholder="กรุณาเลือกบริษัท">
                        <Option value="บริษัท1">บริษัท1</Option>
                        <Option value="บริษัท2">บริษัท2</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.Judge}>
                    {getFieldDecorator('Judge', {
                      rules: [{ required: true, message: '请选择' }],
                    })(
                      <Select placeholder="กรุณาเลือกกรรมการผู้จัดการฝ่าย">
                        <Option value="กรรมการผู้จัดการฝ่าย1">กรรมการผู้จัดการฝ่าย1</Option>
                        <Option value="กรรมการผู้จัดการฝ่าย2">กรรมการผู้จัดการฝ่าย2</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} />
              </Row>
            </Form>
          </Card>

          <Card title="รายละเอียด" bordered={false}>
            {getFieldDecorator('members', {
              initialValue: tableData,
            })(<TableForm />)}
            <Divider />
            <Form>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Checkbox onChange={onChange2}>Supplier ที่ราคาถูกกว่า</Checkbox>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Checkbox onChange={onChange2}>Supplier ที่ราคาแพงกว่า แต่มีรายเดียว</Checkbox>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Checkbox onChange={onChange2}>Supplier รายใหมเ่พิ่ม Itemใหม่</Checkbox>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Checkbox onChange={onChange2}>
                    Supplier ที่ราคาแพงกว่า และมีมากกว่า 1 ราย
                  </Checkbox>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Checkbox onChange={onChange2}>
                    Supplier รายใหม่เพิ่ม Itemใหม่ที่ฝ่ายอื่นหาให้
                    <select>
                      <option>ก</option>
                      <option>ข</option>
                      <option>ค</option>
                      <option>ง</option>
                    </select>
                  </Checkbox>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Checkbox onChange={onChange2}>
                    Supplier ที่ฝ่ายอื่นหาให้
                    <select>
                      <option>ก</option>
                      <option>ข</option>
                      <option>ค</option>
                      <option>ง</option>
                    </select>
                  </Checkbox>
                </Col>
              </Row>
            </Form>
          </Card>
        </Card>
        <AccTeam />
      </div>
    );
  }
}

export default Approver;
