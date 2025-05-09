import '../styles/globals.css';
import { StoreProvider } from 'store/index';
// import ErrorBoundary from 'components/ErrorBoundary';
import Layout from 'components/layout';
import { NextPage } from 'next';

interface IProps {
  initialValue: Record<any, any>;
  Component: NextPage;
  pageProps: any;
}

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
  const url = 'https://xxxx.com';

  if (navigator.sendBeacon) {
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
    // <ErrorBoundary>
    <StoreProvider initialValue={initialValue}>
      {renderLayout()}
    </StoreProvider>
    // </ErrorBoundary>
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
