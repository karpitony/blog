import MarkdownRender from "@/components/MarkdownRender/MarkdownRender"
import MarkdownExample from '../../'

export default function Home() {
  return (
    <div>
      <MarkdownRender markdownText="# Hello, world!" />
      <h1>Home</h1>
    </div>
  );
}