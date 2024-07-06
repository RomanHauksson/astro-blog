interface Props {
  collection: string;
  heroImagePath: string;
  slug: string;
  altText: string;
  title: string;
  description: string;
  publishDate: string;
  published?: boolean;
  technologies?: string[];
}

export const SearchResult = ({
  collection,
  heroImagePath,
  slug,
  altText,
  title,
  description,
  publishDate,
  technologies,
}: Props) => {
  return (
    <a
      href={`/${collection}/${slug}/`}
      className="flex flex-row flex-wrap gap-4 hover:bg-slate-800 rounded-lg p-4 transition-all duration-100 border border-slate-700"
    >
      <div className="basis-[10rem] grow">
        <img
          src={heroImagePath}
          alt={altText}
          loading="eager"
          className="max-w-full rounded-lg"
        />
      </div>
      <div className="flex flex-col shrink grow basis-[15rem]">
        <p className="text-gray-400">{publishDate}</p>
        <h3 className="text-3xl font-bold">{title}</h3>
        <p className="text-xl text-gray-200">{description}</p>
        {technologies && (
          <div className="flex flex-row flex-wrap gap-2">
            {technologies.map((technology) => (
              <p className="text-gray-400">{technology}</p>
            ))}
          </div>
        )}
      </div>
    </a>
  );
};
