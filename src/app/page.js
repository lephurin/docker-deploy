export default function Home() {
  return (
    <div>
      <H2>To Test Deploy GCP with docker</H2>
      <p>client version: {process.env.NEXT_PUBLIC_CLIENT_VERSION}</p>
    </div>
  );
}
