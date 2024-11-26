export default function dummy() {
  const [clicked, setClicked] = useState(false);
  const ref = useRef(null);
  const {
    order
  } = useMutation();
  useEffect(() => {
    console.log("something");
  });
  return <div>dummy</div>;
}