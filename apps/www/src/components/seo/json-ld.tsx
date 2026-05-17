type Props = {
  id: string;
  data: Record<string, unknown>;
};

const JsonLd = ({ id, data }: Props) => {
  return (
    <script id={id} type='application/ld+json'>
      {JSON.stringify(data)}
    </script>
  );
};

export default JsonLd;
