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
    Year: 'ประจำปี',
    Oldnum: 'เลขรับปีก่อน',
    OwnerName: 'ชื่อเจ้าของป้าย',
    ShopName: 'ชื่อสถานที่ประกอบการค้าหรือกิจการอื่นๆ',
    Number: 'เลขที่',
    Soi: 'ซอย',
    Road: 'ถนน',
    Muu: 'หมู่ที่',
    Kwang: 'แขวง',
    Ked: 'เขต',
    Tel: 'โทรศัพท์',
    Where: 'ขอยื่นแบบแสดงรายการภาษีป้ายต่อพนักงานเจ้าหน้าที่ ณ สำนักงานเขต',
    Cat: 'ประเภทป้าย',
    W: 'กว้าง',
    H: 'ยาว',
    Cal: 'เนื้อที่ป้าย ตาราง ซ.ม.',
    Total: 'จำนวนป้าย',
    Message: 'ข้อความหรือภาพหรือเครื่องหมายที่ปรากฏในป้ายโดยย่อ',
    Start: 'สถานที่ติดตั้งและวันที่ติดตั้ง สถานที่ใกล้เคียงหรือ ระหว่าง ก.ม. ที่',
    ETC: 'หมายเหตุ',



};
const formItemLayout1 = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
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
    submitting: loading.effects['form/submitTaxBB1'],
}))
@Form.create()
class TaxBB1 extends PureComponent {
    state = {
        width: '100%',
        area:0,
        Wid:0,
        High:0,
    };
    
    handleWidChange(event) {
        this.setState({Wid: event.target.value});
      }
    
      handleHighChange(event) {
        this.setState({High: event.target.value});
      }
      onChangeCal = e => this.setState({ [e.target.name]: e.target.value })

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
                    type: 'form/submitTaxBB1',
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
                <Card className={styles.card} bordered={false}>
                    <Form layout="vertical" hideRequiredMark>
                        {/* Row 1 */}
                        <Row gutter={16}>
                            <Col lg={6} md={12} sm={24}>
                                <Form.Item label={fieldLabels.Year}>
                                    <DatePicker onChange={onChange} />
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                                <Form.Item label={fieldLabels.Oldnum}>
                                    {getFieldDecorator('Oldnum', {
                                        rules: [{ required: true, message: 'กรุณากรอกหมายเลข' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        {/* Row 2 */}
                        <Row gutter={16}>
                            <Col lg={6} md={12} sm={24}>
                                <Form.Item label={fieldLabels.OwnerName}>
                                    {getFieldDecorator('OwnerName', {
                                        rules: [{ required: true, message: 'กรุณากรอกชื่อเจ้าของป้าย' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                                <Form.Item label={fieldLabels.ShopName}>
                                    {getFieldDecorator('ShopName', {
                                        rules: [{ required: true, message: 'กรุณากรอกชื่อร้าน' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        {/* Row 3 */}
                        <Row gutter={16}>
                            <Col lg={6} md={12} sm={24}>
                                <Form.Item label={fieldLabels.Number}>
                                    {getFieldDecorator('Number', {
                                        rules: [{ required: true, message: 'กรุณากรอกชื่อร้าน' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                                <Form.Item label={fieldLabels.Soi}>
                                    {getFieldDecorator('Soi', {
                                        rules: [{ required: true, message: 'กรุณากรอกชื่อร้าน' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} >
                                <Form.Item label={fieldLabels.Road}>
                                    {getFieldDecorator('Road', {
                                        rules: [{ required: true, message: 'กรุณากรอกชื่อร้าน' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        {/* Row 4 */}
                        <Row gutter={16}>
                            <Col lg={6} md={12} sm={24}>
                            <Form.Item label={fieldLabels.Muu}>
                                    {getFieldDecorator('Muu', {
                                        rules: [{ required: true, message: 'กรุณากรอกชื่อร้าน' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </Col>
                            
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 18 }} sm={24}>
                            <Form.Item label={fieldLabels.Kwang}>
                                    {getFieldDecorator('Kwang', {
                                        rules: [{ required: true, message: 'กรุณากรอกชื่อร้าน' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 18 }} sm={24}>
                            <Form.Item label={fieldLabels.Ked}>
                                {getFieldDecorator('Ked', {
                                    rules: [{ required: true, message: 'กรุณากรอกชื่อร้าน' }],
                                })(<Input placeholder="" />)}
                            </Form.Item>
                            </Col>
                        </Row>
                        {/* Row 5 */}
                        <Row gutter={16}>
                            <Col lg={6} md={12} sm={24}>
                              
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
                           
                            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} />
                        </Row>
                        {/* Row 6 */}
                        <Row gutter={16}>
                            <Col lg={6} md={12} sm={24}>
                                <Form.Item label={fieldLabels.Tel}>
                                    {getFieldDecorator('Tel', {
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
                                <Form.Item label={fieldLabels.Where}>
                                    {getFieldDecorator('Where', {
                                        rules: [{ required: true, message: '' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} >
                          
                                </Col>
                            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} />
                        </Row>
                        {/* Row 8 */}
                        <Row gutter={16}>
                            <Col lg={10} md={12} sm={24}>
                            <Form.Item label={fieldLabels.Cat}>
                                    {getFieldDecorator('Cat', {
                                        rules: [{ required: true, message: '' }],
                                    })(
                                        <Select
                                            style={{ width: 280 }}
                                            placeholder="เลือกประเภทของป้าย">
                                            <Option value="1">มีอักษรไทยล้วน มีอักษรไทย</Option>
                                            <Option value="2">ปนกับอักษรต่างประเทศ หรือ เครื่องหมาย</Option>
                                            <Option value="3">ป้ายที่ไม่มีอักษร</Option>

                                        </Select>
                                    )}
                                    
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>

                            </Col>
                            <Col xl={{ span: 8, offset: 0 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>

                            </Col>
                            <Col xl={{ span: 8, offset: 0 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>

                            </Col>
                        </Row>
                        {/* Row 9 */}
                        <Row gutter={16}>
                            <Col lg={6} md={12} sm={24}>
                                <h3>ขนาดของป้าย</h3>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                                <Form.Item label={fieldLabels.W}>
                                    {getFieldDecorator('W', {
                                        rules: [{ required: true, message: '' }],
                                    })(<Input type="number" name="Wid" value="Wid" onChange={this.onChangeCal} />)}
                                     {/* })(<Input placeholder="" />)} */}
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                                <Form.Item label={fieldLabels.H}>
                                    {getFieldDecorator('H', {
                                        rules: [{ required: true, message: '' }],
                                    })(<Input type="number" name="High" value="High" onChange={this.onChangeCal} />)}
                                     {/* })(<Input placeholder="" />)} */}
                                </Form.Item>
                            </Col>
                        </Row>
                        {/* Row 10 */}
                        <Row gutter={16}>
                            <Col lg={6} md={12} sm={24}>
                                <Form.Item label={fieldLabels.Cal}>
                                <Input type={0} value={this.state.area} readOnly />
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                                <Form.Item label={fieldLabels.Total}>
                                    {getFieldDecorator('Total', {
                                        rules: [{ required: true, message: '' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>

                            </Col>
                        </Row>
                    </Form>
                    <Form>
                        {/* Row 11 */}
                        <Row gutter={16}>
                            <Col lg={12} md={12} sm={24}>
                                <Form.Item label={fieldLabels.Message}>
                                    {getFieldDecorator('Message', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please enter description',
                                            },
                                        ],
                                    })(
                                        <TextArea
                                            style={{ minHeight: 32, width: 300 }}
                                            placeholder=""
                                            rows={4}
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>

                            </Col>
                            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>

                            </Col>
                        </Row>
                        {/* Row 12 */}
                        <Row gutter={16}>
                            <Col lg={12} md={12} sm={24}>
                                <Form.Item label={fieldLabels.Start}>
                                    {getFieldDecorator('Start', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '',
                                            },
                                        ],
                                    })(
                                        <TextArea
                                            style={{ minHeight: 32, width: 300 }}
                                            placeholder=""
                                            rows={4}
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                            {/* <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                            
                            </Col>
                            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                               
                            </Col> */}
                        </Row>
                        {/* Row 13 */}
                        <Row gutter={16}>
                            <Col lg={12} md={12} sm={24}>
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
                                            style={{ minHeight: 32, width: 300 }}
                                            placeholder=""
                                            rows={4}
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                            {/* <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                            
                            </Col>
                            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                               
                            </Col> */}
                        </Row>
                          {/* Row 13 */}
                          <Row gutter={16}>
                            <Col lg={12} md={12} sm={24}>
                               <Button type="primary">Print</Button>
                            </Col>
                            {/* <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                            
                            </Col>
                            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                               
                            </Col> */}
                        </Row>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default TaxBB1;
