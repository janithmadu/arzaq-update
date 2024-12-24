export function getElapsedTime(timestamp: string) {
  const now = new Date();
  const createdTime = new Date(timestamp);
  const diffInMs = now.getTime() - createdTime.getTime();

  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes} min`;
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? "s" : ""}`;
  return `${diffInDays} day${diffInDays > 1 ? "s" : ""}`;
}