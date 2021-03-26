// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  const data = await fetch("https://codealong1-scottt.harperdbcloud.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${process.env.HARPERDB_KEY}`,
    },
    body: JSON.stringify({
      operation: "insert",
      schema: "dev",
      table: "dog",
      records: [
        {
          id: 11,
          dog_name: "Gizmo",
          owner_name: "Michelle",
          breed_id: 154,
          age: 15,
          weight_lbs: 70,
          adorable: true,
        },
      ],
    }),
  });

  res.status(200).json({ data });
};
