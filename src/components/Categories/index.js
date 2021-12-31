import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Loader } from '../Loader';
import styles from './cat.module.css';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

export const Categories = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/categories.php`);

      if (!response.data) return;
      setData(response.data);
    })();
  }, []);


  const loader = (d) => {
    if (!d) return <Loader />;
    else return null;
  }

  return (
    <>
      {loader(data)}

      {data && (
        <>
          <h1>Categories</h1>
          <div className={styles.listGroup}>
            {data.categories.map(v => (
              <Link to={`/categories/${v.strCategory}`} className={styles.listA}>
                <Card className={styles.list}>
                  <Card.Img variant="top" src={v.strCategoryThumb} />
                  <Card.Body>
                    <Card.Title><h3>{v.strCategory}</h3></Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  )
}