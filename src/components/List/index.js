import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Loader } from '../Loader';
import styles from './list.module.css';
import { Link, useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';

export const List = () => {
  const [data, setData] = useState(null);

  const params = useParams();

  useEffect(() => {
    (async () => {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${params.id}`);

      if (!response.data) return;
      setData(response.data);
    })();
  }, []);

  const loader = (d) => {
    if (!d) return <Loader />;
    else return null;
  }

  console.log(data)

  return (
    <>
      {loader(data)}

      {data && (
        <>
          <h1>Meals</h1>
          <div className={styles.listGroup}>
            {data.meals.map(v => (
              <Link to={`/details/${v.idMeal}`} className={styles.listA}>
                <Card className={styles.list}>
                  <Card.Img variant="top" src={v.strMealThumb} />
                  <Card.Body>
                    <Card.Title><h3>{v.strMeal}</h3></Card.Title>
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