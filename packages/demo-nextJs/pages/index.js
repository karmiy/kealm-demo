import { useCallback, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import '../assets/index.scss';
import { Button } from 'antd';

const Loading = dynamic(import('../components/loading'));

// routeChangeStart
// routeChangeComplete
// beforeHistoryChange
// routeChangeError
// hashChangeStart
// hashChangeComplete

Router.events.on('routeChangeStart', (path) => {
  console.log('routeChangeStart', 'path: ' + path);
});

Router.events.on('routeChangeComplete', (path) => {
  console.log('routeChangeComplete', 'path: ' + path);
});

Router.events.on('beforeHistoryChange', (path) => {
  console.log('beforeHistoryChange', 'path: ' + path);
});

Router.events.on('routeChangeError', (path) => {
  console.log('routeChangeError', 'path: ' + path);
});

Router.events.on('hashChangeStart', (path) => {
  console.log('hashChangeStart', 'path: ' + path);
});

Router.events.on('hashChangeComplete', (path) => {
  console.log('hashChangeComplete', 'path: ' + path);
});

function Home({ list }) {
  const [color, setColor] = useState('yellowgreen');
  const [time, setTime] = useState(Date.now());

  // const goProduct = useCallback(() => Router.push('/product?id=0182'), []);
  const goProduct = useCallback(() => Router.push({
    pathname: '/product',
    query: { id: '0182' },
  }), []);

  const toggleColor = useCallback(() => {
    setColor(color === 'yellowgreen' ? 'skyblue': 'yellowgreen');
  }, [color]);

  const formatTime = useCallback(async () => {
    const moment = await import('moment');
    setTime(moment.default(Date.now()).format());
  }, []);

  return (
    <div className="container">
      <Head>
        <title>This is Title</title>
        <meta charSet='utf-8' />
      </Head>
      <p className={'title'}>This is Home Page</p>
      <h3>Link:</h3>
      {/* Link 下只能有一个子标签，不能多个 */}
      {/* <Link href='/product?id=0923'><a>Link to Product Page</a></Link> */}
      <Link href={{ pathname: '/product', query: { id: '0923' } }}><a>Link to Product Page</a></Link>
      <div>
        <button onClick={goProduct}>Jump to Product Page</button>
      </div>
      <Link href='#product'><a>Hash to Product Page</a></Link>
      <p>List: {list}</p>
      <div>
        <button onClick={toggleColor}>Toggle Title Color</button>
      </div>
      <p>Time: {time}</p>
      <div>
        <button onClick={formatTime}>Format Time</button>
      </div>
      <div>
        <Button>Antd 按钮</Button>
      </div>
      <Loading />
      <style jsx>
        {`
          .title {
            color: ${color}
          }
        `}
      </style>
      <style jsx global>
        {`
          p {
            line-height: 20px
          }
        `}
      </style>
    </div>
  )
}

Home.getInitialProps = async () => {
  return await new Promise(resolve => {
    axios.get('https://www.studyinghome.com/mock/5e536a1c2cb0d073b8139ef0/next-app/getTodoList').then(res => {
      // console.log(res.data.data); // 这个在 F12 看不到输出，只能在终端看
      // res.data.data 得到 { list: [ '4:00 run', '5:00 study' ] } 对象
      resolve(res.data.data);
    });
  });
}

export default Home;
