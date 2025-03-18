
export const errorAuthResponse = async () => {
  return Response.json({ error: 'Unauthorized' }, { status: 401 });
}
