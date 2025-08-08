export default function Progress(props: { value: number }) {
  return (
    <div className="h-1 w-full bg-gray-200 rounded-full">
      <div
        className="h-1 bg-blue-500 rounded-full"
        style={{ width: `${props.value}%` }}
      />
    </div>
  );
}