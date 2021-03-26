export const harperFetch = async (body) => {
  const request = await fetch("https://codealong1-scottt.harperdbcloud.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${process.env.HARPERDB_KEY}`,
    },
    body: JSON.stringify(body),
  });

  return request.json();
};
