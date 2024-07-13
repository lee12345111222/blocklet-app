import { memo, useEffect, useState } from 'react';

import { Button, Flex, Form, Input, message, Space } from 'antd';
import api from '../../../libs/api';
import { Iprofile } from '../types';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

interface Iprops {
  setEdit: (value: boolean) => void;
  info: Iprofile;
  setInfo: (values: Iprofile) => void;
}
function EditProfile(props: Iprops) {
  const { setEdit, setInfo, info } = props;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(info);
  }, [info, form]);

  const onFinish = (values: Iprofile) => {
    setLoading(true);
    api
      .post('/api/profile', values)
      .then((response) => {
        if (response.status === 200) {
          message.success(response.data?.message);
          setEdit(false);
          setInfo(values);
          localStorage.setItem('user', JSON.stringify(values));
        }
      })
      .catch((err) => {
        message.error(err?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onReset = () => {
    form.setFieldsValue(info);
  };
  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} style={{ maxWidth: 600, margin: 'auto' }}>
      <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input placeholder="Please enter your username" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid email!',
          },
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}>
        <Input placeholder="Please enter your email" />
      </Form.Item>
      <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'Please input your phone!' }]}>
        <Input placeholder="Please enter your phone" />
      </Form.Item>
      <Form.Item name="remark" label="Remark">
        <Input placeholder="Please enter your remark" />
      </Form.Item>
      <Form.Item name="address" label="Address">
        <Input.TextArea placeholder="Please enter your address" />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Flex justify="center">
          <Space>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Space>
        </Flex>
      </Form.Item>
    </Form>
  );
}

export default memo(EditProfile);
