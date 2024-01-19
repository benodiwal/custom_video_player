import Loader from 'react-loader-spinner';

const LoadingComponents: React.FC = () => {
  return (
    <div className="flex align-center justify-center h-full w-full">
      <Loader type="TailSpin" color="#000000" height={80} width={80} /> as any
    </div>
  )
}

export default LoadingComponents
