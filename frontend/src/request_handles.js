const get_post_previews = async () => {
  const res = await fetch("/posts/list");

  const data = await res.json();

  return data.rows;
};

export { get_post_previews };
