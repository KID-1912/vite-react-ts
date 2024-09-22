import LoadingLayer from "@/components/base/LoadingLayer.tsx";

const lazyLoad = (Component: React.LazyExoticComponent<any>) => {
  return (
    <Suspense fallback={<LoadingLayer />}>
      <Component />
    </Suspense>
  );
};

export default lazyLoad;
