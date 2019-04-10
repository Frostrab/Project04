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
    Me: 'ข้าพเจ้า',
    Year: 'ประจำปี',
    Oldnum: 'เลขรับปีก่อน',
    OwnerName: 'ชื่อเจ้าของป้าย',
    ShopName: 'ชื่อสถานที่ประกอบการค้าหรือกิจการอื่นๆ',
    Number: 'บ้านเลขที่',
    Tok: 'ตรอก',
    Soi: 'ซอย',
    Road: 'ถนน',
    Muu: 'หมู่ที่',
    Kwang: 'แขวง',
    Ked: 'เขต',
    Relation: 'เกี่ยวข้องเป็น',
    With: 'ได้รับ ภ.ป.3 ที่',
    slash25: '/25',
    Date: 'วันที่',
    Month: 'เดือน',
    Y: 'พ.ศ.',
    ToDate: 'แต่วันที่',
    Signing: 'ลงชื่อ',
    Tee: 'ที่',
    Allcost: 'รวมทั้งสิ้นเป็นเงิน',
    BookNo: 'หนังสือแจ้งการประเมิณที่',
    Slash: '/',
    To: 'เรียน',
    PPNo: 'ภ.ป. เลขรับที่',
    CalTax: 'บัดนี้ พนักงานเจ้าหน้าที่ได้ทำการประเมิณเสร็จแล้ว เป็นเงินภาษีป้าย',
    Stang:'สตางค์',
    Add:'และเงินเพิ่ม',
    country:'จังหวัด',
    Signature:'ขอแสดงความนับถือ (อย่างสูง)',



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
    submitting: loading.effects['form/submitTaxBB3'],
}))
@Form.create()
class TaxBB3 extends PureComponent {
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
                    type: 'form/submitTaxBB3',
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
                                <Form.Item label={fieldLabels.BookNo}>
                                    {getFieldDecorator('BookNo', {
                                        rules: [{ required: true, message: 'กรุณากรอกเลขการประเมิณ' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                                <Form.Item label={fieldLabels.Slash}>
                                    {getFieldDecorator('Slash', {
                                        rules: [{ required: true, message: '' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        {/* Row 2 */}
                        <Row gutter={16}>
                            <Col lg={6} md={12} sm={24}>
                                <Form.Item label={fieldLabels.To}>
                                    {getFieldDecorator('To', {
                                        rules: [{ required: true, message: '' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                                <Form.Item label={fieldLabels.PPNo}>
                                    {getFieldDecorator('PPNo', {
                                        rules: [{ required: true, message: '' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} >
                                <Form.Item label={fieldLabels.slash25}>
                                    {getFieldDecorator('slash25', {
                                        rules: [{ required: true, message: '' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        {/* Row 3 */}
                        <Row gutter={16}>
                            <Col lg={6} md={12} sm={24}>
                                <Form.Item label={fieldLabels.Date}>
                                    {getFieldDecorator('Date', {
                                        rules: [{ required: true, message: '' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                                <Form.Item label={fieldLabels.Month}>
                                    {getFieldDecorator('Month', {
                                        rules: [{ required: true, message: '' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} >
                                <Form.Item label={fieldLabels.Y}>
                                    {getFieldDecorator('Y', {
                                        rules: [{ required: true, message: '' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        {/* Row 4 */}
                        <Row gutter={16}>
                            <Col lg={6} md={12} sm={24}>
                                <Form.Item label={fieldLabels.CalTax}>
                                    {getFieldDecorator('CalTax', {
                                        rules: [{ required: true, message: '' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </Col>

                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 18 }} sm={24}>
                            <Form.Item label={fieldLabels.Add}>
                                    {getFieldDecorator('Add', {
                                        rules: [{ required: true, message: '' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 18 }} sm={24}>
                            <Form.Item label={fieldLabels.Allcost}>
                                    {getFieldDecorator('Allcost', {
                                        rules: [{ required: true, message: '' }],
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
                                <Form.Item label={fieldLabels.Signature}>
                                    {getFieldDecorator('Signature', {
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
                                <Form.Item label={fieldLabels.Me}>
                                    {getFieldDecorator('Me', {
                                        rules: [{ required: true, message: '' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} >
                            <Form.Item label={fieldLabels.Number}>
                                    {getFieldDecorator('Number', {
                                        rules: [{ required: true, message: '' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24} >
                            <Form.Item label={fieldLabels.Tok}>
                                    {getFieldDecorator('Tok', {
                                        rules: [{ required: true, message: '' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        {/* Row 8 */}
                        <Row gutter={16}>
                            <Col lg={6} md={12} sm={24}>
                            <Form.Item label={fieldLabels.Road}>
                                    {getFieldDecorator('Road', {
                                        rules: [{ required: true, message: '' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                            <Form.Item label={fieldLabels.Muu}>
                                    {getFieldDecorator('Muu', {
                                        rules: [{ required: true, message: '' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                            <Form.Item label={fieldLabels.Ked}>
                                    {getFieldDecorator('Ked', {
                                        rules: [{ required: true, message: '' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        {/* Row 9 */}
                        <Row gutter={16}>
                            <Col lg={6} md={12} sm={24}>
                            <Form.Item label={fieldLabels.Kwang}>
                                    {getFieldDecorator('Kwang', {
                                        rules: [{ required: true, message: '' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                                <Form.Item label={fieldLabels.country}>
                                    {getFieldDecorator('country', {
                                        rules: [{ required: true, message: '' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                                <Form.Item label={fieldLabels.Relation}>
                                    {getFieldDecorator('Relation', {
                                        rules: [{ required: true, message: '' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        {/* Row 10 */}
                        <Row gutter={16}>
                            <Col lg={6} md={12} sm={24}>
                                <Form.Item label={fieldLabels.With}>
                                    {getFieldDecorator('With', {
                                        rules: [{ required: true, message: '' }],
                                    })(<Input placeholder=""  />)}
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                                <Form.Item label={fieldLabels.slash25}>
                                    {getFieldDecorator('slash25', {
                                        rules: [{ required: true, message: '' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>

                            </Col>
                        </Row>
                          {/* Row 11 */}
                          <Row gutter={16}>
                            <Col lg={6} md={12} sm={24}>
                            <Form.Item label={fieldLabels.Date}>
                                    {getFieldDecorator('Date', {
                                        rules: [{ required: true, message: '' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                            <Form.Item label={fieldLabels.Month}>
                                    {getFieldDecorator('Month', {
                                        rules: [{ required: true, message: '' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                            <Form.Item label={fieldLabels.Y}>
                                    {getFieldDecorator('Y', {
                                        rules: [{ required: true, message: '' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                             {/* Row 12 */}
                             <Row gutter={16}>
                            <Col lg={6} md={12} sm={24}>
                            <Form.Item label={fieldLabels.ToDate}>
                                    {getFieldDecorator('ToDate', {
                                        rules: [{ required: true, message: '' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                            <Form.Item label={fieldLabels.Y}>
                                    {getFieldDecorator('Y', {
                                        rules: [{ required: true, message: '' }],
                                    })(<Input placeholder="" />)}
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                          
                            </Col>
                            
                        </Row>
                    </Form>
                 
                </Card>
            </div>
        );
    }
}

export default TaxBB3;
