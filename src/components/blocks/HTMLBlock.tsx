export default function HTMLBlock({ block }: any) {
  return <div className="richtext" dangerouslySetInnerHTML={{ __html: block.html }} />;
}
