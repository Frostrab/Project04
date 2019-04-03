import React, { PureComponent } from 'react';
// import { Card,Form,FormGroup,Label,Input, CardBody, CardHeader, Col, Row } from 'reactstrap';
import {
  Steps,
  Button,
  message,
  Icon,
  Tabs,
  Checkbox,
  Upload,
  Card,
  Form,
  Row,
  Col,
  Input,
} from 'antd';
import TableItem from './EditableTable';
import imgQR from '../../assets/img/brand/sample.png';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import styles from './style.less';
const Step = Steps.Step;
const fieldLabels = {
  Unit: 'จากหน่วยงาน',
};
const stepsBuyer = [
  {
    title: 'ผู้เบิก',
    status: 'finish',
    icon: <Icon style={{ color: 'green' }} type="user" />,
  },
  {
    title: 'ผู้อนุมัติ',
    status: 'process',
    icon: <Icon type="user" />,
  },
  {
    title: 'ผู้รับสินค้า',
    status: 'wait',
    icon: <Icon type="user" />,
  },
];

export default class Index extends PureComponent {
  state = {
    current: 1,
  };
  render() {
    const { current } = this.state;
    return (
      <div className="animated fadeIn">
        {/* <PageHeaderWrapper title="Purchase Order"> */}
        <PageHeaderWrapper>
          {/* <hr></hr>
        <div style={{ marginBottom: 10 }}> */}
          <Card>
            <Steps current={current}>
              {stepsBuyer.map(item => (
                <Step key={item.title} title={item.title} status={item.status} icon={item.icon} />
              ))}
            </Steps>
          </Card>
          {/* </div> */}
          <Card
            title="ใบเบิกสินค้ำย่อย"
            style={{ width: '100%' }}
            extra={<Button type="primary">ตกลง</Button>}
          >
            <Form>
              {/* Row1 */}
              <Row gutter={16}>
                <Col lg={8} md={12} sm={24}>
                  <Form.Item label={fieldLabels.Unit}>
                    <Input placeholder="" />
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
                <Col xl={{ span: 8, offset: 8 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <img src={imgQR} width={100} height={100} />
                </Col>
              </Row>

              <TableItem />
            </Form>
          </Card>
        </PageHeaderWrapper>
      </div>
    );
  }
}
