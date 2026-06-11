interface PageHeaderProps {
  tag: string
  title: string
  titleEm?: string
  desc?: string
}

export function PageHeader({ tag, title, titleEm, desc }: PageHeaderProps) {
  return (
    <div className="mb-10 pb-8 border-b border-white/[0.06]">
      <div className="text-[10px] font-semibold tracking-[3px] uppercase text-[#C8102E] mb-3">{tag}</div>
      <h2 className="font-serif text-4xl md:text-5xl font-semibold leading-tight text-[#F0EDE8]">
        {title}
        {titleEm && <> <em className="not-italic text-[#C9922A]">{titleEm}</em></>}
      </h2>
      {desc && <p className="mt-4 text-sm text-[#A09A93] max-w-xl leading-relaxed">{desc}</p>}
    </div>
  )
}
