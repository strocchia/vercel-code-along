import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import { harperFetch } from "../utils/harperdb";

const List = ({ items, ...props }) => {
  // console.log(props);
  const [filteredItems, setFilteredItems] = useState(items);

  const filterItems = (e) => {
    const searchVal = e.target.value;
    const currentItems = [...items];
    const matchingFilter = currentItems.filter((item) =>
      item.startsWith(searchVal)
    );

    console.log(matchingFilter);

    setFilteredItems(matchingFilter);
  };

  return (
    <>
      <input onChange={filterItems} />
      <ul {...props}>
        {filteredItems.map((fi) => (
          <li key={fi}>{fi}</li>
        ))}
      </ul>
    </>
  );
};

export default function Home({ dogs }) {
  // add dog upon button click?
  const addDog = async () => {
    try {
      const data = await harperFetch({
        operation: "insert",
        schema: "dev",
        table: "dog",
        records: [
          {
            // id: 1,
            dog_name: "Fido",
            owner_name: "ST",
            breed_id: 154,
            age: 5,
            weight_lbs: 35,
            adorable: true,
          },
        ],
      });

      console.log(data);
    } catch (error) {
      alert(error.message);
    }
  };

  // console.log(dogs);

  // dogs.map((d, i) => {
  //   console.log(i, d);
  // });

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>HarperDB</h1>

        {/* <List
          aria-label='My f list'
          items={["Learn React", "Learn Next.js", "???", "Profit!"]}
        /> */}

        <div className={styles.grid}>
          {dogs.map((dog, i) => (
            <React.Fragment key={dog.id}>
              <Link key={dog.id} href={`/dog/${dog.id}`}>
                <a className={styles.card}>{dog.dog_name}</a>
              </Link>
            </React.Fragment>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{" "}
          <img src='/vercel.svg' alt='Vercel Logo' className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const dogs = await harperFetch({
    operation: "sql",
    sql: "SELECT * FROM dev.dog",
  });

  return {
    props: {
      dogs,
    },
    revalidate: 30, // seconds between page re-gens
  };
}
