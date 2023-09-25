export function scrollToBottom(contentRef: React.RefObject<HTMLDivElement>) {
  contentRef?.current?.scrollTo({
    top: contentRef?.current?.scrollHeight,
    behavior: "smooth",
  });
}