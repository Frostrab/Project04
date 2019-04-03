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

// import file
import GeneralData from './GeneralData';
import Unit from './Unit';
import Dimension from './Dimension';
import Text from './Text';
import SaleData from './SaleData';
import PData from './PData';
import MRP from './MRP';
import Planning from './Planning';
import AccData from './AccData';
import Costing from './Costing';
import Warehouse from './Warehouse';

const Panel = Collapse.Panel;
const fieldLabels = {
  Goal: 'วัตถุประสงค์',
  GetDate: 'วันที่ ที่บัญชีรับเอกสาร',
  SapDate: 'วันที่ ดำเนินการในSAP',
  Industry: 'Industry Sector',
  MaterialType: 'Material Type',
  MatNum: 'Material Number(ได้จากระบบ SAP)',
  Plant: 'Plant',
  BatcManage: 'Batch Management',
  UseDate: 'วันที่ต้องการใช้',
};
const { TextArea } = Input;

const Step = Steps.Step;
const Option = Select.Option;
const steps = [
  {
    title: 'ผู้จัดทำ',
    status: 'finish',
    icon: <Icon style={{ color: 'green' }} type="user" />,
  },
  {
    title: 'ผู้รับรอง',
    status: 'process',
    icon: <Icon type="user" />,
  },
  {
    title: 'ผู้อนุมัติ',
    status: 'wait',
    icon: <Icon type="user" />,
  },
  {
    title: 'บัญชี',
    status: 'wait',
    icon: <Icon type="user" />,
  },
];
function callback(key) {
  console.log(key);
}

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
export default class Index extends PureComponent {
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
        <PageHeaderWrapper title="Material Master Maintenance">
          <Card bordered={false}>
            <Card bordered={false}>
              <Steps current={current}>
                {steps.map(item => (
                  <Step key={item.title} title={item.title} status={item.status} icon={item.icon} />
                ))}
              </Steps>
            </Card>
            <Card
              title="ใบขอสร้าง/แก้ไขข้อมูลหลักวัสดุ(Material Master Maintenance Form)"
              style={{ width: '100%' }}
              extra={<Button type="primary">ตกลง</Button>}
            >
              <Form>
                {/* Row1 */}
                <Row gutter={16}>
                  <Col lg={14} md={12} sm={24}>
                    <Form.Item label={fieldLabels.Goal}>
                      {getFieldDecorator('Goal', {
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
                {/* Row 2 */}
                <Row gutter={16}>
                  <Col lg={6} md={12} sm={24}>
                    <Form.Item label={fieldLabels.GetDate}>
                      {getFieldDecorator('GetDate', {
                        rules: [{ required: true, message: '' }],
                      })(<DatePicker />)}
                    </Form.Item>
                  </Col>

                  <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                    <Form.Item label={fieldLabels.SapDate}>
                      {getFieldDecorator('SapDate', {
                        rules: [{ required: true, message: '' }],
                      })(<DatePicker />)}
                    </Form.Item>
                  </Col>
                  <Col xl={{ span: 8, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
                </Row>
                {/* Row 3 */}
                <Row gutter={16}>
                  <Col lg={14} md={12} sm={24}>
                    <Form.Item label={fieldLabels.Industry}>
                      {getFieldDecorator('Industry', {
                        rules: [
                          {
                            required: true,
                            message: 'Please enter description',
                          },
                        ],
                      })(<TextArea style={{ minHeight: 32 }} placeholder="" rows={4} />)}
                    </Form.Item>
                  </Col>

                  <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
                  <Col xl={{ span: 8, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
                </Row>
                {/* Row 4 */}
                <Row gutter={16}>
                  <Col lg={6} md={12} sm={24}>
                    <Form.Item label={fieldLabels.MaterialType}>
                      {getFieldDecorator('MaterialType', {
                        rules: [{ required: true, message: '' }],
                      })(<Input placeholder="" />)}
                    </Form.Item>
                  </Col>

                  <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                    <Form.Item label={fieldLabels.MatNum}>
                      {getFieldDecorator('MatNum', {
                        rules: [{ required: true, message: '' }],
                      })(<Input placeholder="" />)}
                    </Form.Item>
                  </Col>
                  <Col xl={{ span: 8, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
                </Row>
                {/* Row 5 */}
                <Row gutter={16}>
                  <Col lg={6} md={12} sm={24}>
                    <Form.Item label={fieldLabels.Plant}>
                      {getFieldDecorator('Plant', {
                        rules: [{ required: true, message: '' }],
                      })(
                        <Select placeholder="กรุณาเลือก Plant">
                          <Option value="Plant1">Plant1</Option>
                          <Option value="Plant2">Plant2</Option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>

                  <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                    <Form.Item label={fieldLabels.BatcManage}>
                      {getFieldDecorator('BatcManage', {
                        rules: [{ required: true, message: '' }],
                      })(
                        <Select placeholder="กรุณาเลือก option">
                          <Option value="Option1">Option1</Option>
                          <Option value="Option2">Option2</Option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Col xl={{ span: 8, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
                </Row>
                {/* Row 6 */}
                <Row gutter={16}>
                  <Col lg={6} md={12} sm={24}>
                    <Form.Item label={fieldLabels.UseDate}>
                      {getFieldDecorator('UseDate', {
                        rules: [{ required: true, message: '' }],
                      })(<DatePicker />)}
                    </Form.Item>
                  </Col>

                  <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
                  <Col xl={{ span: 8, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
                </Row>
              </Form>

              {/* Panel 1 */}
              <Collapse onChange={callback}>
                <Panel header="General Data (Basic Data 1)" key="1">
                  <GeneralData />
                </Panel>
              </Collapse>

              {/* Panel 2 */}
              <Collapse className={styles.panelSpace} onChange={callback}>
                <Panel header="Dimensions/EANs (Basic Data 1) - R&D" key="1">
                  <Dimension />
                </Panel>
              </Collapse>

              {/* Panel 3 */}
              <Collapse className={styles.panelSpace} onChange={callback}>
                <Panel header="Unit of measure (Additional Data)" key="1">
                  <Unit />
                </Panel>
              </Collapse>
              {/* Panel 4 */}

              <Collapse className={styles.panelSpace} onChange={callback}>
                <Panel header="Text(Additional Data)" key="1">
                  <Text />
                </Panel>
              </Collapse>

              {/* Panel 5 */}
              <Collapse className={styles.panelSpace} onChange={callback}>
                <Panel header="Sale Data (กรอกเฉพาะ Material ที่มีการขาย)" key="1">
                  <SaleData />
                </Panel>
              </Collapse>
              {/* Panel 6 */}
              <Collapse className={styles.panelSpace} onChange={callback}>
                <Panel header="Purchasing Data" key="1">
                  <PData />
                </Panel>
              </Collapse>
              {/* Panel 7 */}
              <Collapse className={styles.panelSpace} onChange={callback}>
                <Panel header="MRP (Planning)" key="1">
                  <MRP />
                </Panel>
              </Collapse>
              {/* Panel 8 */}
              <Collapse className={styles.panelSpace} onChange={callback}>
                <Panel header="Plan&Storage Data" key="1">
                  <Planning />
                </Panel>
              </Collapse>
              {/* Panel 9 */}
              <Collapse className={styles.panelSpace} onChange={callback}>
                <Panel header="Accounting Data" key="1">
                  <AccData />
                </Panel>
              </Collapse>
              {/* Panel 10 */}
              <Collapse className={styles.panelSpace} onChange={callback}>
                <Panel header="Costing Data" key="1">
                  <Costing />
                </Panel>
              </Collapse>
              {/* Panel 11 */}
              <Collapse className={styles.panelSpace} onChange={callback}>
                <Panel
                  header="Warehouse Management Data (กรอกข้อมูลเฉพาะสินค้าที่เก็บใน WM)"
                  key="1"
                >
                  <Warehouse />
                </Panel>
              </Collapse>
            </Card>
          </Card>
        </PageHeaderWrapper>
      </div>
    );
  }
}
