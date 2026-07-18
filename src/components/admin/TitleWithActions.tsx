"use client";

import type { DefaultCellComponentProps } from "payload";

type Props = DefaultCellComponentProps & {
  frontendPath?: string;
};

export default function TitleWithActions({ cellData, rowData, collectionSlug, frontendPath = "" }: Props) {
  if (!rowData) return null;

  const editUrl = `/admin/collections/${collectionSlug}/${rowData.id}`;

  const viewUrl = rowData.slug ? `${frontendPath}/${rowData.slug}`.replace(/\/+/g, "/") : "";

  return (
    <>
      <div className="pl-title-cell">
        <a href={editUrl} className="pl-title" onClick={(e) => e.stopPropagation()}>
          {cellData}
        </a>

        {rowData.slug && (
          <div className="pl-actions" onClick={(e) => e.stopPropagation()}>
            <a href={editUrl}>Edit</a>

            <span>|</span>

            <a href={viewUrl} target="_blank" rel="noopener noreferrer">
              View
            </a>
          </div>
        )}
      </div>
    </>
  );
}
