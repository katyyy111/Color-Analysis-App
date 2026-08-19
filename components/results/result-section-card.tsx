
export function SectionCard({ title, children }: {
  title: string
  children: React.ReactNode
}) {
    return (
      <section className="rounded-3xl border border-border bg-card/70 p-6 shadow-sm backdrop-blur sm:p-8">
        <h2 className="mb-6 font-serif text-xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        {children}
      </section>
    )
}