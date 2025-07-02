// pages/404.tsx
const Custom404 = () => {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      textAlign: 'center',
      fontFamily: 'sans-serif'
    }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <a href="/" style={{color: 'blue', textDecoration: 'underline'}}>
        Go back home
      </a>
    </div>
  );
};

export default Custom404;