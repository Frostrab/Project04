import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './InboxTable.less';
import { Table, Input, Button, Popconfirm, Form, Card, Col } from 'antd';

const fieldLabels = {
  Search: 'ค้นหา',
};
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  componentDidMount() {
    if (this.props.editable) {
      document.addEventListener('click', this.handleClickOutside, true);
    }
  }

  componentWillUnmount() {
    if (this.props.editable) {
      document.removeEventListener('click', this.handleClickOutside, true);
    }
  }

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  handleClickOutside = e => {
    const { editing } = this.state;
    if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
      this.save();
    }
  };

  save = () => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  render() {
    const { editing } = this.state;
    const { editable, dataIndex, title, record, index, handleSave, ...restProps } = this.props;
    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {form => {
              this.form = form;
              return editing ? (
                <FormItem style={{ margin: 0 }}>
                  {form.getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: `${title} is required.`,
                      },
                    ],
                    initialValue: record[dataIndex],
                  })(<Input ref={node => (this.input = node)} onPressEnter={this.save} />)}
                </FormItem>
              ) : (
                <div
                  className="editable-cell-value-wrap"
                  style={{ paddingRight: 24 }}
                  onClick={this.toggleEdit}
                >
                  {restProps.children}
                </div>
              );
            }}
          </EditableContext.Consumer>
        ) : (
          restProps.children
        )}
      </td>
    );
  }
}

export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'ประเภทเอกสาร',
        dataIndex: 'ประเภทเอกสาร',
        width: '13%',
      },
      {
        title: 'เลขที่เอกสาร',
        dataIndex: 'เลขที่เอกสาร',
        width: '11%',
      },
      {
        title: 'รายละเอียด',
        dataIndex: 'รายละเอียด',
        width: '25%',
      },
      {
        title: 'จาก',
        dataIndex: 'จาก',
        width: '10%',
      },
      {
        title: 'วันที่รับเอกสาร',
        dataIndex: 'วันที่รับเอกสาร',
        width: '10%',
      },
      {
        title: '',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <div>
              <Button style={{ fontSize: 14 }}>แสดง</Button>
              <Button type="primary">อนุมัติ</Button>
              <Button type="danger">ไม่อนุมัติ</Button>
            </div>
          ) : null,
      },
    ];

    this.state = {
      dataSource: [
        {
          key: '1',
          ประเภทเอกสาร: 'เอกสาร PO',
          เลขที่เอกสาร: 'ACT-FM070',
          รายละเอียด: 'ผลิตภัณฑ์ ชาวเกาะ',
          จาก: 'นาย สมชาย กล้าหาร',
          วันที่รับเอกสาร: '25 ม.ค. 2562',
        },
        {
          key: '2',
          ประเภทเอกสาร: 'เอกสาร ใบขอให้มี & แจ้งผลการทดสอบสินค้าตัวอย่าง',
          เลขที่เอกสาร: 'PUR-FM003',
          รายละเอียด: 'ผลิตภัณฑ์ กะทิรอยไทย',
          จาก: 'นาย สมสกุล กล้าหาร',
          วันที่รับเอกสาร: '30 ม.ค. 2562',
        },
        {
          key: '3',
          ประเภทเอกสาร: 'เอกสาร NEW ITEM',
          เลขที่เอกสาร: ' APF-FM027',
          รายละเอียด: 'ผลิตภัณฑ์ สารสกัดใบหม่อน',
          จาก: 'นาง จริงใจ จริงจริง',
          วันที่รับเอกสาร: '2 ม.ค. 2562',
        },
        {
          key: '4',
          ประเภทเอกสาร: 'เอกสาร ขอเพิ่ม SUPPLIER',
          เลขที่เอกสาร: 'PUR-FM012',
          รายละเอียด: 'เจ้าของสวน มันสําปะหลัง จังหวัด ราชบุรี',
          จาก: 'นาย สุขใจ พอมี',
          วันที่รับเอกสาร: '6 ธ.ค. 2561',
        },
        {
          key: '5',
          ประเภทเอกสาร: 'เอกสาร PO',
          เลขที่เอกสาร: 'ACT-FM080',
          รายละเอียด: 'ผลิตภัณฑ์ น้ำมันมะพร้าว รอยไทย',
          จาก: 'นาย สามารถ ใจกล้า',
          วันที่รับเอกสาร: '25 ม.ค. 2562',
        },
      ],
      count: 0,
    };
  }

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: ``,
      age: ``,
      address: ``,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Card bordered={false}>
          <Form>
            <Col lg={12} md={12} sm={24}>
              <Button type="primary">อนุมัติทั้งหมด</Button>
              <Button type="danger">ไม่อนุมัติทั้งหมด</Button>
            </Col>
            <Col xl={{ span: 2, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
            <Col xl={{ span: 4, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label={fieldLabels.Search}>
                <Input placeholder="" />
              </Form.Item>
            </Col>
          </Form>
        </Card>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          rowSelection={rowSelection}
          bordered
          // title={() => {{[<Button type="primary">อนุมัติทั้งหมด</Button>,
          // <Button type="danger">ไม่อนุมัติทั้งหมด</Button>]}}}

          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}
