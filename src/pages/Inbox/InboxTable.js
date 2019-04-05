import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
  Radio,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import EditableCell from './EditableCell';
import styles from './InboxTable.less';

const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;

class InboxTable extends PureComponent {
  render() {
    return (
      <PageHeaderWrapper title="ข้อมูลภาษีป้าย">
        <Card bordered={false} title="ข้อมูลภาษีป้าย">
          <div>
            <EditableCell />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default InboxTable;
