import { Alert } from 'antd';

export default function Error() {
  return <Alert message="Ошибка" description="Упс...Что-то пошло не так" type="error" showIcon />;
}
