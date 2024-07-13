import { Button, Descriptions } from 'antd';
import { memo } from 'react';
import { Iprofile } from '../types';
// import { Iprofile } from '../index';

const itemsMockData = [
  {
    key: 'username',
    label: 'UserName',
    children: 'Zhou Maomao',
  },
  {
    key: 'phone',
    label: 'Phone',
    children: '1810000000',
  },
  {
    key: 'email',
    label: 'Email',
    children: '123456789@qq.com',
  },
  {
    key: 'remark',
    label: 'Remark',
    children: 'empty',
  },
  {
    key: 'address',
    label: 'Address',
    children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
  },
];

interface Iprops {
  setEdit: (value: boolean) => void;
  info: Iprofile;
}

function ProfileInfo(props: Iprops) {
  const { setEdit, info } = props;
  const items = itemsMockData.map((item) => {
    return {
      ...item,
      children: info[item.key],
    };
  });

  return (
    <Descriptions
      title="User Info"
      items={items}
      extra={
        <Button type="primary" onClick={() => setEdit(true)}>
          Edit
        </Button>
      }
    />
  );
}

export default memo(ProfileInfo);
