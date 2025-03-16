import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function Spinner() {
  return <Spin indicator={<LoadingOutlined spin />} size="large" />;
}
