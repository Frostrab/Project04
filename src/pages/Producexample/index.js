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
} from 'antd';
//------------------
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';
import Report from './Report';
import Request from './Request';
const Step = Steps.Step;
const TabPane = Tabs.TabPane;

function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}
function callback(key) {
  console.log(key);
}
const steps = [
  {
    title: ' ผู้จัดการฝ่าย QA ',
    status: 'finish',
    icon: <Icon style={{ color: 'green' }} type="user" />,
  },
  {
    title: 'ผู้จัดการฝ่าย QC',
    status: 'process',
    icon: <Icon type="user" />,
  },
  {
    title: 'ผู้จัดการฝ่ายคลังสินค้า & จัดส่ง',
    status: 'wait',
    icon: <Icon type="user" />,
  },
  {
    title: 'ผู้จัดการฝ่ายผลิต',
    status: 'wait',
    icon: <Icon type="user" />,
  },
  {
    title: 'ผู้จัดการฝ่าย R&D',
    status: 'wait',
    icon: <Icon type="user" />,
  },
];
const Req = [
  {
    title: 'ผู้ส่งตัวอย่างพร้อมเอกสารแนบ ',
    status: 'finish',
    icon: <Icon style={{ color: 'green' }} type="user" />,
  },
  {
    title: 'ผู้ตรวจสอบเอกสาร',
    status: 'process',
    icon: <Icon type="user" />,
  },
];
const ReqAudit = [
  {
    title: 'ชื่อผู้ทดสอบ ',
    status: 'finish',
    icon: <Icon style={{ color: 'green' }} type="user" />,
  },
  {
    title: 'ผู้ตรวจสอบเอกสาร',
    status: 'process',
    icon: <Icon type="user" />,
  },
  {
    title: 'ชื่อพิจารณา(เจ้าหน้าที่ฝ่าย QA)  ',
    status: 'wait',
    icon: <Icon type="user" />,
  },
  {
    title: 'ผู้อนุมัติ(ผู้จัดการฝ่าย QA)',
    status: 'wait',
    icon: <Icon type="user" />,
  },
];

export default class Index extends PureComponent {
  state = {
    current: 1,
  };
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    return (
      <div>
        <PageHeaderWrapper title="ใบขอให้มี และ แจ้งผลการทดสอบสินค้าตัวอย่าง">
          <Card bordered={false}>
            <Card bordered={false}>
              <Steps current={current}>
                {steps.map(item => (
                  <Step key={item.title} title={item.title} status={item.status} icon={item.icon} />
                ))}
              </Steps>
            </Card>
            <Tabs onChange={callback} type="card">
              <TabPane tab="ใบขอให้มี" key="1">
                <div style={{ padding: 10 }}>
                  <Steps current={current}>
                    {Req.map(item => (
                      <Step
                        key={item.title}
                        title={item.title}
                        status={item.status}
                        icon={item.icon}
                      />
                    ))}
                  </Steps>
                  <Request />
                </div>
              </TabPane>
              <TabPane tab="แจ้งผลการทดสอบสินค้าตัวอย่าง" key="2">
                <div style={{ padding: 10 }}>
                  <Steps current={current}>
                    {ReqAudit.map(item => (
                      <Step
                        key={item.title}
                        title={item.title}
                        status={item.status}
                        icon={item.icon}
                      />
                    ))}
                  </Steps>
                  <Report />
                </div>
              </TabPane>
            </Tabs>
          </Card>
        </PageHeaderWrapper>
      </div>
    );
  }
}
