import { useState, useEffect } from 'react';
import styles from './index.module.scss';

interface IProps {
  time: number;
  onEnd: () => void;
}

const CountDown = (props: IProps) => {
  const { time, onEnd } = props;
  const [count, setCount] = useState(time || 60);//time没有传值进来的话就给默认值60s

  useEffect(() => {//监听一些属性的变化
    const id = setInterval(() => {
      setCount((count) => {//里面可以是一个函数
        if (count === 0) {
          clearInterval(id);
          onEnd();//回调函数
          return count;
        }
        return count - 1;
      });
    }, 1000);
    return () => {
      clearInterval(id);//组件销毁时记得也清一次定时器，防止内存泄漏
    };
  }, [time, onEnd]);

  return <div className={styles.countDown}>{count}</div>;
};

export default CountDown;
