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
import TaxBB7 from './TaxBB7';
import TaxBB3 from './TaxBB3';
import TaxBB2 from './TaxBB2';
import TaxBB1 from './TaxBB1';
const Panel = Collapse.Panel;
// const Step = Steps.Step;
const TabPane = Tabs.TabPane;

function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}
function callback(key) {
  console.log(key);
}

// const steps = [
//   {
//     title: 'ฝ่ายการตลาด',
//     status: 'finish',
//     icon: <Icon style={{ color: 'green' }} type="user" />,
//   },
//   {
//     title: 'ฝ่ายบัญชีและการเงิน',
//     status: 'process',
//     icon: <Icon type="user" />,
//   },
//   {
//     title: 'ฝ่ายR&D',
//     status: 'wait',
//     icon: <Icon type="user" />,
//   },
//   {
//     title: 'ฝ่ายวางแผนการผลิต',
//     status: 'wait',
//     icon: <Icon type="user" />,
//   },
// ];
// const stepsBuyer = [
//   {
//     title: 'Requested',
//     status: 'finish',
//     icon: <Icon type="user" />,
//   },
//   {
//     title: 'Approver',
//     status: 'wait',
//     icon: <Icon type="user" />,
//   },
// ];

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
        <PageHeaderWrapper title="แบบฟอร์มคำขอยื่นภาษีป้าย">
          <Card bordered={false}>
            <Collapse accordion>
              <Panel header="ภ.ป.1" key="1">
                <TaxBB1 />
              </Panel>
              <Panel header="ภ.ป.2" key="2">
                <TaxBB2 />
              </Panel>
              <Panel header="ภ.ป.3" key="3">
                <TaxBB3 />
              </Panel>
              <Panel header="ภ.ป.7" key="4">
                <TaxBB7 />
              </Panel>

            </Collapse>
          </Card>
        </PageHeaderWrapper>
      </div>
    );
  }
}
