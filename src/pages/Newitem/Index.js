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
import MarketingForm from './MarketingForm';
import Accounting from './Accounting';
import RD from './RD';
import Productplan from './Productplan';

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
    title: 'ฝ่ายการตลาด',
    status: 'finish',
    icon: <Icon style={{ color: 'green' }} type="user" />,
  },
  {
    title: 'ฝ่ายบัญชีและการเงิน',
    status: 'process',
    icon: <Icon type="user" />,
  },
  {
    title: 'ฝ่ายR&D',
    status: 'wait',
    icon: <Icon type="user" />,
  },
  {
    title: 'ฝ่ายวางแผนการผลิต',
    status: 'wait',
    icon: <Icon type="user" />,
  },
];
const stepsBuyer = [
  {
    title: 'Requested',
    status: 'finish',
    icon: <Icon type="user" />,
  },
  {
    title: 'Approver',
    status: 'wait',
    icon: <Icon type="user" />,
  },
];

export default class Index extends PureComponent {
  state = {
    current: 1,
    selectedOption1: null,
    selectedOption2: null,
    selectedOption3: null,
    selectedOption4: null,
    selectedOption5: null,
    selectedOption6: null,
    selectedOption7: null,
    selectedOption8: null,
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
    const {
      current,
      selectedOption1,
      selectedOption2,
      selectedOption3,
      selectedOption4,
      selectedOption5,
      selectedOption6,
      selectedOption7,
      selectedOption8,
    } = this.state;
    return (
      <div>
        <PageHeaderWrapper title="NEW ITEM NUMBER : MANUFACTURED ITEM">
          <Card bordered={false}>
            <Card bordered={false}>
              <Steps current={current}>
                {stepsBuyer.map(item => (
                  <Step key={item.title} title={item.title} status={item.status} icon={item.icon} />
                ))}
              </Steps>
            </Card>
            <Tabs onChange={callback} type="card">
              <TabPane tab="ฝ่ายการตลาด" key="1">
                <div style={{ padding: 10 }}>
                  <Steps current={current}>
                    {steps.map(item => (
                      <Step
                        key={item.title}
                        title={item.title}
                        status={item.status}
                        icon={item.icon}
                      />
                    ))}
                  </Steps>
                  {/* <Card title="ฝ่ายการตลาด" style={{width:'100%'}}> */}
                  {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <strong><h4>ฝ่ายการตลาด</h4></strong>
                      </div>
                      <div>
                        <Button type="primary">ตกลง</Button>
                      </div>
                    </div> */}
                  <MarketingForm />
                  {/* </Card> */}
                </div>
              </TabPane>
              <TabPane tab="ฝ่ายบัญชีและการเงิน" key="2">
                <div style={{ padding: 10 }}>
                  <Steps current={current}>
                    {steps.map(item => (
                      <Step
                        key={item.title}
                        title={item.title}
                        status={item.status}
                        icon={item.icon}
                      />
                    ))}
                  </Steps>

                  <Accounting />
                </div>
              </TabPane>
              <TabPane tab="ฝ่ายR&D" key="3">
                <div style={{ padding: 10 }}>
                  <Steps current={current}>
                    {steps.map(item => (
                      <Step
                        key={item.title}
                        title={item.title}
                        status={item.status}
                        icon={item.icon}
                      />
                    ))}
                  </Steps>
                  <RD />
                </div>
              </TabPane>
              <TabPane tab="ฝ่ายแผนการผลิต" key="4">
                <div style={{ padding: 10 }}>
                  <Steps current={current}>
                    {steps.map(item => (
                      <Step
                        key={item.title}
                        title={item.title}
                        status={item.status}
                        icon={item.icon}
                      />
                    ))}
                  </Steps>

                  <Productplan />
                </div>
              </TabPane>
            </Tabs>
          </Card>
        </PageHeaderWrapper>
      </div>
    );
  }
}
