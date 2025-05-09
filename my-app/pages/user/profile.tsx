import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Input, Button, message } from 'antd';
import request from 'service/fetch';
import styles from './index.module.scss';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 4 },
};

const UserProfile = () => {
  const [form] = Form.useForm();//创建一个表单实例，使用useForm钩子来创建一个表单实例。这个实例可以用来管理表单的状态和行为

  useEffect(() => {
    request.get('/api/user/detail').then((res: any) => {
      if (res?.code === 0) {
        console.log(333333);
        console.log(res?.data?.userInfo);
        form.setFieldsValue(res?.data?.userInfo);//会赋值给下面的nickname、job、introduce
      }
    });
  }, [form]);

  const handleSubmit = (values: any) => {
    console.log(99999);
    console.log(values);
    request.post('/api/user/update', { ...values }).then((res: any) => {
      if (res?.code === 0) {
        message.success('修改成功');
      } else {
        message.error(res?.msg || '修改失败');
      }
    });
  };

  return (
    <div className="content-layout">
      <div className={styles.userProfile}>
        <h2>个人资料</h2>
        <div>
          <Form
            {...layout}
            form={form}
            className={styles.form}
            onFinish={handleSubmit}
          >
            {/* 为什么没有更改头像呢，就是图片需要上传到服务器上，返回一个url地址用到oss需要用钱买 */}
            <Form.Item label="用户名" name="nickname">
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item label="职位" name="job">
              <Input placeholder="请输入职位" />
            </Form.Item>
            <Form.Item label="个人介绍" name="introduce">
              <Input placeholder="请输入个人介绍" />
            </Form.Item>
            <Form.Item {...tailLayout}>
              {/* submit会触发上面的onFinish方法 */}
              <Button type="primary" htmlType="submit">
                保存修改
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default observer(UserProfile);
