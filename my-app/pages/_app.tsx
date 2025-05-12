import '../styles/globals.css';
import { StoreProvider } from 'store/index';
import ErrorBoundary from 'components/ErrorBoundary';//错误边界，客户端的报错展示
import Layout from 'components/layout';
import { NextPage } from 'next';

interface IProps {
  initialValue: Record<any, any>;
  Component: NextPage;
  pageProps: any;
}

//整个项目的性能指标都在这里
export function reportWebVitals(mertic: any) {
  if (mertic.label === 'web-vital') {
    // console.log('mertic', mertic);
  }

  switch (mertic.name) {
    case 'FCP':
      console.log('FCP', mertic);
      break;
    case 'LCP':
      console.log('LCP', mertic);
      break;
    case 'CLS':
      console.log('CLS', mertic);
      break;
    case 'FID':
      console.log('FID', mertic);
      break;
    case 'TTFB':
      console.log('TTFB', mertic);
      break;
    default:
      break;
  }

  const body = JSON.stringify(mertic);
  const url = 'https://xxxx.com';//上报性能到我们公司的监控系统里

  if (navigator.sendBeacon) {//Navigator.sendBeacon()
    // navigator.sendBeacon()方法可用于通过 HTTP POST 将少量数据异步传输到 Web 服务器它主要用于将统计数据发送到 Web 服务器，同时避免了用传统技术(如:xLHttpRequest )发送分析数会据的一些问题。
    // 描述这个方法主要用于满足统计和诊断代码的需要，这些代码通常尝试在卸载(unload)文档之前向web服务器发送数据。过早的发送数据可能导致错过收集数据的机会。然而，对于开发者来说保证在文档卸载期间发送数据一直是一个困难。因为用户代理通常会忽略在 unload(en-us)事件处理器中产生的异步XMLHttpRequest .
    //这就是 sendBeacon()方法存在的意义。使用 sendBeacon()方法会使用户代理在有机会时异步地向服务器发送数据，同时不会延迟页面的卸载或影响下一导航的载入性能
    navigator.sendBeacon(url, body);
  } else {
    fetch(url, { body, method: 'POST', keepalive: true })
  }

}
function MyApp({ initialValue, Component, pageProps }: IProps) {
  const renderLayout = () => {
    //从这里拿到layout，(NewEditor as any).layout = null;，不要navbar
    // 这里的Component是动态的，可能是一个页面，也可能是一个组件

    if ((Component as any).layout === null) {
      return <Component {...pageProps} />;//没有了页头页尾
    } else {
      return (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      );
    }
  };

  return (
    // 作为兜底错误处理
    <ErrorBoundary>
      <StoreProvider initialValue={initialValue}>
        {renderLayout()}
      </StoreProvider>
    </ErrorBoundary>
  );
}

MyApp.getInitialProps = async ({ ctx }: { ctx: any }) => {
  const { userId, nickname, avatar } = ctx?.req?.cookies || {};

  return {
    initialValue: {
      user: {
        userInfo: {
          userId,
          nickname,
          avatar,
        },
      },
    },
  };
};

export default MyApp;
