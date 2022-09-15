export const randomInts = (quantity: number, max: number): number[] => {
  const set = new Set<number>();
  while (set.size < quantity) {
    set.add(Math.floor(Math.random() * max));
  }
  return [...set];
};
