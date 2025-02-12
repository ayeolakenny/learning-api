type Id = string;

export function connectId(id: string) {
  return { connect: { id } };
}
