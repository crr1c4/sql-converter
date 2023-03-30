import { Head } from "$fresh/runtime.ts";
import Converter from "../islands/Converter.tsx";
import { Footer } from "../components/Footer.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>SQL Converter from Excel</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <Converter />
      </div>
      <Footer />
    </>
  );
}
