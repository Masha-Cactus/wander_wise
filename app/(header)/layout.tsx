import Header from "@/app/components/Header";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return ( <section>
    <Header />
    {children}
  </section>);
}