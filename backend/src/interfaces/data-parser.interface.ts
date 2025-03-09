export default interface DataParser<T> {
  // eslint-disable-next-line no-unused-vars
  parse(data: string): Promise<T>;
}
