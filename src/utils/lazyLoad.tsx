const lazyLoad = (Component: React.LazyExoticComponent<any>) => {
  return (
    <Suspense>
      <Component />
    </Suspense>
  );
};

export default lazyLoad;
