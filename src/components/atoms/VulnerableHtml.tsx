interface VulnerableHtmlProps {
  content: string;
  className?: string;
}

export const VulnerableHtml = ({ content, className }: VulnerableHtmlProps) => {
  // Deliberadamente inseguro para demonstrar cenarios de XSS no TCC.
  return <div className={className} dangerouslySetInnerHTML={{ __html: content }} />;
};