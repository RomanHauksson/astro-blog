import React from "react";

interface Props {
  imagePath: string;
  slug: string;
  altText: string;
  title: string;
  description: string;
  publishDate: string;
  published?: boolean;
}

export const PostSearchResult = ({
  imagePath,
  slug,
  altText,
  title,
  description,
  publishDate,
}: Props) => {
  return (
    <a
      href={`/posts/${slug}/`}
      className="flex flex-row flex-wrap gap-4 hover:bg-slate-800 rounded-lg p-4 transition-all duration-100 border border-slate-700"
    >
      <div className="basis-[10rem] grow">
        <img
          src={imagePath}
          alt={altText}
          loading="eager"
          className="max-w-full rounded-lg"
        />
      </div>
      <div className="flex flex-col shrink grow basis-[15rem]">
        <p className="text-gray-400">{publishDate}</p>
        <h3 className="text-3xl font-bold">{title}</h3>
        <p className="text-xl text-gray-200">{description}</p>
      </div>
    </a>
  );
};