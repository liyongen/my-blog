import Image from 'next/image';

export default function Custom404() {
  // 全屏的404图片
  return <Image src="/images/404.jpg" alt="404" layout="fill" />;
}
