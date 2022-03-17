export default function truncateText(text: string, textLength: number): string {
  const truncated = text.slice(0, textLength);
  const shouldHaveEllipsis = text.length > textLength;
  const ellipsis = shouldHaveEllipsis ? '...' : '';

  return truncated + ellipsis;
}
