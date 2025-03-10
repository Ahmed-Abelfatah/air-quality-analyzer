export default interface DataParser<T> {
  process(data: string): Promise<T>;
}
