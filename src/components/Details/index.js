import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Loader } from '../Loader';
import styles from './details.module.css';
import { Link, useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';

export const Details = () => {
  const [data, setData] = useState(null);

  const params = useParams();

  const ingArray = Array.from(Array(20).keys())

  useEffect(() => {
    (async () => {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`);

      if (!response.data) return;
      setData(response.data.meals[0]);
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
          <h1>Meal: {data.strMeal}</h1>
          <div className={styles.listGroup}>
            <img src={data.strMealThumb} />

            <div>
              <h2>Area: {data.strArea}</h2>
              <h3>Ingredients:</h3>
              <ol>
                {/* {data['strIngredient' + 1]} */}
                {ingArray.map(v => {
                  if (data['strIngredient' + (v + 1)].length) {
                    return <li>{data['strIngredient' + (v + 1)]} -- {data['strMeasure' + (v + 1)]}</li>
                  }
                })}
              </ol>
            </div>
          </div>
          <div className={styles.description}>
            <h3>Instruction:</h3>
            <p >{data.strInstructions}</p>
          </div>
          <br />
          <hr />
          <h2 className={styles.youtube}>See the recipe on Youtube</h2>
          <iframe src={data.strYoutube} className={styles.iframe} />
        </>
      )}
    </>
  )
}